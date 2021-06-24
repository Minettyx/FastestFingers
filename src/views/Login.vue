<template>
  <div>
    <h1>Test</h1>
    <button @click="$logIn()">signIn</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login'
})
</script>
