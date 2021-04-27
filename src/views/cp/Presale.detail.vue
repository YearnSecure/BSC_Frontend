<template>
  <div id="presale" :class="!isLoaded ? 'h-screen' : ''">
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
            :title="title"
            :type="0"/>

        <div class="block px-4 mt-6 sm:px-6 lg:px-8">
          <PresaleData :presale="presale" />
        </div>
        <div class="block px-4 mt-6 sm:px-6 lg:px-8">
          <div class="lg:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="col-span-1">
              <TeamInformation :presale="presale" />
              <TokenInformation :presale="presale" />
              <PresaleInformation
                  :presale="presale"
                  :progressPercentage="progressPercentage"
                  :progressStyle="progressStyle"/>
            </div>
            <div class="col-span-3">
              <div class="lg:grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="col-span-2">
                  <TokenAllocations
                      :presale="presale"
                      :web3="web3"/>
                </div>
                <div class="col-span-1">
                  <span class="block text-1xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">
                    Token allocation chart
                  </span>
                  <Chart class="block mt-5" style="height: 300px;" :chartData="presale.chartData" :options="options" />
                </div>
              </div>
            </div>
          </div>
          <div class="block mt-8">
            <PresaleActions
              :presale="presale"
              :allowanceState="allowanceState"
              :account="account"
              :tokensClaimed="tokensClaimed"
              @approveCall="approveCall"
              @transferTokens="transferTokens"
              @contributeTokens="contributeTokens"
              @retrieveBNB="retrieveBNB"
              @retrieveTokensOwner="retrieveTokensOwner"
              @transferTokensToLocks="transferTokensToLocks"
              @addLiquidity="addLiquidity"
              @claimTokens="claimTokens"
              @distributeBNB="distributeBNB"
            />
          </div>
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
import AlertModal from '@/components/modals/Alert.modals'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'

import PresaleData from '@/components/views/presale/PresaleData'
import TeamInformation from '@/components/views/presale/TeamInformation'
import TokenInformation from '@/components/views/presale/TokenInformation'
import PresaleInformation from '@/components/views/presale/PresaleInformation'
import TokenAllocations from '@/components/views/presale/TokenAllocations'

import Chart from '@/components/views/dashboard/presale/charts/Presale.Chart'
import Web3 from "web3";

export default {
  name: "presale.detail.cp.views",
  components: {
    AlertModal,
    Header,
    PageTitle,
    PresaleData,
    TeamInformation,
    TokenInformation,
    PresaleInformation,
    TokenAllocations,
    Chart
  },
  data() {
    return {
      id: this.$route.params.id,
      totalSupply: 0,
      tokensInPresale: 0,
      liquidityTokens: 0,
      presale: {
        Name: '',
        StartDate: null,
        isBurn: false,
        EndDate: null,
        SoftCap: null,
        HardCap: null,
        TokenAddress: null,
        LiquidityLocked: null,
        TotalSupply: null,
        TotalTokenAmount: null,
        TokensInPresale: null,
        RawTokensInPresale: null,
        TokenLiquidity: null,
        TokenPrice: null,
        TotalContributed: null,
        TokenOwnerAddress: "",
        BNBDistributable: null,
        TokenTimeLock: null,
        CurrentStep: 0,
        Github: null,
        Medium: null,
        Telegram: null,
        Website: null,
        Twitter: null,
        allocations: [],
        UserContribution: null,
        Roi: null,
        TokenName: null,
        finished: false,
        started: false,
        SoftCapMet: false,
        listingPrice: null,
        listingTokenPrice: null,
        chartData: {
          datasets: [
            {
              data: [],
              backgroundColor: [
                '#db7d02',
                '#f78c00',
                '#f49d2c',
                '#f2a541',
                '#f9af4d',
                '#fbc279',
                '#f59e0b',
                '#f4a213',
                '#eda323',
                '#e0a031',
                '#dba341',
              ],
            }
          ],
          labels: []
        }
      },
      contractPresale: {},
      contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
      isConnected: false,
      showAlert: false,
      showConnectionButton: false,
      showDownloadButton: false,
      isLoaded: false,
      title: 'Presale',
      account: this.$store.state.account,
      provider: window.ethereum,
      chainId: null,
      showAddAllocationButton: true,
      presalesChart: [],
      tokenAllocations: [],
      allowanceState: "0",
      Allocations: {},
      webState: 0,
      contribution: "",
      tokensClaimed: false,
      alert: {
        title: '',
        msg: ''
      },
      options: {
        responsive: true,
        legend: {
          display: false,
          position: 'left',
        },
        maintainAspectRatio: false
      },
      progressStyle: 'width: 0%',
      progressPercentage: 0,
      web3: null,
      contractAbi: [{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"},{"internalType":"address","name":"yieldFeeAddress","type":"address"},{"internalType":"address","name":"feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBYieldFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Contributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"NoTokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"permaLockedLiq","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountOfBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokens","type":"uint256"}],"name":"PancakeswapLiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedBNB","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UnliqedTokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UnsoldTokensTransfered","type":"event"},{"inputs":[],"name":"FeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PancakeswapFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PancakeswapRouterAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PresaleIndexer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Presales","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"}],"internalType":"struct PresaleInfo","name":"Info","type":"tuple"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"components":[{"internalType":"address","name":"TokenOwnerAddress","type":"address"},{"internalType":"address","name":"TokenAddress","type":"address"},{"internalType":"address","name":"TokenTimeLock","type":"address"},{"internalType":"address","name":"UnsoldTransferAddress","type":"address"}],"internalType":"struct PresaleDataAddresses","name":"Addresses","type":"tuple"},{"components":[{"internalType":"uint256","name":"TotalTokenAmount","type":"uint256"},{"internalType":"uint256","name":"Step","type":"uint256"},{"internalType":"uint256","name":"ContributedBNB","type":"uint256"},{"internalType":"uint256","name":"RaisedFeeBNB","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"uint256","name":"RetrievedTokenAmount","type":"uint256"},{"internalType":"uint256","name":"RetrievedBNBAmount","type":"uint256"},{"internalType":"uint256","name":"NumberOfContributors","type":"uint256"},{"internalType":"uint256","name":"PresaleTokenPrice","type":"uint256"},{"internalType":"uint256","name":"ListingTokenPrice","type":"uint256"},{"internalType":"bool","name":"IsBurnUnsold","type":"bool"},{"internalType":"uint256","name":"TransferedBurnUnsold","type":"uint256"}],"internalType":"struct PresaleDataState","name":"State","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"TimelockFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"YieldFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"}],"name":"SetTimelockFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"yieldFeeAddress","type":"address"}],"name":"SetYieldFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress","type":"address"}],"name":"SetFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"SetPancakeswapRouterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"SetPancakeswapFactoryAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"TokenAllocations","type":"tuple[]"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"internalType":"address","name":"Token","type":"address"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"},{"internalType":"uint256","name":"PresaleTokenPrice","type":"uint256"},{"internalType":"uint256","name":"ListingTokenPrice","type":"uint256"},{"internalType":"bool","name":"IsBurnUnsold","type":"bool"},{"internalType":"address","name":"UnsoldTransferAddress","type":"address"}],"internalType":"struct PresaleSettings","name":"settings","type":"tuple"}],"name":"CreatePresale","outputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"Contribute","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"contributor","type":"address"}],"name":"RetrieveBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"RetrieveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokensToLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"AddLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"ClaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"DistributeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"SoftcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"HardcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PresaleIndexerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetTokenAllocations","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetBNBContributedForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetHardcapAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetNumberOfContributors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"ContributorHasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true}],
      tokenAbi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
    }
  }, 
  mounted: async function () {
    this.$loading(true);
    if (this.provider.chainId !== process.env.VUE_APP_CHAIN_ID) {
      this.showError(
          'Wrong network detection',
          'It looks like you are connected to the wrong network. Please connect to Binance Smart Chain and refresh the page.',
          false);
      this.isLoaded = true;
    }

    if (!this.isLoaded) {
      // Detect provider
      await this.detectProvider();
      // Connect to your account
      await this.currentAccount();
    }

    await this.initDetailPage();
    this.$loading(false);
    this.isLoaded = true;
  },
  methods: {
    initDetailPage: async function() {
      this.web3 = new Web3(this.provider);

      await this.getPresaleData();
      await this.getContributedBNB();
      await this.getSoftcapMet();
      if (this.account.toLowerCase() === this.presale.TokenOwnerAddress.toLowerCase()){
        await this.getAllowance();
      }
      if (parseInt(this.presale.CurrentStep) === 1){
        await this.getPresaleFinished();
        if (!this.presale.finished){
          await this.getPresaleStarted();
        }
      }

      await this.getTokenAllocations();
      await this.getContributorHasTokensClaimed();

      this.setProgressBar();
    },
    getPresaleData: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.Presales(this.id).call().then((response) => {
          //Presale Info
          this.presale.isBurn = response.State.IsBurnUnsold;
          this.presale.Name = response.Info.Name;
          this.presale.StartDate = (parseInt(response.StartDate));
          this.presale.EndDate = (parseInt(response.EndDate));
          this.presale.Softcap = parseFloat(web3.utils.fromWei(response.Softcap));
          this.presale.Hardcap = parseFloat(web3.utils.fromWei(response.Hardcap));
          this.presale.TokenAddress = response.Addresses.TokenAddress;
          this.presale.LiquidityLocked = response.LiqPercentage;
          this.totalSupply = web3.utils.fromWei(response.State.TotalTokenAmount);
          this.presale.TotalSupply = (this.readableFormatNumbers(Math.ceil(parseFloat(web3.utils.fromWei(response.State.TotalTokenAmount)))));
          this.presale.TotalTokenAmount = response.State.TotalTokenAmount;
          this.presale.TokensInPresale = this.readableFormatNumbers(web3.utils.fromWei(response.TokenPresaleAllocation));
          this.tokensInPresale = web3.utils.fromWei(response.TokenPresaleAllocation);
          this.presale.RawTokensInPresale = web3.utils.fromWei(response.TokenPresaleAllocation);
          this.presale.TokenLiquidity = this.readableFormatNumbers(web3.utils.fromWei(response.TokenLiqAmount));
          this.liquidityTokens = web3.utils.fromWei(response.TokenLiqAmount);

          if(this.presale.isBurn){
            this.presale.TokenPrice = this.readableFormatNumbers(parseFloat(web3.utils.fromWei(response.State.PresaleTokenPrice)).toFixed(10));
          } else {
            this.presale.TokenPrice = this.getTokenPrice().toFixed(10);
          }

          this.presale.TotalContributed = web3.utils.fromWei(response.State.ContributedBNB);
          this.presale.TokenOwnerAddress = response.Addresses.TokenOwnerAddress;
          this.presale.BNBDistributable = (response.State.ContributedBNB - response.State.RetrievedBNBAmount) > 0;
          this.presale.TokenTimeLock = response.Addresses.TokenTimeLock;

          const presalePrice = web3.utils.fromWei(response.TokenPresaleAllocation)/web3.utils.fromWei(response.Hardcap);
          const listingPrice = web3.utils.fromWei(response.TokenLiqAmount) / ((response.LiqPercentage/100)*Number(web3.utils.fromWei(response.Hardcap)*0.95)); 
          this.presale.listingPrice =  (presalePrice/listingPrice).toFixed(2);

          const hardCapPercentage = Number(web3.utils.fromWei(response.Hardcap)) * 0.95;
          const toLiquidity = hardCapPercentage * ((1/100) * Number(response.LiqPercentage));
          this.presale.listingTokenPrice = (toLiquidity / Number(web3.utils.fromWei(response.TokenLiqAmount))).toFixed(10);

          //Current Presale Step
          this.presale.CurrentStep = response.State.Step;
          //Socials
          this.presale.Github = response.Info.Github;
          this.presale.Medium = response.Info.Medium;
          this.presale.Telegram = response.Info.Telegram;
          this.presale.Twitter = response.Info.Twitter;
          this.presale.Website = response.Info.Website;
          this.getTokenTicker();
        })
        .catch((e) => {
          console.log('error:' + e);
        });
    },
    getContributedBNB: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.GetBNBContributedForAddress(this.id, this.account)
          .call()
          .then((response) => {
            if (response == 0){
              this.presale.UserContribution = 0;
              this.presale.Roi = 0;
            } else {
              this.presale.UserContribution = web3.utils.fromWei(response);
              this.getRoi();
            }
          })
          .catch((e) => {
            console.log('error:' + e);
          });
    },
    getSoftcapMet: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.SoftcapMet(this.id)
          .call({from: this.account})
          .then((response) => {
            this.presale.SoftcapMet = response;
          }).catch((e) => {
            console.log('error:' + e);
          });
    },
    getAllowance: async function () {
      const tokenContractAbi = this.tokenAbi;
      const web3 = new Web3(this.provider);
      const tokenContractInterface = new web3.eth.Contract(tokenContractAbi);

      tokenContractInterface.options.address = this.presale.TokenAddress;
      await tokenContractInterface.methods.allowance(this.account, process.env.VUE_APP_PRESALE_CONTRACT).call().then((response) => {
        this.allowanceState = response;
      }).catch((e) => {
        console.log('error:' + e);
      });
    },
    getPresaleFinished: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.PresaleFinished(this.id).call({from: this.account}).then((response) => {
        this.presale.finished = response
      }).catch((e) => {
        console.log('error:' + e);
      });
    },
    getPresaleStarted: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.PresaleStarted(this.id)
          .call({from: this.account})
          .then((response) => {
            this.presale.started = response
          }).catch((e) => {
            console.log('error:' + e);
          });
    },
    getTokenAllocations: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.GetTokenAllocations(this.id)
          .call()
          .then((response) => {
            this.presale.Allocations = response;

            const totalSupply = this.totalSupply;
            for (let i=0; i < response.length; i++) {
              this.presale.chartData.labels.push(response[i].Name);
              const amount = web3.utils.fromWei(response[i].Amount);
              const percentage =  amount / totalSupply * 100;

              this.presale.chartData.datasets[0].data.push(percentage);
            }

            const tokenPresalePercentage = this.tokensInPresale / totalSupply * 100;
            this.presale.chartData.labels.push('Tokens in presale');
            this.presale.chartData.datasets[0].data.push(tokenPresalePercentage);

            const liquidityPercentage = this.liquidityTokens / totalSupply * 100;
            this.presale.chartData.labels.push('Token liquidity');
            this.presale.chartData.datasets[0].data.push(liquidityPercentage);
          })
          .catch((e) => {
            console.log('error:' + e);
          });
    },
    getContributorHasTokensClaimed: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.ContributorHasClaimed(this.id, this.account)
          .call()
          .then((response) => {
            this.tokensClaimed = response;
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    getTokenTicker: async function() {
      const tokenContractAbi = this.tokenAbi;
      const web3 = new Web3(this.provider);
      const tokenContractInterface = new web3.eth.Contract(tokenContractAbi);
      
      tokenContractInterface.options.address = this.presale.TokenAddress;
        await tokenContractInterface.methods.symbol()
          .call()
          .then((response) => {
            this.presale.TokenName = response;
          })
          .catch((e) => {
            console.log('error:' + e);
          });
    },
    getRoi: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.GetAmountOfTokensForAddress(this.id, this.account)
          .call()
          .then((response) => {
            this.presale.Roi = web3.utils.fromWei(response);
          })
          .catch((e) => {
            console.log('error:' + e);
          });
    },
    getPresalesGraph: async function() {
      if (this.presale.tokens && this.presale.tokens.length > 0) {
        for (let index = 0; index < this.presale.tokens.length; index++) {
          this.presale.chartData.datasets[0].data.push(Number(this.presale.tokens[index].liquidity));
        }
      }
    },
    getTokenPrice: function() {
      return parseInt(this.presale.Hardcap)/(parseInt(this.presale.RawTokensInPresale));
    },
    approveCall: async function () {
      this.$loading(true);
      const tokenContractAbi = this.tokenAbi;
      const web3 = new Web3(this.provider);
      const tokenContractInterface = new web3.eth.Contract(tokenContractAbi);

      tokenContractInterface.options.address = this.presale.TokenAddress;
      await tokenContractInterface.methods.approve(process.env.VUE_APP_PRESALE_CONTRACT, this.presale.TotalTokenAmount)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    transferTokens: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.TransferTokens(this.id)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    retrieveBNB: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.RetrieveBNB(this.id, this.account)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    retrieveTokensOwner: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.RetrieveTokens(this.id)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    transferTokensToLocks: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);

      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await presaleContractInterface.methods.TransferTokensToLocks(this.id)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    addLiquidity: async function () {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.AddLiquidity(this.id)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    claimTokens: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.ClaimTokens(this.id)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    distributeBNB: async function() {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.DistributeBNB(this.id)
          .send({from: this.account})
          .then(() => {
            this.initDetailPage();
          })
          .catch((e) => {
            console.log('error:' + e);
          }).finally(() => {
            this.$loading(false);
          });
    },
    contributeTokens: async function(contribution) {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.Contribute(this.id)
            .send({from: this.account, value:web3.utils.toWei(contribution.toString())})
            .then(() => {
              this.initDetailPage();
            })
            .catch((e) => {
              console.log('error:' + e);
            }).finally(() => {
              this.$loading(false);
            });
    },
    readableFormatNumbers: function(x){
        const parts = x.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    },
    setProgressBar: function() {
      const hardCap = Number(this.presale.Hardcap);
      const totalContributed = Number(this.presale.TotalContributed);
      const percentage = totalContributed / Number(hardCap) * 100;
      this.progressPercentage = percentage.toFixed(2);
      this.progressStyle = `width: ${percentage}%; background-color: #f59e0b;`;
    },
    detectProvider: async function () {
      // Great change MetaMask is not installed
      if (this.provider === undefined) {
        return this.showError(
            'MetaMask is not installed.',
            'It looks like the connection to the MetaMask wallet failed. Try connecting again.',
            false,
            true);
      }

      if (!this.provider.isMetaMask)
        return this.showError(
            'MetaMask connection failed.',
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
    handleAccountsChanged: function (accounts) {
      if (accounts !== null && accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.isConnected = false;
        this.showError(
            'No connections made',
            'Click the connect button to connect your MetaMask account',
            true);
      } else {
        this.$store.state.account = accounts[0];
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
    showError: function (
        title,
        msg,
        showConnectButton = false,
        showDownloadButton = false) {
      this.showAlert = !this.showAlert;
      this.alert.title = title
      this.alert.msg = msg;
      this.showConnectionButton = showConnectButton;
      this.showDownloadButton = showDownloadButton;
    }
  }
}
</script>
<style lang="scss">
.icon {
  svg {
    path {
      color: #FFF;
    }
  }
}
</style>