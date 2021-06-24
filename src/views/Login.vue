<template>
  <div>
    <h1>Test</h1>
    <button type="button" class="btn btn-primary" @click="$logIn()">LogIn</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login'
})
</script>
