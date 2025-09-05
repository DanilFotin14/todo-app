import { ref, computed, watch } from 'vue';
import { useCookieStorage } from './useCookieStorage';
import type { Task } from "./../types";

export function useTaskStore() {
  const COOKIE_KEY = 'vue-tasks';
  
  const tasksStorage = useCookieStorage<Task[]>(COOKIE_KEY, []);
  
  const tasks = ref<Task[]>(tasksStorage.value);
  
  watch(tasks, (newValue) => {
    tasksStorage.value = newValue;
  }, { deep: true });
  
  const nextId = computed(() => {
    if (tasks.value.length === 0) return 1;
    return Math.max(...tasks.value.map(task => task.id)) + 1;
  });
  
  function addTask(title: string): Task {
    const newTask: Task = {
      id: nextId.value,
      title: title.trim(),
      completed: false
    };
    
    tasks.value.push(newTask);
    return newTask;
  }
  
  function removeTask(id: number): boolean {
    const index = tasks.value.findIndex(task => task.id === id);
    if (index === -1) return false;
    
    tasks.value.splice(index, 1);
    return true;
  }
  
  function updateTask(updatedTask: Task): boolean {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id);
    if (index === -1) return false;
    
    tasks.value[index] = updatedTask;
    return true;
  }
  
  return {
    tasks,
    addTask,
    removeTask,
    updateTask
  };
}