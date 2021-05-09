<template>
  <div id="app">
    <NavigationMobile v-if="showNav" />
    <div class="content inline" :class="{'open':showNav}">
        <a @click="showNav = !showNav">
        <div id="navigation-icon" class="inline" v-if="mobileView">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 m-4" fill="#f59e0b" viewBox="0 0 24 24" stroke="#f59e0b">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
          </div>
        </a>
        </div>
        <Navigation v-if="!mobileView" />
      </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation';
import NavigationMobile from '@/components/navigation/NavigationMobile';

export default {
  name: 'header.dashboard.components',
  props: {
    contractAddress: String,
    account: String,
  },
  components: {
    Navigation,
    NavigationMobile
  },
  data:() => ({
    mobileView:true,
    showNav:false,
  }),
   created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
  methods: {
    handleView:function() {
      this.mobileView = window.innerWidth <= 990;
      if (this.mobileView > 990) {
        this.showNav = false;
      }
    },
  },
  watch: {
    theme(newTheme) {
      newTheme === "light"
          ? document.querySelector("html").classList.remove("dark")
          : document.querySelector("html").classList.add("dark");
    },
  },
}
</script>

<style lang="scss">

.content {
  padding: 20px;
  transition: 1s transform cubic-bezier(0,.12,.14,1);
}

.open {
  transform: translateX(300px);
  display: block;
}
</style>