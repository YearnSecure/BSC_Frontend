<template>
  <div id="footer">
    <footer>
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-6 md:order-2">
        </div>
        <div class="mt-8 pd-10 md:mt-0 md:order-1">
          <p class="text-lefttext-base text-gray-400">
            &copy; {{ new Date().getFullYear() }} YearnSecure, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'footer.components'
}
</script>

<style>

</style>