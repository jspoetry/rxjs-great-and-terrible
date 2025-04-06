<template>
  <footer v-if="$nav.hasNext" class="slides-no">{{ $nav.currentPage }}</footer>
</template>

<style >
.slides-no {
  @apply absolute bottom-0 left-0 right-0 pb-8 pr-8 text-sm opacity-50 z-1 text-right;
}
</style>
