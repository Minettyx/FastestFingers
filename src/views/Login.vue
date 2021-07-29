<template>
<div class="container mx-auto max-w-md">

  <p class="text-4xl p-5">FastestFingers</p>

  <div v-if="$socket.loginError.value === 'AuthenticationError'" class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
    <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
      Login To Your Account
    </div>
    <div class="flex gap-4 item-center">
      <button
        @click="$logIn()"
        type="button"
        :disabled="!Vue3GoogleOauth.isInit"
        :class="[Vue3GoogleOauth.isInit ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200': 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 cursor-not-allowed']"
        class="py-2 px-4 flex justify-center items-center text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        <svg width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
          ></path>
        </svg>
        Google
      </button>
    </div>
  </div>

  <div v-if="$socket.loginError.value === 'AlreadyConnected'" class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4" role="alert">
    <p class="font-bold">
      Already Connected
    </p>
    <p>
      Looks like you're already connected from another location.
      If this error persist please report the problem.
    </p>
  </div>

  <div class="mb-3 p-5">
    <div class="relative inline-block w-10 mr-2 align-middle select-none">
      <input
        v-model="darkmode"
        type="checkbox"
        id="etmo5bKE4qJuhBU5"
        class="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label for="etmo5bKE4qJuhBU5" class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"> </label>
    </div>
    <span class="text-gray-400 font-medium">
      Dark Mode
    </span>
  </div>

</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'Login',
  setup () {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    return {
      Vue3GoogleOauth
    }
  }
})
</script>
