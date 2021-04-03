<template>
  <div id="yield" class="h-screen">
    <transition name="slide-fade">
      <main v-if="isLoaded" class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
        <Header
            :contractAddress="contractAddress"
            :isConnected="isConnected"
            :account="account"
            :chainId="chainId" />

        <AlertModal 
            v-if="showAlert"
            :alert="alert"
            :showConnectionButton="showConnectionButton"
            :showDownloadButton="showDownloadButton"
            @connectAccount="connectAccount"
            @closeModal="closeModal" />

        <PageTitle 
            :title="title" />

        <YieldPool
            :yieldPool="yieldPool"
            :chartData="chartData"
            :account="account"
            :showApproveButton="showApproveButton"
            :yieldPoolAmount="yieldPoolAmount"
            @stake="stake"
            @unStake="unStake"
            @claim="claim"
            @approve="approve"
            :options="options" />
      </main>
    </transition>
  </div>
</template>

<script>
import Web3 from 'web3'

import AlertModal from '@/components/modals/Alert.modals'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'
import YieldPool from '@/components/views/yield/YieldPool.Yield'

export default {
  name: 'yield.cp.views',
  components: {
    AlertModal,
    Header,
    PageTitle,
    YieldPool
  },
  data() {
    return {
      contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
      isConnected: false,
      showAlert: false,
      isLoaded: false,
      title: 'Yield Dashboard',
      account: this.$store.state.account,
      provider: window.ethereum,
      chainId: null,
      yieldPoolAmount: "",
      yieldPool: {
        totalYsecStaked: 0,
        accountYsecStaked: 0,
        rewards: 0,
        ETHPool: null,
        preSales: 0,
        participants: 0
      },
      showConnectionButton: false,
      showDownloadButton: false,
      showApproveButton: true,
      alert: {
        title: '',
        msg: ''
      },
      chartData: {
          labels: ['','','','','','','','','','','',''],
          datasets: [
            {
              color: ['#db7d02'],
              backgroundColor: ['rgba(245, 158, 11,0.5'],
              data: [25, 35, 70, 90, 115, 200, 230, 350, 380, 460, 465, 470]
            }
          ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            display: false,

            scaleLabel: {
              display: false,
              labelString: 'probability'
            }
          }],
          xAxes: [{
            display: false,
            scaleLabel: {
              display: false,
              labelString: 'probability'
            }
          }],
        },
        legend: {
          display: false,
          position: 'left',
        },
        maintainAspectRatio: false
      },
      contractAbi: [{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"ysecPresaleAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"forAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"forAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"forAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[],"name":"DepositCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EndDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EthAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"Stakers","outputs":[{"internalType":"uint256","name":"StakedAmount","type":"uint256"},{"internalType":"uint256","name":"Reward","type":"uint256"},{"internalType":"uint256","name":"UserRewardPerTokenPaid","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"StartDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalClaimedEthAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ysecPresaleAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ysecTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"Unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ClaimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"RewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"Earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetStaker","outputs":[{"components":[{"internalType":"uint256","name":"StakedAmount","type":"uint256"},{"internalType":"uint256","name":"Reward","type":"uint256"},{"internalType":"uint256","name":"UserRewardPerTokenPaid","type":"uint256"}],"internalType":"struct Staker","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetStakedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
      tokenAbi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
    }
  },
  beforeMount: async function() {
    this.isLoaded = true;
    this.$loading(true);
    if (this.$store.getters.account !== '') {
      this.account = this.$store.getters.account;
      this.chainId = this.provider.chainId;
      this.isConnected = true;
    }
  },
  mounted: async function () {
    if (this.account === '') {
      // Detect provider
      await this.detectProvider();
      // Connect to your account
      await this.currentAccount();
      // Read contract data
      await this.getContractData();
    }

    await this.getContractData();
    await this.tokenAllowance();
    await this.getYieldAmount();

    this.$loading(false);
  },
  methods: {
    detectProvider: async function () {
      if (!this.provider.isMetaMask)
        return this.showError(
          'MetaMask is not installed.', 
          'It looks like the connection to the MetaMask wallet failed. Try connecting again.');
    },
    currentAccount: async function () {
      // connect to MetaMask account
      this.chainId = this.provider.chainId;
      this.provider
        .request({ method: 'eth_accounts' })
        .then(this.handleAccountsChanged(this.provider._state.accounts))
        .catch((err) => {
          // Some unexpected error.
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
          this.showError(
            'Unexpected error',
            err);
        });
    },
    getContractData: async function () {
      const contractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const contractInterface = new web3.eth.Contract(contractAbi);
      contractInterface.options.address = process.env.VUE_APP_YIELD_CONTRACT;

      // Get total YSEC staked
      await this.getTotalYsecStaked(contractInterface);
      // Get YSEC staked from connected account
      await this.getAccountYsecStaked(contractInterface);
      // Get Rewards
      await this.getRewards(contractInterface);
      // Get Eth in pool
      await this.getEthInPool();
      // Get Presales launched
      await this.getPresaleLaunched(contractInterface);
      // Get Participants
      await this.getParticipants(contractInterface);
    },
    tokenAllowance: async function() {
      const tokenAbi = this.tokenAbi;
      const web3 = new Web3(this.provider);
      const tokenInterface = new web3.eth.Contract(tokenAbi);
      tokenInterface.options.address = process.env.VUE_APP_CONTRACT_ADDRESS;

      await tokenInterface.methods.allowance(this.account, process.env.VUE_APP_YIELD_CONTRACT)
        .call()
        .then((response) => {
          if (response > 500000000000000000000000) {
            this.showApproveButton = false;
            this.$store.state.yieldAllowance = true;
          }
        });
    },
    getYieldAmount: async function() {
      const tokenAbi = this.tokenAbi;
      const web3 = new Web3(this.provider);
      const tokenInterface = new web3.eth.Contract(tokenAbi);
      tokenInterface.options.address = process.env.VUE_APP_CONTRACT_ADDRESS;

      await tokenInterface.methods.balanceOf(this.account)
        .call()
        .then((response) => {
          console.log(response)
          this.yieldPoolAmount = web3.utils.fromWei(response);
        });
    },
    approve: async function() {
      this.$loading(true);
      const tokenAbi = this.tokenAbi;
      const web3 = new Web3(this.provider);
      const tokenInterface = new web3.eth.Contract(tokenAbi);
      tokenInterface.options.address = process.env.VUE_APP_CONTRACT_ADDRESS;

      await tokenInterface.methods.approve(process.env.VUE_APP_YIELD_CONTRACT, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
        .send({from: this.account})
        .then((response) => {
          if (response.status) {
            this.$notifications(
              'Approved success',
              ``,
              0, // success
              true);

            this.showApproveButton = false;
            this.$store.state.yieldAllowance = true;

            this.$loading(false);
          }
        })
        .catch((e) => {
          this.$notifications(
              'Something went wrong staking',
              e,
              1, // error
              true);

          this.$loading(false);
        });
    },
    stake: async function(amount) {
      const contractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(contractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_YIELD_CONTRACT;

      this.$loading(true);
      await presaleContractInterface.methods.Stake(web3.utils.toWei(amount))
          .send({from: this.account})
          .then((response) => {
            if (response.status) {
              this.$notifications(
                  'Staked successfully',
                  ``,
                  0, // success
                  true);

              this.$loading(false);
            }
          })
          .catch((e) => {
            this.$notifications(
                'Something went wrong staking',
                e,
                1, // error
                true);

            this.$loading(false);
          });
    },
    unStake: async function() {
      const contractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(contractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_YIELD_CONTRACT;

      this.$loading(true);
      await presaleContractInterface.methods.Unstake()
          .send({from: this.account})
          .then((response) => {
            if (response.status) {
              this.$notifications(
                  'Unstaked successfully',
                  ``,
                  0, // success
                  true);

              this.$loading(false);
            }
          })
          .catch((e) => {
            this.$notifications(
                'Something went wrong unstaking',
                e,
                1, // error
                true);

            this.$loading(false);
          });
    },
    claim: async function() {
      const contractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(contractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_YIELD_CONTRACT;

      this.$loading(true);
      await presaleContractInterface.methods.ClaimReward()
          .send({from: this.account})
          .then((response) => {
            if (response.status) {
              this.$notifications(
                  'Reward claimed successfully',
                  ``,
                  0, // success
                  true);

              this.$loading(false);
            }
          })
          .catch((e) => {
            this.$notifications(
                'Something went wrong claiming rewards',
                e,
                1, // error
                true);

            this.$loading(false);
          });
    },
    getTotalYsecStaked: async function(contractInterface) {
      const web3 = new Web3;
      this.yieldPool.totalYsecStaked = web3.utils.fromWei(await contractInterface.methods.TotalStaked().call());
    },
    getAccountYsecStaked: async function(contractInterface) {
      const web3 = new Web3;
      this.yieldPool.accountYsecStaked = web3.utils.fromWei(await contractInterface.methods.GetStakedAmount(this.account).call());
    },
    getRewards: async function(contractInterface) {
      const web3 = new Web3;
      this.yieldPool.rewards = web3.utils.fromWei(await contractInterface.methods.Earned(this.account).call());
    },
    getEthInPool: async function() {
      const web3 = new Web3(this.provider);
      let ethInPool = 0;

      await web3.eth.getBalance(process.env.VUE_APP_YIELD_CONTRACT, function (err, result) {
        if (err) {
          this.showError(
              'Something went wrong',
              'Reading balance',
              true);
        } else {
          ethInPool = web3.utils.fromWei(result);
        }
      });

      this.yieldPool.ETHPool = ethInPool.toString();
    },
    getPresaleLaunched: async function(contractInterface) {
      this.yieldPool.preSales = await contractInterface.methods.DepositCount().call();
    },
    getParticipants: async function(contractInterface) {
      this.yieldPool.participants = await contractInterface.methods.TotalStakers().call();
    },
    handleAccountsChanged: function(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.isConnected = false;
        this.showError(
          'No connections made',
          'Click the connect button to connect your MetaMask account',
          true);
      } else if (accounts[0] !== this.account) {
        this.account = accounts[0];
        // show user that MetaMask is connected
        this.isConnected = true;
      }
    },
    connectAccount: function () {
      this.provider
        .request({ method: 'eth_requestAccounts' })
        .then(this.handleAccountsChanged(this.provider._state.accounts))
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            this.showError('Please connect to MetaMask.', err.message);
          } else {
            this.showError('Something went wrong', err.message);
          }
        });
    },
    closeModal: function () { 
      this.showAlert = !this.showAlert;
    },
    showError: function (title, msg, bool = false) {
      this.showAlert = !this.showAlert;
      this.alert.title = title
      this.alert.msg = msg;
      this.showConnectionButton = bool;
    }
  }
}
</script>
