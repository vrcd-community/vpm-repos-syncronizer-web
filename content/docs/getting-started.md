# 这是什么

这是一个 VPM 仓库源的镜像，简单来说就是：这个镜像站能够加速 VCC（VRChat Creator Companion）下载包的过程。

如果你曾经使用过 [npmmirror 镜像站](https://npmmirror.com/)、[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/) 等其他镜像站，那么你可以简单理解为这是以上镜像站的 VPM 版本。

### 相关链接

- 后端 Github 仓库地址：[https://github.com/vrcd-community/VPMReposSynchronizer](https://github.com/vrcd-community/VPMReposSynchronizer)
- 前端 Github 仓库地址：[https://github.com/vrcd-community/vpm-repos-syncronizer-web](https://github.com/vrcd-community/vpm-repos-syncronizer-web)

## 目前正在镜像的源

我们目前对以下源提供镜像：

- VRChat 官方 SDK 包源 (VRChat Official SDK Packages)  
  `https://packages.vrchat.com/official`
- VRChat 精选包源 (Curated)  
  `https://packages.vrchat.com/curated`
- 以及一些来自社区的 VCC 包，您可以在包列表中查看它们。

我们会在未来添加更多源，参考 [常见问题 # 你们会添加其他源吗](faq#你们会添加其他源吗)。

## 如何使用

理论上，你可以在任何使用 VPM 源且支持修改仓库源的应用中使用该镜像源。下面列出 VCC (VRChat Creator Companion) 的使用方法。

您可以在[ VRChat 入门包](https://docs.vrcd.org.cn/books/vrchat/page/2)中查看如何使用该镜像源中的官方，精选，与第三方源。

镜像源地址: `https://vpm.vrczh.org/vpm`

### VRChat Creator Companion

> #### 相关官方文档
>
> - VCC 官方文档 - 社区仓库: [https://vcc.docs.vrchat.com/guides/community-repositories](https://vcc.docs.vrchat.com/guides/community-repositories)
> - VCC 官方文档 - 社区仓库 (社区简体中文翻译版本): [https://docs.vrczh.org/vcc.docs.vrchat.com/guides/community-repositories](https://docs.vrczh.org/vcc.docs.vrchat.com/guides/community-repositories)

<!--
1. 打开你的 VCC (VRChat Creator Companion)，并点击 `Settings` 按钮打开设置。
    ![VCC (VRChat Creator Companion) 首页](/images/setup-guide/setup-guide-vcc-1.png)
2. 在设置中点击 `Packages` 选项卡。
    ![VCC (VRChat Creator Companion) 设置首页](/images/setup-guide/setup-guide-vcc-2.png)
3. 取消勾选 `Official` 和 `Curated` 项的勾选框。
    ![VCC (VRChat Creator Companion) 设置包页](/images/setup-guide/setup-guide-vcc-3.png)
4. 点击页面上的 `Add Repository` 按钮，并在出现的输入框中输入 `https://vpm.vrczh.org/vpm`，然后点击 `Add` 按钮。
   ![VCC (VRChat Creator Companion) 设置页添加包仓库 - 输入 URL](/images/setup-guide/setup-guide-vcc-4.png)
5. 在弹出的窗口中点击 `I Understand, Add Repository`。
   ![VCC (VRChat Creator Companion) 设置页添加包仓库 - 确认](/images/setup-guide/setup-guide-vcc-5.png)
6. 大功告成，你现在可以正常执行安装/更新包和创建/迁移项目操作了。
   ![VCC (VRChat Creator Companion) 设置页添加包仓库 - 完成](/images/setup-guide/setup-guide-vcc-6.png)
-->