import { createContentLoader } from 'vitepress'
export interface Post { title: string; date: string; description: string; category: string; tags: string[]; url: string }
declare const data: Post[]
export { data }
export default createContentLoader('posts/*.md', {
  transform(raw): Post[] {
    return raw.filter(({ frontmatter }) => !frontmatter.draft)
      .map(({ url, frontmatter: f }) => ({ title: String(f.title || '未命名笔记'), date: String(f.date || ''), description: String(f.description || ''), category: String(f.category || '未分类'), tags: Array.isArray(f.tags) ? f.tags.map(String) : [], url }))
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'))
  }
})
