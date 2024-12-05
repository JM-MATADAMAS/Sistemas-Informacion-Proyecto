<template>
  <login-user />
</template>

<script>
import LoginUser from '@/components/users/LoginUser.vue'

export default {
  name: 'IndexPage',
  components: {
    LoginUser
  },
  layout: 'login'
}
</script>
