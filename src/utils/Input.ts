import { window } from "vscode";

/**
 * 输入方法
 *
 * @export
 * @class Input
 */
export default class Input {
  /**
   * 获取用户输入
   *
   * @static
   * @param {string} placeHolder 提示信息
   * @return {*}
   * @memberof Input
   */
  static inputBox(placeHolder: string) {
    return window.showInputBox({ placeHolder });
  }

  static quickPick(list: string[], placeHolder: string) {
    return list.length ? window.showQuickPick(list, { placeHolder }) : list[0];
  }
}
