<script setup lang="ts">
import type { TaskFilter } from "./types";

const props = defineProps<{
  filter: TaskFilter;
  label: string;
  currentFilter: TaskFilter;
}>();
</script>

<template>
  <button
    class="task__button secondary"
    :class="{
      contrast: props.currentFilter === props.filter,
    }"
    @click="$emit('setFilter', props.filter)"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
button {
  text-transform: capitalize;
}
</style>
