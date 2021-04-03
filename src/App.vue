<template>
  <div id="app" class="dark:bg-gray-900">
    <div class="flex bg-white dark:bg-gray-900">
      <Sidebar />
      <!-- Main column -->
      <div class="flex flex-col w-0 flex-1">
        <router-view @toggleIsBusy="toggleIsBusy" class="flex w-100 h-full pb-10" />
        <Footer class="block border-t-2 bg-gray-50 dark:bg-gray-800"/>
      </div>
    </div>
    <Cookie
      v-if="showCookie"
      @setCookie="setCookie" />
  </div>
</template>

<script>
import splitbee from '@splitbee/web';

import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer';
import Cookie from '@/components/Cookie'

export default {
  name: 'app',
  components: {
    Sidebar,
    Footer,
    Cookie
  },
  data: () => ({
    showCookie: true,
  }),
  beforeMount: function () {
    this.$store.dispatch("initTheme");
  },
  mounted: function () {
    const cookie = localStorage.getItem('ysec.cookie');
    if (cookie !== undefined && cookie !== null) {
      this.showCookie = false;
    }

    splitbee.init({
      // Enable cookie-less mode. Defaults to `false`
      disableCookie: false,

      // Set custom urls when using proxying
      scriptUrl: "https://cdn.splitbee.io/sb.js",
    });
  },
  methods: {
    setCookie: function () {
      const date = new Date();
      localStorage.setItem('ysec.cookie', `${date}`);
      this.showCookie = false;
    },
    toggleIsBusy: function (bool) {
      // bool ? this.$refs.isBusy.isBusy() :  this.$refs.isBusy.isBusyStop();
    }
  }
}
</script>

<style lang="scss">
  .footer {
    margin-top: -120px;
  }
</style>
