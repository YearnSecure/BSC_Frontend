<template>
  <div id="header">
    <!-- Page title & actions -->
    <div class="border-b border-gray-200 dark:bg-gray-900 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div class="flex-0 min-w-0">
        <a :href="switchPlatformUrl" class="py-2 px-3 bg-yellow-500 text-white cursor-pointer rounded hover:bg-yellow-600" target="_blank">ERC Chain</a>
      </div>
      <div class="flex-1 min-w-0 text-center">
        <h1 class="text-lg font-medium leading-6 text-gray-900 dark:text-white sm:truncate">
          YSEC Token address: <a :href="`https://etherscan.io/address/${contractAddress}`" target="_blank" class="text-blue-500 hover:text-yellow-600 transiation duration-300">{{ contractAddress }}</a>
        </h1>
        <h3 v-if="isConnected" class="text-sm font-medium leading-4 text-gray-900 dark:text-white sm:truncate">
          You are connected: <a :href="`https://bscscan.com/address/${account}`" target="_blank" class="text-yellow-500 hover:text-blue-600 transiation duration-300">{{ account }}</a>
        </h3>
        <h4 v-if="isConnected" class="text-xs font-medium leading-4 text-green-600 sm:truncate">
          <span v-if="chainId">{{ network }}</span>
        </h4>
      </div>
      <div class="mt-4 flex sm:mt-0 sm:ml-4">
        <div class="flex pl-1 pr-1">
          <a href="https://discord.com/invite/TZMF4jm" target="_blank" class="text-gray-400 hover:text-blue-400">
            <span class="sr-only">Discord</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path fill-rule="evenodd" d="M 12.65625 4.90625 L 11.875 5 C 11.875 5 8.371094 5.382813 5.8125 7.4375 L 5.78125 7.4375 L 5.75 7.46875 C 5.175781 7.996094 4.925781 8.644531 4.53125 9.59375 C 4.136719 10.542969 3.714844 11.753906 3.34375 13.09375 C 2.601563 15.777344 2 19.027344 2 22 L 2 22.25 L 2.125 22.5 C 3.050781 24.125 4.695313 25.160156 6.21875 25.875 C 7.742188 26.589844 9.058594 26.96875 9.96875 27 L 10.5625 27.03125 L 10.875 26.5 L 11.96875 24.5625 C 13.128906 24.824219 14.464844 25 16 25 C 17.535156 25 18.871094 24.824219 20.03125 24.5625 L 21.125 26.5 L 21.4375 27.03125 L 22.03125 27 C 22.941406 26.96875 24.257813 26.589844 25.78125 25.875 C 27.304688 25.160156 28.949219 24.125 29.875 22.5 L 30 22.25 L 30 22 C 30 19.027344 29.398438 15.777344 28.65625 13.09375 C 28.285156 11.753906 27.863281 10.542969 27.46875 9.59375 C 27.074219 8.644531 26.824219 7.996094 26.25 7.46875 L 26.21875 7.4375 L 26.1875 7.4375 C 23.628906 5.382813 20.125 5 20.125 5 L 19.34375 4.90625 L 19.0625 5.625 C 19.0625 5.625 18.773438 6.355469 18.59375 7.1875 C 17.460938 7.035156 16.535156 7 16 7 C 15.464844 7 14.539063 7.035156 13.40625 7.1875 C 13.226563 6.355469 12.9375 5.625 12.9375 5.625 Z M 11.28125 7.1875 C 11.324219 7.328125 11.367188 7.449219 11.40625 7.5625 C 10.113281 7.882813 8.734375 8.371094 7.46875 9.15625 L 8.53125 10.84375 C 11.125 9.234375 14.851563 9 16 9 C 17.148438 9 20.875 9.234375 23.46875 10.84375 L 24.53125 9.15625 C 23.265625 8.371094 21.886719 7.882813 20.59375 7.5625 C 20.632813 7.449219 20.675781 7.328125 20.71875 7.1875 C 21.652344 7.375 23.433594 7.804688 24.90625 8.96875 C 24.898438 8.972656 25.28125 9.550781 25.625 10.375 C 25.976563 11.222656 26.367188 12.351563 26.71875 13.625 C 27.394531 16.066406 27.925781 19.039063 27.96875 21.65625 C 27.339844 22.617188 26.171875 23.484375 24.9375 24.0625 C 23.859375 24.566406 23.007813 24.75 22.5 24.84375 L 22 24 C 22.296875 23.890625 22.589844 23.769531 22.84375 23.65625 C 24.382813 22.980469 25.21875 22.25 25.21875 22.25 L 23.90625 20.75 C 23.90625 20.75 23.34375 21.265625 22.03125 21.84375 C 20.71875 22.421875 18.714844 23 16 23 C 13.285156 23 11.28125 22.421875 9.96875 21.84375 C 8.65625 21.265625 8.09375 20.75 8.09375 20.75 L 6.78125 22.25 C 6.78125 22.25 7.617188 22.980469 9.15625 23.65625 C 9.410156 23.769531 9.703125 23.890625 10 24 L 9.5 24.84375 C 8.992188 24.75 8.140625 24.566406 7.0625 24.0625 C 5.828125 23.484375 4.660156 22.617188 4.03125 21.65625 C 4.074219 19.039063 4.605469 16.066406 5.28125 13.625 C 5.632813 12.351563 6.023438 11.222656 6.375 10.375 C 6.71875 9.550781 7.101563 8.972656 7.09375 8.96875 C 8.566406 7.804688 10.347656 7.375 11.28125 7.1875 Z M 12.5 14 C 11.726563 14 11.042969 14.441406 10.625 15 C 10.207031 15.558594 10 16.246094 10 17 C 10 17.753906 10.207031 18.441406 10.625 19 C 11.042969 19.558594 11.726563 20 12.5 20 C 13.273438 20 13.957031 19.558594 14.375 19 C 14.792969 18.441406 15 17.753906 15 17 C 15 16.246094 14.792969 15.558594 14.375 15 C 13.957031 14.441406 13.273438 14 12.5 14 Z M 19.5 14 C 18.726563 14 18.042969 14.441406 17.625 15 C 17.207031 15.558594 17 16.246094 17 17 C 17 17.753906 17.207031 18.441406 17.625 19 C 18.042969 19.558594 18.726563 20 19.5 20 C 20.273438 20 20.957031 19.558594 21.375 19 C 21.792969 18.441406 22 17.753906 22 17 C 22 16.246094 21.792969 15.558594 21.375 15 C 20.957031 14.441406 20.273438 14 19.5 14 Z M 12.5 16 C 12.554688 16 12.625 16.019531 12.75 16.1875 C 12.875 16.355469 13 16.648438 13 17 C 13 17.351563 12.875 17.644531 12.75 17.8125 C 12.625 17.980469 12.554688 18 12.5 18 C 12.445313 18 12.375 17.980469 12.25 17.8125 C 12.125 17.644531 12 17.351563 12 17 C 12 16.648438 12.125 16.355469 12.25 16.1875 C 12.375 16.019531 12.445313 16 12.5 16 Z M 19.5 16 C 19.554688 16 19.625 16.019531 19.75 16.1875 C 19.875 16.355469 20 16.648438 20 17 C 20 17.351563 19.875 17.644531 19.75 17.8125 C 19.625 17.980469 19.554688 18 19.5 18 C 19.445313 18 19.375 17.980469 19.25 17.8125 C 19.125 17.644531 19 17.351563 19 17 C 19 16.648438 19.125 16.355469 19.25 16.1875 C 19.375 16.019531 19.445313 16 19.5 16 Z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
        <div class="flex pl-1 pr-1">
          <a href="https://twitter.com/yearnsecure" target="_blank" class="text-gray-400 hover:text-blue-400">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
        <div class="flex pl-1 pr-1">
          <a href="https://t.me/YearnSecure" target="_blank" class="text-gray-400 hover:text-blue-400">
            <span class="sr-only">Telegram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="m.415 11.196 5.869 2.925c.227.112.495.104.712-.023l5.224-3.037-3.162 2.802c-.161.143-.253.347-.253.562v6.825c0 .72.919 1.023 1.35.451l2.537-3.373 6.274 3.573c.44.253 1.004-.001 1.106-.504l3.913-19.5c.117-.586-.466-1.064-1.008-.846l-22.5 8.775c-.604.236-.643 1.081-.062 1.37zm21.83-8.249-3.439 17.137-5.945-3.386c-.324-.185-.741-.103-.971.201l-1.585 2.107v-4.244l8.551-7.576c.677-.599-.101-1.664-.874-1.21l-11.39 6.622-3.992-1.989z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
        <div class="flex pl-1 pr-1">
          <a href="https://github.com/YearnSecure" target="_blank" class="text-gray-400 hover:text-purple-700">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
        <div class="flex pl-1 pr-1">
          <a class="theme" v-on:click="setTheme">
            <svg class="h-6 w-6 text-gray-400 hover:text-yellow-400 dark:text-yellow-400 dark:hover:text-white transition duration-500 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </a>
        </div>
        <button v-if="!isConnected" type="button" v-on:click="toggleConnectWalletModal" class="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3">
          Connect wallet
        </button>
        <button v-if="isConnected" type="button" class="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3">
          {{ truncateString(walletAddress, 12) }}
        </button>
      </div>
    </div>
    <ConnectWalletModal
        v-if="showModal"
        @connectMetaMask="connectMetaMask"
        @connectWalletConnect="connectWalletConnect"
        @toggleModal="toggleConnectWalletModal"/>
  </div>  
</template>

<script>
import Web3 from "web3";
import { mapGetters } from "vuex";
import ConnectWalletModal from "@/components/modals/ConnectWallet";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default {
  name: 'header.dashboard.components',
  props: {
    contractAddress: String,
    account: String,
    chainId: String
  },
  components: {
    ConnectWalletModal
  },
  data() {
    return {
      switchPlatformUrl: process.env.VUE_APP_ERC,
      showModal: false,
      provider: null,
      walletAddress: null,
      isConnected: false,
      web3: null,
    }
  },
  beforeMount: function() {
    this.$store.dispatch("initTheme");
  },
  computed: {
    ...mapGetters({ theme: "getTheme" }),
    network: function () {
      let network = 'Custom network';
      switch (this.chainId) {
        case '0x1':
          network = 'ETH Main network'
          break;
        case '0x38':
          network = 'BSC Main network'
          break;
        case '0x61':
          network = 'BSC Test network'
          break;
      }
      return network;
    }
  },
  methods: {
    connectMetaMask: function() {
      this.provider = window.ethereum;
      this.provider
          .request({ method: 'eth_requestAccounts' })
          .then(() => {
            this.handleAccountsChanged(this.provider._state.accounts);
          }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("User rejected connection")
        } else {
          console.log(`There is an error:`);
          console.log(err);
        }
      });
    },
    connectWalletConnect: async function() {
      this.provider = new WalletConnectProvider({
        infuraId: process.env.VUE_APP_INFURA_ID,
        bridge: "https://bridge.walletconnect.org", // Required
        rpc: {
          1: process.env.VUE_APP_INFURA_URL,
          3: "https://ropsten.infura.io/v3/",
          38: "https://bsc-dataseed.binance.org/",
          61: "https://data-seed-prebsc-1-s1.binance.org:8545"
        }
      });
      await this.provider.enable();

      this.web3 = new Web3(this.provider);

      if (this.provider.accounts[0] && this.provider.accounts[0] !== null && this.provider.accounts[0] !== "") {
        this.handleAccountsChanged(this.provider.accounts);
      }
    },
    handleAccountsChanged: function(accounts) {
      console.log(accounts);
      if (accounts !== null && accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('MetaMask is locked or the user has not connected any accounts');
        this.isConnected = false;
        this.account = null;
        this.toggleConnectWalletModal();
        this.$emit('connectedWallet', false);
      } else {
        // this.$store.state.account = accounts[0];
        this.walletAddress = accounts[0];
        // show user that MetaMask is connected
        this.isConnected = true;
        this.toggleConnectWalletModal();
        this.$emit('connectedWallet', true, accounts[0]);
      }
    },
    truncateString: function(str, num) {
      if (str !== undefined) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    },
    setTheme: function() {
      this.$store.dispatch("toggleTheme");
    },
    toggleConnectWalletModal: function() {
      this.showModal = !this.showModal;
    }
  },
  watch: {
    theme(newTheme) {
      newTheme === "light"
          ? document.querySelector("html").classList.remove("dark")
          : document.querySelector("html").classList.add("dark");
    },
    provider: {
      handler: function () {
        console.log(this.provider);
        // if (this.provider._state !== undefined) {
        //   if (
        //       this.$store.getters.account === '' &&
        //       this.provider._state.accounts.length > 0) {
        //     this.$store.state.account = this.provider._state.accounts[0];
        //     this.handleAccountsChanged(this.provider._state.accounts);
        //   } else if (
        //       this.$store.getters.account !== '' &&
        //       this.provider._state.accounts.length === 0) {
        //     this.$store.state.account = '';
        //     this.handleAccountsChanged(this.provider._state.accounts);
        //   }
        // }
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">
  a.theme {
    &:hover {
      cursor: pointer;
    }
  }
</style>