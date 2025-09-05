<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  addTask: [newTask: string];
}>();

const newTask = ref("");
const error = ref("");

function formSubmitted() {
  if (newTask.value.trim()) {
    emit("addTask", newTask.value.trim());
    newTask.value = "";
  } else {
    error.value = "Task cannot be empty";
  }
}
</script>

<template>
  <form class="task-form" action="" @submit.prevent="formSubmitted">
    <label class="task-form__label" for="newTask">
      New Task
      <input
        class="task-form__input"
        type="text"
        v-model="newTask"
        name="newTask"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
      />
      <small class="task-form__error" v-if="error" id="invalid-helper">
        Please provide a valid value!
      </small>
    </label>
    <div class="task-form__button-container">
      <button class="task-form__button">Add</button>
    </div>
  </form>
</template>

<style>
.task-form__button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
