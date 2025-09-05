<script setup lang="ts">
import type { Task } from "./types";

const props = defineProps<{ tasks: Task[] }>();

const emits = defineEmits<{
  toggleDone: [id: string];
  removeTask: [id: string];
}>();
</script>

<template>
  <TransitionGroup name="list" tag="div" class="task-list">
    <article v-for="task in props.tasks" class="task" :key="task.id">
      <label class="task__label">
        <input
          type="checkbox"
          @input="emits('toggleDone', task.id)"
          :checked="task.completed"
          class="task__checkbox"
        />
        <span :class="{ 'task__done': task.completed }" class="task__title">
          {{ task.title }}
        </span>
      </label>
      <button
        class="task__button task__button--delete outline"
        @click="emits('removeTask', task.id)"
      >
        Delete
      </button>
    </article>
  </TransitionGroup>
</template>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-list {
    margin-top: 1rem;
  }
}

.done {
  text-decoration: line-through;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>
