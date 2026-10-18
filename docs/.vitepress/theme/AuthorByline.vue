<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{ date: string; category?: string }>()
const avatar = withBase('/images/author-avatar.webp')
</script>

<template>
  <div class="post-byline">
    <span class="post-author">
      <img class="post-author-avatar" :src="avatar" alt="guihanzhuazei 的头像" />
      <span class="post-author-name">guihanzhuazei</span>
    </span>
    <span aria-hidden="true">·</span>
    <time :datetime="date">{{ date.replaceAll('-', '.') }}</time>
    <template v-if="category">
      <span aria-hidden="true">·</span>
      <span>{{ category }}</span>
    </template>
  </div>
</template>
