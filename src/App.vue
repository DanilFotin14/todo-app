<script setup lang="ts">
import { computed, ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import type { Task, TaskFilter } from "./types";
import TaskList from "./components/TaskList.vue";
import FilterButton from "./components/FilterButton.vue";

const message = ref("Tasks App");
const tasks = ref<Task[]>([]);
const filter = ref<TaskFilter>("all");

const totalDone = computed(
  () => tasks.value.filter((task) => task.completed).length
);

const filteredTasks = computed(() => {
  switch (filter.value) {
    case "all":
      return tasks.value;
    case "done":
      return tasks.value.filter((task) => task.completed);
    case "todo":
      return tasks.value.filter((task) => !task.completed);
  }
});
function addTask(newTask: string) {
  tasks.value.push({
    id: tasks.value.length + 1,
    title: newTask,
    completed: false,
  });
}

function toggleDone(id: string) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === Number(id)) {
      task.completed = !task.completed;
    }
    return task;
  });
}

function removeTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === Number(id));
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
}

function setFilter(value: TaskFilter) {
  filter.value = value;
}
</script>

<template>
  <main>
    <h1 class="title">{{ message }}</h1>
    <TaskForm @add-task="addTask" />
    <h3 class="subtitle" v-if="!tasks.length">Add a task to get started</h3>
    <h3 class="subtitle" v-else>{{ totalDone }} of {{ tasks.length }} tasks completed</h3>
    <div v-if="tasks.length" class="button-container">
      <FilterButton
        :currentFilter="filter"
        filter="all"
        label="All"
        @set-filter="filter = $event"
      />
      <FilterButton
        :currentFilter="filter"
        filter="todo"
        label="todo"
        @set-filter="filter = $event"
      />
      <FilterButton
        :currentFilter="filter"
        filter="done"
        label="done"
        @set-filter="filter = $event"
      />
    </div>
    <TaskList
      :tasks="filteredTasks"
      @toggle-done="toggleDone"
      @remove-task="removeTask($event)"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
}

.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
