<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button v-on:click="toggleModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">Close</span>
            <!-- Heroicon name: outline/x -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
          <div class="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Connect your wallet
            </h3>
          </div>
          <div class="mt-3">
            <div v-on:click="metaMask" class="block my-2 px-2 py-2 hover:bg-gray-100 cursor-pointer">
              <p>MetaMask</p>
            </div>
            <div v-on:click="walletConnect"
                 class="block my-2 px-2 py-2 hover:bg-gray-100 cursor-pointer">
              <p>WalletConnect</p>
            </div>
<!--            <div v-on:click="walletLink"-->
<!--                 class="block my-2 px-2 py-2 hover:bg-gray-100 cursor-pointer">-->
<!--              <p>Coinbase</p>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConnectWallet.vue",
  data() {
    return {
      provider: window.ethereum,
      walletConnectOptions: false,
    }
  },
  methods: {
    metaMask: function() {
      this.$emit('connectMetaMask');
    },
    walletConnect: function() {
      this.$emit('connectWalletConnect');
    },
    // walletLink: function() {
    //   this.$emit('connectWalletLink');
    // },
    toggleModal: function() {
      this.$emit('toggleModal');
    }
  },
}
</script>
