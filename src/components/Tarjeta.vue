<script setup>
import { imageUrl } from '@/services/artic'
defineProps({ obra: Object })
</script>

<template>
  <article class="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
    <img
      v-if="obra.image_id"
      :src="imageUrl(obra.image_id, 400)"
      :alt="obra.title"
      loading="lazy"
      class="aspect-square w-full object-cover"
    />
    <div
      v-else
      class="flex aspect-square w-full items-center justify-center bg-gray-200 text-sm text-gray-500"
    >
      Sin imagen
    </div>

    <div class="p-3">
      <h3 class="line-clamp-2 text-sm font-semibold sm:text-base">{{ obra.title }}</h3>
      <p v-if="obra.artist_title" class="mt-1 truncate text-xs text-gray-600">
        {{ obra.artist_title }}
      </p>
    </div>
  </article>
</template>