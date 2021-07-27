import { existsSync, lstatSync, readdirSync } from "fs";
import { join } from "path";
import { fileNameReplace } from "./IO";
import Log from "./Log";
import { logMassage, templatesPath, placeHolder } from "../global-config.json";
import { homedir } from "os";
import Input from "./Input";

function handleShowDirList(dir: string) {}

/**
 * 目录操作方法
 *
 * @export
 * @class Dirs
 */
export default class Dirs {
  /**
   * 获取本地仓库路径下的文件夹
   *
   * @static
   * @param {string} dir
   * @return {*}
   * @memberof Dirs
   */
  static getDirLocalList(dir: string) {
    return readdirSync(dir, { withFileTypes: true })
      .filter((i) => i.isDirectory())
      .map((i) => fileNameReplace(i.name, false));
  }

  /**
   * 获取路径下的文件夹或文件
   *
   * @static
   * @param {string} dir
   * @param {boolean} [flag=true] 默认查询文件夹
   * @return {*}
   * @memberof Dirs
   */
  static getDirList(dir: string, flag = true) {
    return existsSync(dir)
      ? readdirSync(dir, { withFileTypes: true })
          .filter((i) => (flag ? i.isDirectory() : i.isFile()))
          .map((i) => i.name)
      : [];
  }

  /**
   * 判读路径是否为目录（如果是文件，返回文件所在文件夹）
   *
   * @static
   * @param {string} dir
   * @return {*}
   * @memberof Dirs
   */
  static getOutputPath(dir: string) {
    return lstatSync(dir).isFile() ? join(dir, "..") : dir;
  }

  /**
   * 文件名重复添加时间戳
   *
   * @static
   * @param {string} dir
   * @param {string} name
   * @return {*}
   * @memberof Dirs
   */
  static fileNameFromat(dir: string, name: string) {
    if (existsSync(join(dir, name))) {
      Log.warning(logMassage.fileNameRepeat);
      return `${name}-${new Date().getTime()}`;
    } else {
      return name;
    }
  }

  /**
   * 根据设置的文件名识别目录还是模板
   *
   * @static
   * @param {string} dir 路径
   * @param {string} key 用来识别模板的关键字
   * @memberof Dirs
   */
  static async showDirList(dir: string, key: string): Promise<string> {
    if (this.getDirList(dir, false).includes(key)) {
      return dir;
    }

    const templateList = this.getDirList(dir);
    if (!templateList.length) {
      Log.warning(logMassage.remoteEmpty);
      return "";
    }

    return await this.showDirList(
      join(
        dir,
        <string>await Input.quickPick(templateList, placeHolder.default)
      ),
      key
    );
  }

  /**
   * 获取本地模板路径
   *
   * @static
   * @param {string} tem
   * @return {*}
   * @memberof Dirs
   */
  static getLocalTemplatePath(tem: string) {
    return join(homedir(), templatesPath, fileNameReplace(tem));
  }
}
