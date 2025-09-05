import { ref, watch } from 'vue';
import { useCookies } from 'vue3-cookies';

export function useCookieStorage<T>(key: string, defaultValue: T) {
  const { cookies } = useCookies();
  
  const data = ref<T>(defaultValue);
  
  const storedValue = cookies.get(key);
  if (storedValue) {
    try {
      data.value = JSON.parse(storedValue);
    } catch (e) {
      console.error('Error parsing cookie data:', e);
      data.value = defaultValue;
    }
  }
  
  watch(data, (newValue) => {
    cookies.set(key, JSON.stringify(newValue), {
      expires: '7d', // хранить 7 дней
      sameSite: 'strict'
    });
  }, { deep: true });
  
  return data;
}