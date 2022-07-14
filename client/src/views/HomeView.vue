<template>
  <div class="home">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'HomeView',
  components: {
    LoginForm
  }
}
</script>
