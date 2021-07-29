<template>
<div>
  <NavBar></NavBar>

  <div class="container mx-auto px-4 sm:px-8 max-w-3xl">
    <div class="py-8">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th scope="col" class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  #
                </th>
                <th scope="col" class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  User
                </th>
                <th scope="col" class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  <router-link to="/topusers?sort=victories">Victories</router-link>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" class="inline" v-if="sort !== 'points'">
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                  </svg>
                </th>
                <th scope="col" class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  <router-link to="/topusers?sort=points">Points</router-link>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" class="inline" v-if="sort == 'points'">
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in usersAsArray" :key="user">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <p class="text-gray-900 whitespace-no-wrap text-left">
                    {{ index+1 }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <p class="text-gray-900 whitespace-no-wrap text-left">
                    {{user.username}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <p class="text-gray-900 whitespace-no-wrap text-left">
                    {{user.wins}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <p class="text-gray-900 whitespace-no-wrap text-left">
                    {{user.wk_points}}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="h-6 md:hidden"></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Api from '@/api/Api'
import { ApiPublicProfile } from '@/types'

export default defineComponent({
  name: 'Leaderboards',
  components: {
    NavBar
  },
  data () {
    return {
      users: new Map<number, ApiPublicProfile[]>(),
      sort: this.$route.query.sort as string,
      page: 0,
      end: false,
      loadingpage: 0
    }
  },
  mounted () {
    if (this.sort === 'points') {
      this.loadByPoints()
    } else {
      this.loadByWins()
    }

    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    usersAsArray () {
      let res: ApiPublicProfile[] = []
      let i = 0
      while (true) {
        const batch = this.users.get(i)
        if (batch) {
          res = res.concat(batch)
        } else {
          return res
        }
        i++
      }
    }
  },
  methods: {
    loadByWins (page?: number) {
      if (this.end) {
        return
      }
      if (page) {
        if (this.loadingpage < page) {
          this.loadingpage = page
          Api.getTopWins(100, page).then(data => {
            if (data.length === 0) {
              this.end = true
            } else {
              this.users.set(page, data)
              this.page = page
            }
          })
        }
      } else {
        Api.getTopWins(100, 0).then(data => {
          this.users.clear()
          this.users.set(0, data)
          this.page = 0
          this.end = false
        })
      }
    },
    loadByPoints (page?: number) {
      if (this.end) {
        return
      }
      if (page) {
        Api.getTopPoints(100, page).then(data => {
          if (data.length === 0) {
            this.end = true
          } else {
            this.users.set(page, data)
            this.page = page
          }
        })
      } else {
        Api.getTopPoints(100, 0).then(data => {
          this.users.clear()
          this.users.set(0, data)
          this.page = 0
          this.end = false
        })
      }
    },
    onScroll () {
      console.log(window.scrollY, window.innerHeight, document.body.scrollHeight)
      if (window.scrollY + window.innerHeight > document.body.scrollHeight - 300) {
        if (this.sort === 'points') {
          this.loadByPoints(this.page + 1)
        } else {
          this.loadByWins(this.page + 1)
        }
      }
    }
  }
})
</script>
