<template>
  <div id="app">
    <NavigationMobile v-if="showNav" />

    <div class="content inline" :class="{ open: showNav }">
      <a @click="showNav = !showNav">
        <div id="navigation-icon" class="inline" v-if="mobileView">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 m-4"
            fill="#f59e0b"
            viewBox="0 0 24 24"
            stroke="#f59e0b"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </a>
    </div>
    <Navigation v-if="!mobileView" />
    <div class="m-auto w-full text-center" v-if="mobileView">
      <button
        v-if="!isConnected"
        v-on:click="toggleInitWalletconnection"
        class="uppercase m-auto transition duration-500 ease-in-out whitespace-nowrap items-center justify-center px-4 mb-5 py-2 mt-4 rounded-md shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-500"
      >
        Connect wallet
      </button>
      <button
        v-else-if="isConnected"
        v-on:click="toggleConnectedWalletModal"
        class="uppercase m-auto transition duration-500 ease-in-out whitespace-nowrap items-center justify-center px-4 mb-5 py-2 rounded-md shadow-sm text-base font-medium text-white bg-green-500"
      >
        {{ truncateString(connectedWalletAddress, 12) }}
      </button>

      <InitConnectWalletModal
        class="z-30 absolute"
        v-if="showModal"
        @connectMetaMask="connectMetaMask"
        @connectWalletConnect="connectWalletConnect"
        @toggleModal="toggleInitWalletconnection"
      />

      <ConnectedWalletModal
        class="z-30 absolute"
        v-if="showConnectedWalletModal"
        :chainId="chainId"
        @disconnectWallet="disconnectWallet"
        @toggleModal="toggleConnectedWalletModal"
      />

      <AlertModal
        v-if="showAlert"
        :alert="alert"
        @closeModal="toggleAlertModal"
      />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation";
import NavigationMobile from "@/components/navigation/NavigationMobile";
import { mapGetters } from "vuex";
import InitConnectWalletModal from "@/components/modals/InitWalletConnection";
import ConnectedWalletModal from "@/components/modals/ConnectedWallet";
import WalletConnector from "@/plugins/walletConnect.plugin";
import AlertModal from "@/components/modals/Alert.modals";
import Web3 from "web3";

export default {
  props: {
    contractAddress: String,
    account: String,
  },
  components: {
    InitConnectWalletModal,
    ConnectedWalletModal,
    AlertModal,
    Navigation,
    NavigationMobile,
  },
  data: () => ({
    switchPlatformUrl: process.env.VUE_APP_ERC,
    web3: new Web3(window.ethereum),
    tokenPrice: null,
    connectedWalletAddress: null,
    walletConnector: null,
    isConnected: false,
    chainId: null,
    alert: {
      title: "",
      msg: "",
    },
    mobileView: false,
    showNav: false,
    showModal: false,
    showAlert: false,
    showConnectedWalletModal: false,
  }),
  beforeMount: function () {
    this.$store.dispatch("initTheme");
  },
  mounted: async function () {
    this.walletConnector = new WalletConnector(window.ethereum);
    await this.initConnection();
    if (
      this.isConnected &&
      this.chainId.toString() !== process.env.VUE_APP_NETWORK_ID &&
      this.chainId.toString() !== process.env.VUE_APP_NETWORK_ID_TWO
    ) {
      let rightNetwork = "";
      switch (process.env.VUE_APP_NETWORK_ID) {
        case "0x1":
          rightNetwork = "ETH Main network";
          break;
        case "0x3":
          rightNetwork = "ETH Ropsten network";
          break;
        case "0x38":
          rightNetwork = "BSC Main network";
          break;
        case "0x61":
          rightNetwork = "BSC Test network";
          break;
        case "0x97":
          rightNetwork = "BSC Test network";
          break;
      }

      this.alert = {
        title: "You're connected to the wrong network",
        msg: `Please switch to ${rightNetwork}.`,
      };
      this.toggleAlertModal();
    }
  },
  computed: {
    ...mapGetters({ theme: "getTheme" }),
    network: function () {
      let network = "Custom network";
      switch (this.chainId) {
        case "0x1":
          network = "ETH Main network";
          break;
        case "0x3":
          network = "Ropsten network";
          break;
        case "0x38":
          network = "BSC Main network";
          break;
        case "0x61":
          network = "BSC Test network";
          break;
      }
      return network;
    },
  },
  methods: {
    initConnection: async function () {
      if (this.walletConnector.IsConnected()) {
        await this.loadAccounts();
      } else {
        this.isConnected = false;
      }
    },
    connectMetaMask: async function () {
      this.walletConnector
        .ConnectMetaMask()
        .then((response) => {
          this.connectedWalletAddress = response[0];
          this.$store.state.account = response[0];
          this.chainId = this.walletConnector.tempWC.chainId;
          this.isConnected = true;
          this.initConnection();
        })
        .catch((e) => {
          console.log(`Something went wrong:`, e);
        })
        .finally(() => {
          this.toggleInitWalletconnection();
        });
    },
    connectWalletConnect: function () {
      this.walletConnector
        .ConnectWalletConnect()
        .then((response) => {
          this.connectedWalletAddress = response[0];
          this.$store.state.account = response[0];
          this.chainId = this.walletConnector.tempWC.chainId;
          this.isConnected = true;
          this.initConnection();
        })
        .catch((e) => {
          console.log(`Something went wrong:`, e);
        })
        .finally(() => {
          this.toggleInitWalletconnection();
        });
    },
    loadAccounts: async function () {
      const wallet = await this.walletConnector.GetAccounts();
      if (wallet !== undefined) {
        this.connectedWalletAddress = wallet[0];
        this.$store.state.account = wallet[0];
        this.chainId = await this.walletConnector.GetChainId();
        this.isConnected = true;
      }
    },
    disconnectWallet: function () {
      this.walletConnector.Disconnect();
      this.connectedWallet = "";
      this.$store.state.connectedWallet = "";
      this.isConnected = false;
      this.toggleConnectedWalletModal();
    },
    toggleConnectedWalletModal: function () {
      this.showConnectedWalletModal = !this.showConnectedWalletModal;
    },
    toggleInitWalletconnection: function () {
      this.showModal = !this.showModal;
    },

    truncateString: function (str, num) {
      if (str !== undefined) {
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + "...";
      }
    },

    handleView: function () {
      this.mobileView = window.innerWidth <= 990;
      // console.log(this.mobileView);
      if (this.mobileView > 990) {
        this.showNav = false;
      }
    },
  },
  created() {
    this.handleView();
  },

  watch: {
    theme(newTheme) {
      newTheme === "light"
        ? document.querySelector("html").classList.remove("dark")
        : document.querySelector("html").classList.add("dark");
    },
  },
};
</script>

<style lang="scss">
.content {
  padding: 20px;
  transition: 2s transform cubic-bezier(0, 0.12, 0.14, 1);
}

.open {
  transform: translateX(200px);
  transition: 1s;
  left: 0;
}
</style>