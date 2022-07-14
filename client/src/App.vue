<template>
  <router-view/>
  <button @click="getUsers">Получить пользователей</button>
  <hr>
  <div
    v-for="item in users"
    :key="item._id"
  >
    email: {{item.email}} <br>
    id: {{item._id}} <br>
    isActivated: {{item.isActivated}} <br><br>
  </div>
</template>

<script>
import { onMounted, ref, inject } from 'vue'
import UsersService from '@/services/UsersService'

export default {
  setup () {
    const store = inject('store')
    const users = ref([])
    onMounted(() => {
      if (localStorage.getItem('token')) {
        console.log('checkAuth')
        store.user.checkAuth()
      }
    })
    const getUsers = async () => {
      try {
        const response = await UsersService.fetchUsers()
        users.value = response.data
      } catch (e) {
        console.log(e)
      }
    }
    return {
      users,
      getUsers
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
