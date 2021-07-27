import { homedir } from "os";
import { join } from "path";
import { spawn } from "child_process";
import { templatesPath, logMassage } from "../global-config.json";
import Log, { LogProgress } from "./Log";
import { existsSync, rmSync } from "fs";
import { workspace } from "vscode";

import * as Handlebars from "handlebars";
import * as Metalsmith from "metalsmith";

/**
 * 根据远程地址命名模板目录
 *
 * @param {string} str
 * @param {boolean} [flag=true]
 * @return {*}
 */
export function fileNameReplace(str: string, flag: boolean = true) {
  return flag
    ? Buffer.from(str).toString("base64")
    : Buffer.from(str, "base64").toString();
}

/**
 * git clone
 *
 * @param {string} repo
 * @param {LogProgress} progress
 * @param {number} increment
 * @return {*}
 */
export async function gitclone(
  repo: string,
  progress: LogProgress,
  increment: number
) {
  return new Promise((resolve, reject) => {
    const targetPath = join(homedir(), templatesPath, fileNameReplace(repo));

    existsSync(targetPath) &&
      rmSync(targetPath, { recursive: true, force: true });

    const args = ["clone", "--depth", "1", repo, targetPath];
    const process = spawn("git", args);

    process.on("close", (status: number) => {
      existsSync(join(targetPath, ".git")) &&
        rmSync(join(targetPath, ".git"), { recursive: true, force: true });
      progress.report({ increment });
      !status ? resolve(status) : reject(repo);
    });
  });
}

/**
 * IO操作
 *
 * @export
 * @class IO
 */
export default class IO {
  /**
   * 下载git模板
   *
   * @static
   * @param {string[]} urls 远程地址列表
   * @memberof IO
   */
  static downTempaltes(urls: string[]) {
    Log.progress(logMassage.downTemplateLoding, (progress, resovle) =>
      Promise.all(
        urls.map((repo, key) =>
          gitclone(repo, progress, ~~(((key + 1) / urls.length) * 100))
        )
      )
        .then(() => Log.info(logMassage.updateSuccess))
        .catch((err: string) => Log.error(`${logMassage.updateErr}:${err}`))
        .finally(resovle)
    );
  }

  /**
   * 输出模板
   *
   * @static
   * @param {string} templatePath
   * @param {string} filePath
   * @param {string} fileName
   * @return {*}
   * @memberof IO
   */
  static outputTemplate(
    templatePath: string,
    filePath: string,
    fileName: string
  ) {
    const metaJson = <any>workspace.getConfiguration().get("vscodecs.metaJson");
    // Log.progress
    return new Promise((resolve, reject) => {
      Metalsmith(filePath)
        .metadata({ fileName, ...metaJson })
        .source(templatePath)
        .clean(false)
        .destination(`${fileName}`)
        .use((files: any, metalsmith: any, done: any) => {
          const extnameStrign = <string>(
            workspace.getConfiguration().get("vscodecs.extname")
          );
          const extImgStrign = <string>(
            workspace.getConfiguration().get("vscodecs.extImg")
          );

          const extnames: any = extnameStrign.split(",");
          const extImgs = extImgStrign.split(",");

          Object.keys(files).forEach((fName) => {
            let suffix = fName.slice(fName.lastIndexOf("."));
            if (extnames.includes(suffix)) {
              return;
            }
            if (extImgs.includes(suffix)) {
              return;
            }
            const str = files[fName].contents.toString();
            files[fName].contents = Buffer.from(
              Handlebars.compile(str)(metalsmith.metadata())
            );
          });
          done();
        })
        .build((err: unknown) => {
          err && reject(err);
          resolve(true);
        });
    })
      .then(() => Log.info(logMassage.setTemplateSuccess))
      .catch((err) => Log.error(err));
  }
}
