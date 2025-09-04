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
  <form action="" @submit.prevent="formSubmitted">
    <label for="">
      New Task
      <input
        type="text"
        v-model="newTask"
        name="newTask"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
      />
      <small v-if="error" id="invalid-helper">
        Please provide a valid value!
      </small>
    </label>
    <div class="button-container">
      <button>Add</button>
    </div>
  </form>
</template>
