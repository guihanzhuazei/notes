<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const API = 'https://abacus.jasoncameron.dev'
const NS = 'guihanzhuazei-notes'

const route = useRoute()
const slug = computed(() => route.path.match(/\/posts\/([^/]+?)\.html?$/)?.[1] ?? '')

const views = ref<number | null>(null)
const likes = ref<number | null>(null)
const liked = ref(false)
const busy = ref(false)

const fmt = (n: number) => n.toLocaleString('zh-CN')

async function read(path: string): Promise<number | null> {
  try {
    const res = await fetch(`${API}/${path}`, { cache: 'no-store' })
    if (res.status === 404) return 0
    if (!res.ok) return null
    const data = await res.json()
    return typeof data?.value === 'number' ? data.value : null
  } catch {
    return null
  }
}

async function loadViews(name: string) {
  const key = `view-${name}`
  const seen = sessionStorage.getItem(`seen:${key}`) === '1'
  const value = await read(`${seen ? 'get' : 'hit'}/${NS}/${key}`)
  views.value = value
  if (!seen && value !== null) sessionStorage.setItem(`seen:${key}`, '1')
}

async function loadLikes(name: string) {
  const key = `like-${name}`
  likes.value = await read(`get/${NS}/${key}`)
  liked.value = localStorage.getItem(`liked:${key}`) === '1'
}

function load(name: string) {
  if (!name) return
  views.value = null
  likes.value = null
  loadViews(name)
  loadLikes(name)
}

async function like() {
  if (!slug.value || busy.value || liked.value) return
  busy.value = true
  const key = `like-${slug.value}`
  const value = await read(`hit/${NS}/${key}`)
  if (value !== null) {
    likes.value = value
    liked.value = true
    localStorage.setItem(`liked:${key}`, '1')
  }
  busy.value = false
}

onMounted(() => load(slug.value))
watch(slug, (name) => load(name))
</script>

<template>
  <div v-if="slug && (views !== null || likes !== null)" class="post-stats">
    <span v-if="views !== null" class="post-stat">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span class="num">{{ fmt(views) }}</span><span class="unit">次浏览</span>
    </span>
    <button
      v-if="likes !== null"
      type="button"
      class="post-like"
      :class="{ 'is-liked': liked }"
      :disabled="busy || liked"
      :aria-pressed="liked"
      :aria-label="liked ? '已点赞' : '点赞'"
      @click="like"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      <span class="num">{{ fmt(likes) }}</span><span class="unit">赞</span>
    </button>
  </div>
</template>
