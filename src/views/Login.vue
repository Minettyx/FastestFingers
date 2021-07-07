<template>
  <div>
    <h1>{{$socket.loginError.value === 'AlreadyConnected' ? 'Already connected from another location' : 'Test'}}</h1>
    <button type="button" class="btn btn-primary" @click="$logIn()" v-if="$socket.loginError.value === 'AuthenticationError'">LogIn with Google</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login'
})
</script>
