# vscodecs

快速生成自己预设的模板

## 创建模板

* 命令行
  * ` Ctrl+Shift+P (Cmd+Shift+P on Mac) ` --> `create template`
  * 填写需要创建模板的绝对路径 `<yourProject>/xxx/`
  * 从模板列表中选择所要创建的模板
  * 填写文件夹名称
  * 完成创建

* 右键菜单
  * 右键菜单选择 `vscodecs` --> `create template`
  * 从模板列表中选择所要创建的模板
  * 填写文件夹名称
  * 完成创建

## 更新模板

模板如果需要更新可以手动更新

* 命令行
  * ` Ctrl+Shift+P (Cmd+Shift+P on Mac) ` --> `update template`
  * 完成更新

* 右键菜单
  * 右键菜单选择 `vscodecs` --> `update template`
  * 完成更新

## 设置

* `vscodecs.extname` 写入变量的文件格式（用逗号隔开）

  默认: `.vue,.js,.ts,.jsx,.tsx`

  创建文件时会向模板中写入变量（例：fileName）,可以设置需要变量的文件格式

  *如果无法解析变量的文件格式请勿设置，写模板时会报错（例：.png）*

* `vscodecs.metaJson` 模板所需配置信息（插件会默认写入创建的文件名 `fileName`）

  自定义变量，插件会默认将用户输入的文件名称传入写入的模板（`fileName`)

  可以根据项目创建工作区设置变量

* `vscodecs.tempalteKey` 定义模板标识文件

  默认: `README.md`

  识别仓库目录时，检测到一级子目录下有该文件，则视为模板

* `vscodecs.remoteLocations` 仓库远程地址

  默认： `[]`

  设置仓库远程地址,可以设置多个仓库。

  *设置多个仓库时，创建模板时会提示选择仓库地址*

## 模板写入规则

> 使用 [Handlebars](https://handlebarsjs.com/zh) 作为语义化模板，具体规则可以参考官网。

### 扩展

插件为模板添加部分解析规则

* `handleDefault (hd)` 设置默认值

  模板中使用解析
  >`{{ handleDefault fileName 'xxx' }}` or `{{ hd fileName 'xxx' }}`
