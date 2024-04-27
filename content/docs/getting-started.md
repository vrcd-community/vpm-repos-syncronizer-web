# 使用指南

理论上，你可以在任何使用 VPM 源且支持修改仓库源的应用中使用该镜像源。

## 不同包管理器的使用方法

- [VRChat Creator Companion](#vrchat-creator-companion)
- [VPM-CLI](#vpm-cli)
- [vrc-get](#vrc-get)
- [ALCOM (vrc-get-gui)](#alcom-vrc-get-gui)

## VRChat Creator Companion

> - VCC 官方文档 - 社区仓库: [https://vcc.docs.vrchat.com/guides/community-repositories](https://vcc.docs.vrchat.com/guides/community-repositories)
> - VCC 官方文档 - 社区仓库 (社区简体中文翻译版本): [https://docs.vrczh.org/vcc.docs.vrchat.com/guides/community-repositories](https://docs.vrczh.org/vcc.docs.vrchat.com/guides/community-repositories)

> 由于 VRChat Creator Companion 不提供修改官方源的功能，故使用 Official 和 Curated 源需要对 VCC 本体打补丁。详细请见 [使用 Official，Curated 镜像源](#使用-officialcurated-镜像源)

[VRChat Creator Companion](https://vcc.docs.vrchat.com) 是 VRChat 官方提供的 VPM 包管理器和 VRChat 项目管理器。截止本文档编写时间（2024年4月27日）仅支持 Windows 平台。

注：请先[按照官方文档说明安装 VRChat Creator Companion](https://vcc.docs.vrchat.com/#download-it)

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 查找您想订阅的包或仓库，并点击“添加到 VCC”或`＋`按钮
3. 返回创作者助手界面，点击 `I Understand, Add Repository` 添加镜像源
4. 完成

### 使用 Official，Curated 镜像源

1. [下载](https://github.com/Misaka-L/CreatorCompanionPatcher/releases/latest) 最新版 `CreatorCompanionPatcher.exe`
2. 打开创作者助手所在文件夹 ，将 `CreatorCompanionPatcher.exe` 文件放入刚刚打开的文件夹中。
3. 双击启动 `CreatorCompanionPatcher.exe` ，观察并等待其命令行窗口加载完毕，并弹出创作者助手窗口后，关闭创作者助手与命令行窗口。
4. 在文件夹下新建文件`patcher.json`，复制如下内容后粘贴到前文文件中：

```json
{
    "EnabledPatches": [
        "LoggerPatch",
        "PackageInstallTimeoutPatch",
        "ReplaceOfficialReposPatch",
        "DisableTelemetryPatch",
        "DetailVPMLoggingPatch"
    ],
    "ReplaceOfficialReposUrl": "https://vpm.vrczh.org/vpm/official",
    "ReplaceCuratedReposUrl": "https://vpm.vrczh.org/vpm/curated"
}
```

5.打开`CreatorCompanionPatcher.exe`，正常订阅并下载使用 `Official`，`Curated` 镜像源

## VPM-CLI

> 目前 VPM-CLI 无法使用 Official 和 Curated 镜像，因为其无法修改官方源的 URL。

[VPM CLI](https://vcc.docs.vrchat.com/vpm/cli) 是 VRChat 官方提供的 VPM 管理器。

注：请先[按照官方文档说明安装 VPM-CLI](https://vcc.docs.vrchat.com/vpm/cli#installation--updating)

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 复制“镜像 URL”
3. 打开终端，运行 `vpm add repo <镜像 URL>`（注：请去掉 `<` 和 `>`，由于忘记去掉这两个符号导致的问题的求助信息会被直接忽略）

## vrc-get

[vrc-get](https://github.com/vrc-get/vrc-get) 是一个由社区开发的开源 VPM 包管理器，相较于 VRChat 官方的 VPM ~~遥遥领先~~有更好的性能表现和更好的使用体验，支持在 Windows、Linux 和 MacOS 上运行。vrc-get 本体为 CLI，不过同时也提供了[实验性的 GUI 版本](https://github.com/vrc-get/vrc-get/tree/master/vrc-get-gui)。

注：请先[按照官方文档说明安装 vrc-get](https://github.com/vrc-get/vrc-get?tab=readme-ov-file#installation)

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 复制“镜像 URL”
3. 打开终端，运行 `vrc-get repo add <镜像 URL> <仓库的别名，请自己起一个>`（注：请去掉 `<` 和 `>`，由于忘记去掉这两个符号导致的问题的求助信息会被直接忽略）
4. 完成

## ALCOM (vrc-get-gui)

> 注：ALCOM 目前还处于实验性阶段，可能随时会发生重大更改。本文档可能无法及时跟进 ALCOM 最新版本的修改，请始终以官方文档为准。

[ALCOM (vrc-get-gui)](https://github.com/vrc-get/vrc-get/tree/master/vrc-get-gui) 是 [vrc-get-gui] 的官方实验性 GUI 版本。

注：请先[按照官方文档说明安装 vrc-get-gui](https://github.com/vrc-get/vrc-get/tree/master/vrc-get-gui#installation)

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 复制“镜像 URL”
3. 打开 ALCOM 并转到 “VPM 存储库”（VPM Repositories）页
4. 点击“添加存储库”（ADD REPOSITORY）按钮
5. 在弹出的窗口中粘贴在第二步获得的镜像 URL
6. 点击“添加存储库”（ADD REPOSITORY）按钮
7. 等待 ALCOM 获取仓库元数据，加载完成后再次点击“添加存储库”（ADD REPOSITORY）按钮
8. 完成
