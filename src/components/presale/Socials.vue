<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Socials
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="block" v-for="(social, key) in socials" :key="key">
          <div class="flex">
            <div class="flex pr-5">
              <svg class="w-6 h-6 mt-3 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </div>
            <div class="flex w-full">
              <input
                  v-if="social.type === 0"
                  type="text"
                  placeholder="https://www.example.com"
                  v-model="social.url"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
              <input
                  v-else-if="social.type === 1"
                  type="text"
                  placeholder="https://www.twitter.com"
                  v-model="social.url"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
              <input
                  v-else-if="social.type === 2"
                  type="text"
                  placeholder="https://www.telegram.com"
                  v-model="social.url"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
              <input
                  v-else-if="social.type === 3"
                  type="text"
                  placeholder="https://www.github.com"
                  v-model="social.url"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
              <input
                  v-else-if="social.type === 4"
                  type="text"
                  placeholder="https://www.medium.com"
                  v-model="social.url"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'presale.Socials.components',
  props: {
    account: String,
    socials: Array,
  },
  data: () => ({
    error: {
      tokenAddress: '',
      tokenName: '',
      companyName: ''
    }
  }),
  watch: {
    socials: {
      handler() {
        const hasSocials = this.socials.find(social => social.url !== '');

        if (hasSocials.url !== '')
          this.$emit('validSocials');
      },
      deep: true
    }
  },
}
</script>