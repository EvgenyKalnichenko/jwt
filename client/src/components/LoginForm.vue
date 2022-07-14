<template>
  <div>
    <input type="text" v-model="email">
    <input type="password" v-model="password">
    <button @click="registration">регистрация</button>
    <button @click="login">Вход</button>
    <button @click="logout">Выход</button>
    <br>
    <br>
    Авторизация: {{isAuth}}
    <br>
    <div v-if="isAuth">
      Ваши данные: {{user.email}}
    </div>
    <br>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue'

export default {
  setup () {
    const store = inject('store')
    const email = ref('')
    const password = ref('')
    const login = () => store.user.login(email.value, password.value)
    const registration = () => store.user.registration(email.value, password.value)
    const logout = () => store.user.logout()
    const isAuth = computed(() => store.user.isAuth)
    const user = computed(() => store.user.user)
    return {
      login,
      registration,
      logout,
      isAuth,
      user,
      email,
      password
    }
  }
}
</script>

<style scoped>

</style>
