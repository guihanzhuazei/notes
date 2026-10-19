import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import NotebookHome from './NotebookHome.vue'
import PostList from './PostList.vue'
import AuthorByline from './AuthorByline.vue'
import PostStats from './PostStats.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-footer-before': () => h(PostStats)
  }),
  enhanceApp({ app }) {
    app.component('NotebookHome', NotebookHome)
    app.component('PostList', PostList)
    app.component('AuthorByline', AuthorByline)
  }
} satisfies Theme
