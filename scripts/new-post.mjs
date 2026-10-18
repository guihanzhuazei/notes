import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [title, slug] = process.argv.slice(2)
if (!title || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：npm run new:post -- "文章标题" english-file-name')
  process.exit(1)
}
const file = join('docs', 'posts', `${slug}.md`)
if (existsSync(file)) {
  console.error(`文件已存在：${file}`)
  process.exit(1)
}
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date())
mkdirSync(join('docs', 'posts'), { recursive: true })
writeFileSync(file, `---\ntitle: ${JSON.stringify(title)}\ndate: "${date}"\ncategory: 未分类\ntags: []\ndescription: "填写一两句话的摘要。"\ndraft: true\n---\n\n# ${title}\n\n在这里开始写正文。\n`, 'utf8')
console.log(`已创建草稿：${file}。完成正文后设置 draft: false；本地预览需重启。`)
