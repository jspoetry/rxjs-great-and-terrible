<template>
  <div class="image-frame ">
    <slot></slot>
  </div>
</template>

<style scoped>
.image-frame {
  grid-template-rows: 250px;
 @apply flex items-center justify-center grid-rows-250px w-full mx-auto overflow-hidden rounded-xl;
}
.image-frame:deep(> img) {
  @apply h-full mx-auto object-contain rounded-xl;
}

</style>