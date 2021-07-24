import { workspace } from "vscode";
import Log from "../utils/Log";
import { logMassage } from "../global-config.json";
import IO from "../utils/IO";

/**
 * 更新模板列表
 *
 * @export
 * @return {*}
 */
export default async function updateTemplate() {
  // 获取配置远程仓库（去重）
  const remoteLocations = Array.from(
    new Set(
      <string[]>workspace.getConfiguration().get("vscode-cs.remoteLocations")
    )
  );

  // 判断是否配置远程仓库地址
  if (!remoteLocations.length) {return Log.warning(logMassage.remoteEmpty);}

  // 下载模板到本地仓库
  IO.downTempaltes(remoteLocations);
}
