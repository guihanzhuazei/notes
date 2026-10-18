import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const postsDir = fileURLToPath(new URL('../posts/', import.meta.url))
const drafts = existsSync(postsDir) ? readdirSync(postsDir).filter(f => f.endsWith('.md') && /^draft:\s*true\s*$/m.test(readFileSync(`${postsDir}/${f}`, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '')).map(f => `posts/${f}`) : []

export default defineConfig({
  lang: 'zh-CN', title: 'notes',
  description: 'notes', appearance: false,
  base: '/notes/', srcExclude: drafts, lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/notes/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  themeConfig: {
    siteTitle: 'notes',
    sidebar: false,
    outline: { label: '这篇笔记', level: [2, 3] },
    search: { provider: 'local', options: { locales: { root: { translations: {
      button: { buttonText: '搜索笔记', buttonAriaLabel: '搜索笔记' },
      modal: { displayDetails: '显示详细内容', resetButtonTitle: '清除搜索', backButtonTitle: '返回', noResultsText: '没有找到相关笔记', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
    } } } } },
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium' } },
    returnToTopLabel: '回到顶部', sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观', lightModeSwitchTitle: '切换至浅色模式', darkModeSwitchTitle: '切换至深色模式',
    notFound: { title: '404', quote: '', linkLabel: '首页', linkText: 'notes' }
  }
})
