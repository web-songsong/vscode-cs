import { homedir } from "os";
import { existsSync } from "fs";
import { join } from "path";
import { templatesPath, logMassage, placeHolder } from "../global-config.json";
import Log from "../utils/Log";
import Dirs from "../utils/Dirs";
import Input from "../utils/Input";
import IO from "../utils/IO";
import { workspace } from "vscode";

/**
 * 模板提示
 *
 * @export
 * @param {*} uri
 * @return {*}
 */
export default async function hintTemplate(uri: any) {
  let homeTemPath = join(homedir(), templatesPath);

  // 检测模板仓库目录是否存在
  if (!existsSync(homeTemPath)) {return Log.error(logMassage.notTemplateDir);}

  const projectList = Dirs.getDirLocalList(homeTemPath);

  // // 检测模板仓库中是否有模板
  if (!projectList.length) {return Log.error(logMassage.notTemplateDir);}

  // // 创建文件的路径
  let inputFilePath = uri
    ? uri.path
    : await Input.inputBox(placeHolder.dirInput);

  // // 判断用户输入路径是否存在
  if (!existsSync(inputFilePath)) {return Log.error(logMassage.pathErr);}

  // 输出路径
  const outputPath = Dirs.getOutputPath(inputFilePath);

  const tempalteKey = <string>(
    workspace.getConfiguration().get("vscode-cs.tempalteKey")
  );

  // 仓库路径
  const remotePath = <string>(
    await Dirs.showDirList(
      Dirs.getLocalTemplatePath(
        <string>await Input.quickPick(projectList, placeHolder.remoteInput)
      ),
      tempalteKey
    )
  );
  if (!remotePath) {return;}

  // 输出文件名称
  const outputName = Dirs.fileNameFromat(
    outputPath,
    <string>await Input.inputBox(placeHolder.outputName)
  );
  if (!outputName) {return;}

  IO.outputTemplate(remotePath, outputPath, outputName);
}
