# notes

个人与社团技术笔记。

- 网站：https://guihanzhuazei.github.io/notes/
- 框架：VitePress 1.6.4
- 发布：提交到 `main` 后，GitHub Actions 自动构建并发布。

## 以后怎么发文章

### 方法一：直接在 GitHub 网页写

1. 打开本仓库的 `docs/posts` 文件夹，选择 **Add file → Create new file**。
2. 文件名使用英文短名，例如 `encoder-notes.md`。
3. 复制 `templates/article.md` 的内容，填写标题、日期、分类、标签、摘要和正文。
4. 写好后将 `draft: true` 改成 `draft: false`，点击 **Commit changes** 提交。
5. 等待 **Actions** 中 **Publish notes** 完成，文章会自动出现在首页和搜索中。

示例：

```markdown
---
title: 编码器学习笔记
date: "2026-10-18"
category: 智能车
tags: [编码器, 调试]
description: 记录编码器计数、方向与里程换算的实践。
draft: false
---

# 编码器学习笔记

正文从这里开始。
```

`draft: true` 的文章不生成网站页面，也不进入列表与搜索。但**公开仓库中的源文件仍然能被访问**；未准备公开的内容请先保存在自己的电脑上。

### 方法二：在电脑上写和预览

安装 Node.js 24 后，在仓库目录运行：

```sh
npm ci
npm run docs:dev
```

新建草稿：

```sh
npm run new:post -- "文章标题" english-file-name
```

完成文章后设置 `draft: false`，重启本地预览，构建检查，再提交到 GitHub：

```sh
npm run docs:build
git add .
git commit -m "发布新笔记"
git push
```

## 图片和附件

将图片放到 `docs/public/images/文章短名/`，文章里这样引用：

```markdown
![图片说明](/images/文章短名/example.png)
```

图片和附件会随网站发布，不依赖 Notion 临时链接。文章文件直接放在 `docs/posts/`，分类、标签和摘要填写在文件开头。

## 代码与折叠内容

代码块使用三个反引号，并填写语言，例如 `c`、`python`。较长代码可以放进 `<details>` 和 `<summary>` 折叠块，参考首篇文章。

## 首次启用 GitHub Pages

进入 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。

网站使用 `/notes/` 作为路径前缀。更换仓库名或绑定独立域名时，需要同步修改 `docs/.vitepress/config.mts` 中的 `base` 和 favicon 路径。

## 文件位置

- `docs/posts/`：文章。
- `docs/.vitepress/theme/`：首页、文章列表和样式。
- `docs/.vitepress/config.mts`：网站名称、导航和搜索配置。
- `templates/article.md`：文章模板，不会直接发布到网站。
- `.github/workflows/deploy.yml`：自动发布流程。

首篇文章从作者提供的 Notion 页面迁移，保留迁移时的正文和两个代码示例；示例为教学用途，尚未实车验证。
