<template>
  <div v-show="loading" id="isBusy">
    <div
        id="loading-style"
        class="animation-loading fixed z-10 mx-auto inset-0 w-2/12"
        ref="animation"
    ></div>
  </div>
</template>

<script>
import lottie from "lottie-web";
import Animation from "@/components/plugins/is-busy/loading-animation.json";

export default {
  name: "IsBusy",
  data: () => ({
    loading: false,
    notification: {
      title: '',
      message: '',
      type: null,
    }
  }),
  methods: {
    toggleIsBusy() {
      this.loading ? this.isBusy() : this.isBusyStop();
    },
    isBusy() {
      return (this.anim = lottie.loadAnimation({
        container: this.$refs.animation, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: Animation, // the path to the animation json
      }));
    },
    isBusyStop() {
      return this.anim.stop();
    },
  },
  watch: {
    loading: {
      handler() {
        this.toggleIsBusy();
      }
    }
  }
};
</script>
