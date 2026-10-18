import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import NotebookHome from './NotebookHome.vue'
import PostList from './PostList.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NotebookHome', NotebookHome)
    app.component('PostList', PostList)
  }
} satisfies Theme
