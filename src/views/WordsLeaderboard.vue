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
                  Word
                </th>
                <th scope="col" class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Time
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
                    {{ user.username }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <p class="text-gray-900 whitespace-no-wrap text-left">
                    {{ user.word }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <p class="text-gray-900 whitespace-no-wrap text-left">
                    {{ $humanize(user.speed) }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Api from '@/api/Api'
import { ApiTopWordSpeed } from '@/types'

export default defineComponent({
  name: 'Leaderboards',
  components: {
    NavBar
  },
  data () {
    return {
      users: new Map<number, ApiTopWordSpeed[]>(),
      sort: this.$route.query.sort as string,
      page: 0,
      end: false
    }
  },
  mounted () {
    this.load()

    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    usersAsArray () {
      let res: ApiTopWordSpeed[] = []
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
    load (page?: number) {
      if (this.end) {
        return
      }
      if (page) {
        Api.getTopWordSpeed(100, page).then(data => {
          if (data.length === 0) {
            this.end = true
          } else {
            this.users.set(page, data)
            this.page = page
          }
        })
      } else {
        Api.getTopWordSpeed(100, 0).then(data => {
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
        this.load(this.page + 1)
      }
    }
  }
})
</script>
