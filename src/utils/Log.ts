import { Progress, ProgressLocation, window } from "vscode";

export type LogProgress = Progress<{ message?: string; increment?: number }>;

/**
 * 提示方法
 *
 * @export
 * @class Log
 */
export default class Log {
  /**
   * 警告
   *
   * @static
   * @param {string} msg
   * @memberof Log
   */
  static warning(msg: string) {
    window.showWarningMessage(msg);
  }

  /**
   * 错误
   *
   * @static
   * @param {string} msg
   * @memberof Log
   */
  static error(msg: string) {
    window.showErrorMessage(msg);
  }

  /**
   * 提示
   *
   * @static
   * @param {string} msg
   * @memberof Log
   */
  static info(msg: string) {
    window.showInformationMessage(msg);
  }

  static progress(
    cb: (progress: LogProgress, resovle: (val?: unknown) => any) => void
  ) {
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "模板更新中",
      },
      (progress) => {
        // 初始化进度
        progress.report({ increment: 0 });

        return new Promise((resolve) => {
          cb(progress, resolve);
        });
      }
    );
  }
}
