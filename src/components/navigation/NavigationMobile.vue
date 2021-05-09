<template>
<div id="navigation-mobile">
    <ul class="pt-8">
     <a href="/">
      <li class="underline">Home</li>
     </a>
      <a href="/create/presale">
      <li class="underline">Create IDO</li>
      </a>
      
       <button v-if="!isConnected" v-on:click="toggleInitWalletconnection" class="uppercase
              transition duration-500 ease-in-out
              whitespace-nowrap inline-flex items-center justify-center
              px-4 py-2 rounded-md shadow-sm
              text-base font-medium text-white
              bg-blue-400 hover:bg-blue-500">
          Connect wallet
        </button>
        <button v-else-if="isConnected" v-on:click="toggleConnectedWalletModal" class="uppercase
              transition duration-500 ease-in-out
              whitespace-nowrap inline-flex items-center justify-center
              px-4 py-2 rounded-md shadow-sm
              text-base font-medium text-white
              bg-green-500">
          {{ truncateString(connectedWalletAddress, 12) }}
        </button>
        
    <InitConnectWalletModal
        class="z-30 absolute"
        v-if="showModal"
        @connectMetaMask="connectMetaMask"
        @connectWalletConnect="connectWalletConnect"
        @toggleModal="toggleInitWalletconnection"/>

    <ConnectedWalletModal
        class="z-30 absolute"
        v-if="showConnectedWalletModal"
        :chainId="chainId"
        @disconnectWallet="disconnectWallet"
        @toggleModal="toggleConnectedWalletModal"/>

    <AlertModal
        v-if="showAlert"
        :alert="alert"
        @closeModal="toggleAlertModal" />
    </ul>

   
  </div>
</template>

<script>
import InitConnectWalletModal from "@/components/modals/InitWalletConnection";
import ConnectedWalletModal from "@/components/modals/ConnectedWallet";
import AlertModal from '@/components/modals/Alert.modals';

export default {
    components: {
    InitConnectWalletModal,
    ConnectedWalletModal,
    AlertModal
  },
   props: {
    contractAddress: String,
    account: String,
  },
  data:() => ({
  switchPlatformUrl: process.env.VUE_APP_ERC,
    tokenPrice: null,
    connectedWalletAddress: null,
    walletConnector: null,
    isConnected: false,
    chainId: null,
    alert: {
      title: '',
      msg: ''
    },
    mobileView:false,
    showNav:false,
    showModal: false,
    showAlert: false,
    showConnectedWalletModal: false,

   methods: {
    initConnection: async function() {
      if(this.walletConnector.IsConnected()) {
        await this.loadAccounts();
      } else{
        this.isConnected = false;
      }
    },
    connectMetaMask: async function() {
      this.walletConnector.ConnectMetaMask()
        .then((response) => {
          this.connectedWalletAddress = response[0];
          this.$store.state.account =  response[0];
          this.chainId = this.walletConnector.tempWC.chainId;
          this.isConnected = true;
          this.initConnection();
        }).catch((e) => {
          console.log(`Something went wrong:`, e);
        }).finally(() => {
          this.toggleInitWalletconnection();
        });
    },
    connectWalletConnect: function() {
      this.walletConnector.ConnectWalletConnect()
        .then((response) => {
          this.connectedWalletAddress = response[0];
          this.$store.state.account = response[0];
          this.chainId = this.walletConnector.tempWC.chainId;
          this.isConnected = true;
          this.initConnection();
        }).catch((e) => {
          console.log(`Something went wrong:`, e);
        }).finally(() => {
          this.toggleInitWalletconnection();
        });
    },
    loadAccounts: async function() {
      const wallet = await this.walletConnector.GetAccounts();
      if (wallet !== undefined) {
        this.connectedWalletAddress = wallet[0];
        this.$store.state.account = wallet[0];
        this.chainId = await this.walletConnector.GetChainId();
        this.isConnected = true;
      }
    },
    disconnectWallet: function() {
      this.walletConnector.Disconnect();
      this.connectedWallet = "";
      this.$store.state.connectedWallet = "";
      this.isConnected = false;
      this.toggleConnectedWalletModal();
    },
    toggleConnectedWalletModal: function() {
      this.showConnectedWalletModal = !this.showConnectedWalletModal;
    },
    toggleInitWalletconnection: function() {
      this.showModal = !this.showModal;
    },
   },
  })
}
</script>

<style lang="scss" scoped>
#navigation-mobile {


  ul {
    list-style: none;
    width: 200px;
    float: left;
    padding-left: 40px;
     text-decoration: 1px white;

    li {
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;

       &:hover {
        color: #f59e0b;
      }
    }
  }
}
</style>
