<template>
<div>
  <NavBar></NavBar>
  <div class="container mx-auto" v-if="!loading">
    <p class="text-5xl p-6">{{username}}</p>

    <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto">
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-md font-medium text-gray-500">
              User ID
            </dt>
            <dd class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
              {{id}}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-md font-medium text-gray-500">
              Username
            </dt>
            <dd class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
              <p class="inline-block mx-2" v-if="!editingusername">{{username}}</p>
              <button @click="editingusername = true" v-if="!editingusername" type="button" class="inline-block max-w-min py-1 px-1 justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z">
                      </path>
                  </svg>
              </button>

              <div class="flex relative justify-center" v-if="editingusername">
                <form v-on:submit.prevent="editusername()">
                  <input
                    v-model="newusername"
                    type="text"
                    id="rounded-email"
                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent h-8"
                    :placeholder="username"
                  />
                  <input type="submit" class="hidden" ref="usernamesubmit">
                </form>
                <button
                  @click="editusername()"
                  type="button"
                  class="py-2 px-2 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                    ></path>
                  </svg>
                </button>
              </div>

            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-md font-medium text-gray-500">
              Email address
            </dt>
            <dd class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
              {{email}}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-md font-medium text-gray-500">
              Games won
            </dt>
            <dd class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
              {{wins}}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-md font-medium text-gray-500">
              Weekly points
            </dt>
            <dd class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
              {{wkPoints}}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <br>

    <div class="container">

      <div class="mb-3 md:hidden">
        <div class="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            v-model="darkmode"
            type="checkbox"
            id="joDhD59JMcRLstxT"
            class="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label for="joDhD59JMcRLstxT" class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"> </label>
        </div>
        <span class="text-gray-400 font-medium">
          Dark Mode
        </span>
      </div>

      <button @click="$logOut()" type="button" class="md:hidden py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-64 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        Logout
      </button>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Api from '@/api/Api'

export default defineComponent({
  name: 'Profile',
  components: {
    NavBar
  },
  data () {
    return {
      loading: true,

      id: '',
      email: '',
      username: '',
      wins: 0,
      wkPoints: 0,

      editingusername: false,
      newusername: ''
    }
  },
  mounted () {
    Api.getProfile().then(p => {
      this.id = p._id
      this.email = p.email
      this.username = p.username
      this.wins = p.wins
      this.wkPoints = p.wk_points

      this.loading = false

      this.newusername = this.username
    })
  },
  methods: {
    editusername () {
      if (!/^.{3,32}$/.test(this.newusername)) {
        this.$error.emit({ message: 'The username needs to be between 3 and 32 characters' })
        return
      }
      if (this.newusername === this.username) {
        this.editingusername = false
        return
      }
      Api.setUsername(this.newusername).then(ok => {
        if (ok) {
          this.editingusername = false
          this.username = this.newusername
        }
      })
    }
  }
})
</script>
