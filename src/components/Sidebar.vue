<template>
  <div id="sidebar">
    <!-- Static sidebar for desktop -->
    <div class="h-full hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64 border-r-2 border-gray-200 pt-5 pb-4 bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center text-center flex-shrink-0 px-6">
          <img class="h-10 w-auto m-auto" src="/assets/images/logo.svg">
        </div>
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="h-0 flex-1 flex flex-col overflow-y-auto">
          <!-- Navigation -->
          <nav class="px-3 mt-6">
            <div class="space-y-1">
              <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" -->
              <router-link :to="{ name: 'dashboard'}" class="text-gray-700 dark:text-white hover:text-gray-700 dark:hover:text-white hover:bg-yellow-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <svg class="text-gray-700 dark:text-white mr-3 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Dashboard
              </router-link>
              <router-link :to="{ name: 'presale.create'}" class="text-gray-700 dark:text-white hover:text-gray-700 dark:hover:text-white-200 hover:bg-yellow-600 dark:hover:bg-white-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <svg class="text-gray-700 dark:text-white mr-3 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
                Create IDO
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'sidebar.component'
}
</script>

<style>
.router-link-exact-active {
  background-color: #f59e0b;
  color: #000000;
}
</style>
