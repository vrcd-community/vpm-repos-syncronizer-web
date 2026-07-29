# VPM Repos Synchronizer Web

VPM Repos Synchronizer 的纯前端站点，基于 Vue 3、Vue Router、Vite、PrimeVue 和 Tailwind CSS。页面数据直接从远程 API 获取，文档 Markdown 在构建时打包，不需要 Node 服务端或 SSR 运行时。

## 开发

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:5173`。

可通过 `.env` 覆盖 API 地址：

```dotenv
VITE_API_BASE_URL=https://vpm.vrczh.org
```

## 检查和构建

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

生产构建输出到 `dist/`。部署时需要将所有前端路由回退到 `index.html`，Cloudflare 配置已通过 `wrangler.jsonc` 启用 SPA 回退。
