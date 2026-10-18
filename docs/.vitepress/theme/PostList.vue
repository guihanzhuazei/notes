<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from './posts.data'
const props = defineProps<{ limit?: number; filterable?: boolean }>()
const category = ref('全部')
const categories = computed(() => ['全部', ...new Set(posts.map(p => p.category))])
const visible = computed(() => {
  const filtered = category.value === '全部' ? posts : posts.filter(p => p.category === category.value)
  return props.limit ? filtered.slice(0, props.limit) : filtered
})
</script>

<template>
  <div class="post-list-wrap">
    <div v-if="filterable && categories.length > 2" class="post-filters" aria-label="按分类查看笔记">
      <button v-for="item in categories" :key="item" type="button" :class="{ active: category === item }" :aria-pressed="category === item" @click="category = item">{{ item }}</button>
    </div>
    <div class="post-list">
      <article v-for="post in visible" :key="post.url" class="post-row">
        <time :datetime="post.date">{{ post.date.replaceAll('-', '.') }}</time>
        <h2><a :href="withBase(post.url)">{{ post.title }}<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg></a></h2>
      </article>
    </div>
    <p v-if="!visible.length" class="empty-notes">这个分类还没有笔记。</p>
  </div>
</template>
