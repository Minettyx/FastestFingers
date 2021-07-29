<template>
<div>
  <div class="fixed min-w-full md:hidden">
    <ErrorToaster></ErrorToaster>
  </div>

  <nav class="bg-white dark:bg-gray-800 shadow md:fixed min-w-full hidden md:block">
    <ErrorToaster></ErrorToaster>
    <div class="max-w-none mx-auto px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link class="flex-shrink-0" to="/">
            <img class="h-8 w-8" src="@/assets/logo.png" alt="icon" />
          </router-link>
          <div class=" md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link :class="[$route.path === '/' ? 'text-gray-800' : 'text-gray-400']" class="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium" to="/">
                Game
              </router-link>
              <Menu>
                <MenuButton>
                  <button :class="[$route.path === '/leaderboards' ? 'text-gray-800' : 'text-gray-400']" class="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium" to="/leaderboards">
                    Leaderboards
                  </button>
                </MenuButton>
                <MenuItems>
                  <div class="origin-top-right top-12 absolute left-32 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <router-link to="/topusers?sort=victories" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                        <span class="flex flex-col">
                          <span>
                            Victories
                          </span>
                        </span>
                      </router-link>
                      <router-link to="/topusers?sort=points" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                        <span class="flex flex-col">
                          <span>
                            Weekly Points
                          </span>
                        </span>
                      </router-link>
                      <router-link to="/topwords" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                        <span class="flex flex-col">
                          <span>
                            Fastest Words
                          </span>
                        </span>
                      </router-link>
                    </div>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <div class="block">
          <div class="ml-4 flex items-center md:ml-6">

            <div class="p-5">
              <div class="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  v-model="darkmode"
                  type="checkbox"
                  id="7X2Nef9RV7pteftR"
                  class="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label for="7X2Nef9RV7pteftR" class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"> </label>
              </div>
            </div>

            <div class="ml-3 relative">
              <div class="relative inline-block text-left">
                <Menu>
                  <MenuButton>
                    <button
                      type="button"
                      class="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                      id="options-menu"
                    >
                      <svg width="20" fill="currentColor" height="20" class="text-gray-800" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                        ></path>
                      </svg>
                    </button>
                  </MenuButton>
                  <MenuItems>
                    <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <router-link to="/profile" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                          <span class="flex flex-col">
                            <span>
                              Profile
                            </span>
                          </span>
                        </router-link>
                        <a @click="$logOut()" class="cursor-pointer block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                          <span class="flex flex-col">
                            <span>
                              Logout
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Navbar -->

  <nav class="bg-white dark:bg-gray-800 shadow fixed min-w-full md:hidden bottom-0" v-show="!(windowHeight/windowWidth < 1.15 && windowHeight/windowWidth > 0.85)">
    <div class="max-w-none mx-auto px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center pl-12">
          <router-link class="flex-shrink-0" to="/">
            <img class="h-8 w-8" src="@/assets/logo.png" alt="icon" />
          </router-link>
        </div>
        <div class="flex items-center">

          <Menu>
            <MenuButton>
              <button class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"/></svg>
              </button>
            </MenuButton>
            <MenuItems>
              <div class="bottom-16 origin-top-right fixed mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5" style="left: 50%; transform: translate(-50%, 0);">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <router-link to="/topusers?sort=victories" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                    <span class="flex flex-col">
                      <span>
                        Victories
                      </span>
                    </span>
                  </router-link>
                  <router-link to="/topusers?sort=points" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                    <span class="flex flex-col">
                      <span>
                        Weekly Points
                      </span>
                    </span>
                  </router-link>
                  <router-link to="/topwords" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                    <span class="flex flex-col">
                      <span>
                        Fastest Words
                      </span>
                    </span>
                  </router-link>
                </div>
              </div>
            </MenuItems>
          </Menu>

        </div>
        <div class="flex items-center pr-12">
          <router-link class="flex-shrink-0" to="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 448 512"> <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" ></path> </svg>
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <div :style="{'min-height': viewport>1 ? '64px' : '0px'}"></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import ErrorToaster from '../components/ErrorMessage.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    Menu,
    MenuButton,
    MenuItems,
    ErrorToaster
  }
})
</script>
