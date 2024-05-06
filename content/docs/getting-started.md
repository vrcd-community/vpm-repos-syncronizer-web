# 使用指南

理论上，你可以在任何使用 VPM 源且支持修改仓库源的应用中使用该镜像源。<br>
本文中，两种仓库镜像及其示例内容如下
- **Official** 与 **Curated** 仓库镜像
    - 包含 **VRChat - Avatar SDK，VRChat - World SDK，Gesture Manager** 等 VPM 包
- 第三方社区仓库镜像，如 **bd_**，**vrcfury**，**lilxyzw**，**poiyomi**
    - 包含 **Modular Avatar，VRCFury，liltoon，Poiyomi** 等 VPM 包
## 不同包管理器的使用方法

- [VRChat Creator Companion](#vrchat-creator-companion)
- [VPM-CLI](#vpm-cli)
- [vrc-get](#vrc-get)
- [ALCOM (vrc-get-gui)](#alcom-vrc-get-gui)

## VRChat Creator Companion

![图片](/images/setup-guide/getting-started-vcc.png)

> - VCC 官方文档 - 社区仓库: [https://vcc.docs.vrchat.com/guides/community-repositories](https://vcc.docs.vrchat.com/guides/community-repositories)
> - VCC 官方文档 - 社区仓库 (社区简体中文翻译版本): [https://docs.vrczh.org/vcc.docs.vrchat.com/guides/community-repositories](https://docs.vrczh.org/vcc.docs.vrchat.com/guides/community-repositories)

> 由于 VCC 本体设计局限，如需在该工具中使用 Official 和 Curated 源，请参阅 [使用 Official 与 Curated 镜像源](#使用-official-与-curated-镜像源)

[VRChat Creator Companion](https://vcc.docs.vrchat.com) 是 VRChat 官方提供的 VPM 包管理器和 VRChat 项目管理器。
> 截止本文档编写时间（2024年4月27日）仅支持 Windows 平台。<br>
> 请先按照官方文档说明，[下载与安装 VRChat Creator Companion](https://vcc.docs.vrchat.com/#download-it)


## 使用 Official 与 Curated 仓库镜像


1. 下载并安装 [.NET 6.0 Desktop Runtime](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-6.0.28-windows-x64-installer)，双击运行后在安装窗口中选择 `安装` 或 `修复`。

    ![图片](/images/setup-guide/setup-guide-vcc-1.png)

2. 点击 [此处](https://github.com/Misaka-L/CreatorCompanionPatcher/releases/latest) 下载最新版 `CreatorCompanionPatcher.exe`（如果您无法访问下载页面，也可以在 [这里](https://rainelve.lanzouw.com/iEfDq1wpk6kf) 下载）

3. 新建一个文件 `patcher.json`，将其内容修改如下（您也可以在 [这里](https://raincloud.glaorg.top/d/storage/%E6%95%B0%E6%8D%AE%E4%BB%93%E5%BA%93/VRCD/patcher.json?sign=W7YZdq2nnHxtzHTU8n6XrtSdLJPsPeQM_fFT7bEFrCI=:0) 直接下载这个文件）：
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

4. 将 `CreatorCompanionPatcher.exe` 与 `patcher.json` 文件一起剪切或复制粘贴到您的 VRChat Creator Companion 安装文件夹下，示例如下。

    ![图片](/images/setup-guide/setup-guide-vcc-2.png)

    > 您可以右键单击桌面上的 **CreatorCompanion** 快捷方式，并点击打开文件所在的位置，来找到创作者助手的安装文件夹。

        ![图片](/images/setup-guide/setup-guide-vcc-3.png)
        
5. 启动 `CreatorCompanionPatcher.exe` ，观察并等待命令行窗口加载完毕，等待弹出 VRChat Creator Companion 即完成操作。

## 使用第三方社区仓库镜像

> 以下为订阅`liltoon` 着色器 VPM 包或 `lilxyzw` 仓库源示例

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库，点击 `添加到 VCC` 或 `＋` 按钮。
    ![图片](/images/setup-guide/setup-guide-vcc-4.png)
2. 返回创作者助手，点击 `I Understand, Add Repository` 添加仓库。
    ![图片](/images/setup-guide/setup-guide-vcc-5.png)

## VPM-CLI

![图片](/images/setup-guide/getting-started-vpmcli.png)

> 目前 VPM-CLI 无法使用 Official 和 Curated 仓库镜像，因为其无法修改官方源的 URL。

[VPM CLI](https://vcc.docs.vrchat.com/vpm/cli) 是 VRChat 官方提供的 VPM 管理器。

> 请先[按照官方文档说明安装 VPM-CLI](https://vcc.docs.vrchat.com/vpm/cli#installation--updating)

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 复制“镜像 URL”
3. 打开终端，运行 `vpm add repo <镜像 URL>`（注：请去掉 `<` 和 `>`，由于忘记去掉这两个符号导致的问题的求助信息会被直接忽略）

## vrc-get

![图片](/images/setup-guide/getting-started-vrcget.png)

> 目前 vrc-get 无法使用 Official 和 Curated 仓库镜像，因为其无法修改官方源的 URL。

[vrc-get](https://github.com/vrc-get/vrc-get) 是一个由社区开发的开源 VPM 包管理器，相较于 VRChat 官方的 VPM ~~遥遥领先~~有更好的性能表现和更好的使用体验，支持在 Windows、Linux 和 MacOS 上运行。vrc-get 本体为 CLI，不过同时也提供了[实验性的 GUI 版本](https://github.com/vrc-get/vrc-get/tree/master/vrc-get-gui)。

> 请先按照官方文档说明，[下载与安装 vrc-get](https://github.com/vrc-get/vrc-get?tab=readme-ov-file#installation)

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 复制“镜像 URL”
3. 打开终端，运行 `vrc-get repo add <镜像 URL> <仓库的别名，请自己起一个>`（注：请去掉 `<` 和 `>`，由于忘记去掉这两个符号导致的问题的求助信息会被直接忽略）
4. 完成

## ALCOM (vrc-get-gui)

![图片](/images/setup-guide/getting-started-alcom.png)

> 注：ALCOM 目前还处于实验性阶段，可能随时会发生重大更改。本文档可能无法及时跟进 ALCOM 最新版本的修改，请始终以官方文档为准。

> 目前 ALCOM 无法使用 Official 和 Curated 仓库镜像，因为其无法修改官方源的 URL。

[ALCOM (vrc-get-gui)](https://github.com/vrc-get/vrc-get/tree/master/vrc-get-gui) 是 [vrc-get-gui] 的官方实验性 GUI 版本。

> 请先按照官方文档说明，[下载与安装 vrc-get-gui](https://github.com/vrc-get/vrc-get/tree/master/vrc-get-gui#installation)

> 以下为订阅`liltoon` 着色器 VPM 包或 `lilxyzw` 仓库源示例

1. 前往 [包列表](/repos) 搜索查找需要添加的包或仓库
2. 复制“镜像 URL”
    ![图片](/images/setup-guide/setup-guide-vcc-4.png)
3. 打开 ALCOM 并转到 “VPM 存储库”（VPM Repositories）页
4. 点击“添加存储库”（ADD REPOSITORY）按钮
5. 在弹出的窗口中粘贴在第二步获得的镜像 URL
6. 点击“添加存储库”（ADD REPOSITORY）按钮
7. 等待 ALCOM 获取仓库元数据，加载完成后再次点击“添加存储库”（ADD REPOSITORY）按钮
8. 完成
