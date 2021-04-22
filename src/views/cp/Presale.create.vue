<template>
    <div id="presale">
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
              :type="1"/>

          <div class="block px-4 mt-6 sm:px-6 lg:px-8">
            <div class="my-8">
              <div class="grid grid-cols-2">
                <div class="col-span-1 text-center">
                  <button
                  v-if="divideTokens"
                  v-on:click="selectDivideTokens"
                  class="
                    text-white
                    px-3
                    py-2
                    bg-yellow-500
                    border
                    border-yellow-500
                    hover:bg-yellow-600
                    hover:border-yellow-600
                    rounded">
                      Divide tokens
                  </button>
                  <button
                    v-if="!divideTokens"
                    v-on:click="selectDivideTokens"
                    class="
                    dark:text-white
                    text-yellow-500
                    px-3
                    py-2
                    border
                    dark:border-white
                    dark:bg-transparent
                    border-yellow-500
                    hover:bg-yellow-500
                    hover:border-yellow-500
                    rounded">
                      Divide tokens
                  </button>
                </div>
                <div class="col-span-1 text-center">
                  <button
                    v-if="!burnTokens"
                    v-on:click="selectBurnTokens"
                    class="
                    dark:text-white
                    text-gray-700
                    px-3
                    py-2
                    border
                    dark:border-yellow-500
                    border-gray-700
                    border-white
                    bg-transparent
                    hover:bg-yellow-500
                    hover:border-yellow-500
                    rounded">
                      Burn tokens
                  </button>
                  <button
                    v-if="burnTokens"
                    v-on:click="selectBurnTokens"
                    class="
                    dark:text-white
                    text-gray-700
                    px-3
                    py-2
                    bg-yellow-500
                    border
                    dark:border-yellow-500
                    border-gray-700
                    hover:bg-yellow-600
                    hover:border-yellow-600
                    rounded">
                    Burn tokens
                  </button>
                </div>
              </div>
            </div>
            <div class="my-8 text-center">
              <PresaleInformation
                :account="account"
                :token="settings"
                :divideTokens="divideTokens"
                :burnTokens="burnTokens"
                :key="key"
              />
            </div>

            <div class="my-8 text-center">
              <Liquidity
                  v-if="settingsIsValid"
                  :liquidity="liquidity"
                  :hardCap="settings.hardcap"
                  :totalTokens="settings.totalTokens"
                  :presaleTokens="settings.tokenPresaleAllocation"
                  :tokensPerBNB="settings.tokensPerBNB"
                  :presaleTokenPrice="settings.presaleTokenPrice"
                  :divideTokens="divideTokens"
                  :burnTokens="burnTokens"
                  :key="key"
              />

              <div v-if="!settingsIsValid">
                <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                  Liquidity
                </h1>
                <NotCompleted
                  class="mt-8"
                  :message="missingMessage" />
              </div>

            </div>

            <div class="my-8 text-center">
              <Tokenomics
                  v-if="liquidityIsValid"
                  :tokenomics="tokenomics"
                  :liquidity="liquidity"
                  :chartData="chartData"
                  :options="chartDataOptions"
                  :remainingAmount="remainingAmount"
                  :totalTokens="settings.totalTokens"
                  :setAllocationsPressed="setAllocationsPressed"
                  @setAllocations="setAllocations"
                  :key="key"
              />

              <div v-if="!liquidityIsValid && settingsIsValid">
                <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                  Tokenomics
                </h1>
                <NotCompleted
                    class="mt-8"
                    :message="missingMessage" />
              </div>

            </div>

            <div class="my-8 text-center">
              <Socials
                  v-if="tokenomicsIsValid"
                  :socials="socials"
                  @validSocials="validSocials"
                  :key="key"
              />

              <div v-if="!tokenomicsIsValid && liquidityIsValid && settingsIsValid">
                <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                  Socials
                </h1>
                <NotCompleted
                    class="mt-8"
                    :message="missingMessage" />
              </div>
            </div>

            <div v-if="setAllocationsPressed && presaleIsValid" class="my-8 text-center">
              <button v-on:click="createPresale" class="bg-yellow-500 py-2 px-4 rounded text-white hover:bg-yellow-600">
                Create Presale
              </button>
            </div>
          </div>
        </main>
      </transition>
    </div>
</template>

<script>
import axios from 'axios'

import AlertModal from '@/components/modals/Alert.modals'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'
import PresaleInformation from '@/components/presale/Information'
import Liquidity from '@/components/presale/Liquidity'
import Tokenomics from '@/components/presale/Tokenomics'
import Socials from '@/components/presale/Socials'
import NotCompleted from '@/components/presale/NotCompleted'
import Web3 from "web3";

export default {
  name: 'presale.cp.views',
  components: {
    AlertModal,
    Header,
    PageTitle,
    PresaleInformation,
    Liquidity,
    Tokenomics,
    Socials,
    NotCompleted,
  },
  data() {
    return {
      contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
      isConnected: false,
      showAlert: false,
      isLoaded: false,
      title: 'Presale',
      account: this.$store.state.account,
      provider: window.ethereum,
      chainId: null,
      divideTokens: true, // Divide tokens is default selected
      burnTokens: false, // Burn tokens is not default selected
      settings: {
        address: null,
        burnTokenAddress: "0x000000000000000000000000000000000000dEaD",
        name: null,
        softcap: null,
        hardcap: null,
        totalTokens: null,
        tokenPresaleAllocation: null,
        presaleTokenPrice: null, // Burn
        startDate: null,
        startDateTime: {
          HH: null,
          mm: "00",
          ss: "00"
        },
        endDate: null,
        endDateTime: {
          HH: null,
          mm: "00",
          ss: "00"
        },
        tokensPerBNB: null, // burn
      },
      settingsIsValid: false,
      liquidityIsValid: false,
      liquidity: {
        amount: null, // divide
        listingTokenPrice: null, // burn
        percentage: null,
        lockedOrPermaBurn: null,
        timeLockedOrInterval: null,
        releaseDate: null,
        releaseDateTime: {
          HH: null,
          mm: "00",
          ss: "00"
        },
        intervalStartDate: null,
        intervalStartDateTime: {
          HH: null,
          mm: "00",
          ss: "00"
        },
        intervalInDays: null,
        intervalPercentage: null,
      },
      remainingAmount: null,
      remainingTokensAmount: null,
      tokenomicsIsValid: false,
      tokenomics: [],
      setAllocationsPressed: false,
      socialsIsValid: true,
      socials: [
        {
          url: '',
          type: 0,
        },
        {
          url: '',
          type: 1,
        },
        {
          url: '',
          type: 2,
        },
        {
          url: '',
          type: 3,
        },
        {
          url: '',
          type: 4,
        },
      ],
      presaleIsValid: false,
      missingMessage: "Please fill in all the fields before you continue",
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
              '#f9b761',
            ],
          }
        ],
        labels: []
      },
      chartDataOptions: {
        responsive: true,
        legend: {
          display: false,
          position: 'left',
        },
        maintainAspectRatio: false
      },
      info: {
        softcap: null,
        hardcap: null,
        totalSupply: null,
        tokenPrice: null
      },
      alert: {
        title: '',
        msg: ''
      },
      key: 0,
      contractAbi: [{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"},{"internalType":"address","name":"yieldFeeAddress","type":"address"},{"internalType":"address","name":"feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBYieldFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Contributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"NoTokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"permaLockedLiq","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountOfBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokens","type":"uint256"}],"name":"PancakeswapLiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedBNB","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UnliqedTokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UnsoldTokensTransfered","type":"event"},{"inputs":[],"name":"FeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PancakeswapFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PancakeswapRouterAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PresaleIndexer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Presales","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"}],"internalType":"struct PresaleInfo","name":"Info","type":"tuple"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"components":[{"internalType":"address","name":"TokenOwnerAddress","type":"address"},{"internalType":"address","name":"TokenAddress","type":"address"},{"internalType":"address","name":"TokenTimeLock","type":"address"},{"internalType":"address","name":"UnsoldTransferAddress","type":"address"}],"internalType":"struct PresaleDataAddresses","name":"Addresses","type":"tuple"},{"components":[{"internalType":"uint256","name":"TotalTokenAmount","type":"uint256"},{"internalType":"uint256","name":"Step","type":"uint256"},{"internalType":"uint256","name":"ContributedBNB","type":"uint256"},{"internalType":"uint256","name":"RaisedFeeBNB","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"uint256","name":"RetrievedTokenAmount","type":"uint256"},{"internalType":"uint256","name":"RetrievedBNBAmount","type":"uint256"},{"internalType":"uint256","name":"NumberOfContributors","type":"uint256"},{"internalType":"uint256","name":"PresaleTokenPrice","type":"uint256"},{"internalType":"uint256","name":"ListingTokenPrice","type":"uint256"},{"internalType":"bool","name":"IsBurnUnsold","type":"bool"},{"internalType":"uint256","name":"TransferedBurnUnsold","type":"uint256"}],"internalType":"struct PresaleDataState","name":"State","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"TimelockFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"YieldFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"}],"name":"SetTimelockFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"yieldFeeAddress","type":"address"}],"name":"SetYieldFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress","type":"address"}],"name":"SetFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"SetPancakeswapRouterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"SetPancakeswapFactoryAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"TokenAllocations","type":"tuple[]"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"internalType":"address","name":"Token","type":"address"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"},{"internalType":"uint256","name":"PresaleTokenPrice","type":"uint256"},{"internalType":"uint256","name":"ListingTokenPrice","type":"uint256"},{"internalType":"bool","name":"IsBurnUnsold","type":"bool"},{"internalType":"address","name":"UnsoldTransferAddress","type":"address"}],"internalType":"struct PresaleSettings","name":"settings","type":"tuple"}],"name":"CreatePresale","outputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"Contribute","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"contributor","type":"address"}],"name":"RetrieveBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"RetrieveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokensToLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"AddLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"ClaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"DistributeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"SoftcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"HardcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PresaleIndexerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetTokenAllocations","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetBNBContributedForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetHardcapAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetNumberOfContributors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"ContributorHasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true}]
    }
  },
  mounted: async function () {
    this.$loading(true);
    if (this.provider === undefined) {
      this.isLoaded = true;
    }

    if (!this.isLoaded) {
      // Detect provider
      await this.detectProvider();
      // Connect to your account
      await this.currentAccount();
      this.isLoaded = true;
    }
    this.$loading(false);
  },
  methods: {
    validSocials: function() {
      this.presaleIsValid = true;
    },
    setAllocations: function(allocations) {
      this.chartData.datasets[0].data = [];

      this.tokenomics = allocations;

      this.tokenomics.forEach((allocation) => {
        if (Number(allocation.percentage) > 0)
          this.chartData.labels.push(allocation.name);
          this.chartData.datasets[0].data.push(Number(allocation.percentage));
      });

      // presale allocation
      this.chartData.labels.push('Presale');
      if (this.divideTokens) {
        const presaleAllocationPercentage = this.settings.tokenPresaleAllocation / this.settings.totalTokens * 100;
        this.chartData.datasets[0].data.push(Number(presaleAllocationPercentage));
      } else if (this.burnTokens) {
        const presaleTokens = this.settings.hardcap / this.settings.presaleTokenPrice;
        const presaleAllocationPercentage = presaleTokens / this.settings.totalTokens * 100;
        this.chartData.datasets[0].data.push(Number(presaleAllocationPercentage));
      }

      // liquidity allocation
      this.chartData.labels.push('Liquidity');
      if (this.divideTokens) {
        const liquidityPercentage = this.liquidity.amount / this.settings.totalTokens * 100;
        this.chartData.datasets[0].data.push(Number(liquidityPercentage));
      } else if (this.burnTokens) {
        const liquidityTokens = this.liquidity.percentage / this.liquidity.listingTokenPrice;
        const liquidityPercentage = liquidityTokens.toFixed() / this.settings.totalTokens * 100;
        this.chartData.datasets[0].data.push(Number(liquidityPercentage));
      }

      this.setAllocationsPressed = true;
      this.tokenomicsIsValid = true;
    },
    createPresale: async function () {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;

      const softCap = web3.utils.toWei(this.settings.softcap, 'ether');
      const hardCap = web3.utils.toWei(this.settings.hardcap, 'ether');

      const liqTokenAllocation = this.addLiquidityAllocation();

      const tokenAllocations = this.addTokenAllocation();

      // add time to datetime settings
      const startTime = this.settings.startDateTime;
      const startDate = new Date(this.settings.startDate);
      startDate.setHours(startTime.HH);
      startDate.setMinutes(startTime.mm);

      const endTime = this.settings.endDateTime;
      const endDate = new Date(this.settings.endDate);
      endDate.setHours(endTime.HH);
      endDate.setMinutes(endTime.mm);

      if (startDate > endDate) {
        this.$notifications(
          'Start date can not be later in time',
          `Please check your information`,
          1, // error
          true
        );
        this.$loading(false);
        return;
      }

      let liqPermaBurn = false;
      if (this.liquidity.lockedOrPermaBurn === '1')
        liqPermaBurn = true;

      const presaleDto = {
        Token: this.settings.address,
        Name: this.settings.name,
        StartDate: (new Date(startDate).getTime()/1000),
        EndDate: (new Date(endDate).getTime()/1000),
        Softcap: `${softCap}`,
        Hardcap: `${hardCap}`,
        LiqPercentage: `${this.liquidity.percentage}`,
        PermalockLiq: liqPermaBurn,
        LiquidityTokenAllocation: liqTokenAllocation,
        TokenAllocations: tokenAllocations,
        Website: this.socials[0].url,
        Twitter: this.socials[1].url,
        Telegram: this.socials[2].url,
        Github: this.socials[3].url,
        Medium: this.socials[4].url,
      }

      if (this.divideTokens && !this.burnTokens) {
        presaleDto.IsBurnUnsold = false;
        presaleDto.UnsoldTransferAddress = "0x000000000000000000000000000000000000dEaD";
        presaleDto.PresaleTokenPrice = 0; // not relevant for divide
        presaleDto.ListingTokenPrice = 0; // not relevant for divide
        presaleDto.TokenPresaleAllocation = web3.utils.toWei(this.settings.tokenPresaleAllocation);
        presaleDto.TokenLiqAmount = web3.utils.toWei(this.liquidity.amount);
      } else if (!this.divideTokens && this.burnTokens) {
        presaleDto.IsBurnUnsold = true;
        presaleDto.UnsoldTransferAddress = this.settings.burnTokenAddress;
        presaleDto.PresaleTokenPrice = web3.utils.toWei(this.settings.presaleTokenPrice.toString());
        presaleDto.ListingTokenPrice = web3.utils.toWei(this.liquidity.listingTokenPrice.toString());
        presaleDto.TokenPresaleAllocation = 0; // set to 0 for burnTokens, is set when divideToken is selected
        presaleDto.TokenLiqAmount = 0; // set to 0 for burnTokens, is set when divideToken is selected
      }

      if (this.account !== null && this.account !== '') {
        await this.sendPresaleToContract(presaleContractInterface, presaleDto);
      } else {
        this.$loading(false);
      }
    },
    addLiquidityAllocation: function() {
      let releaseDate = 0;
      let intervalPercentage = 0;
      let intervalOfRelease = 0;
      if (this.liquidity.lockedOrPermaBurn === '0') {
        if (this.liquidity.timeLockedOrInterval === '0') {
          // add time to datetime settings
          const startTime = this.liquidity.releaseDateTime;
          const startDate = new Date(this.liquidity.releaseDate);
          startDate.setHours(startTime.HH);
          startDate.setMinutes(startTime.mm);

          releaseDate = (new Date(startDate).getTime()/1000);
        } else if (this.liquidity.timeLockedOrInterval === '1') {
          // add time to datetime settings
          const startTime = this.liquidity.intervalStartDateTime;
          const startDate = new Date(this.liquidity.intervalStartDate);
          startDate.setHours(startTime.HH);
          startDate.setMinutes(startTime.mm);

          releaseDate = (new Date(startDate).getTime()/1000);
          intervalOfRelease = this.liquidity.intervalInDays;
          intervalPercentage = this.liquidity.intervalPercentage;
        }
      }

      let interval = false;
      if (this.liquidity.timeLockedOrInterval === '1')
        interval = true;

      return {
        Name: `${this.settings.name}-liquidity-tokens`,
        Amount: 0, // not relevant
        RemainingAmount: 0, // not relevant
        ReleaseDate: releaseDate,
        IsInterval: interval,
        PercentageOfRelease: intervalPercentage,
        IntervalOfRelease: intervalOfRelease,
        Exists: true,
        Token: '0x000000000000000000000000000000000000dEaD'//not relevant
      };
    },
    addTokenAllocation: function() {
      const web3 = new Web3(this.provider);
      const tokenAllocations = [];
      for (let i = 0; i < this.tokenomics.length; i++) {
        const allocation = this.tokenomics[i];
        if (allocation.name !== '' && allocation.amount !== null) {
          // Set interval
          if (Number(allocation.timelockedInterval) === 1) {
            // add time to datetime settings
            const startTime = allocation.intervalStartDateTime;
            const startDate = new Date(allocation.intervalStartDate);
            startDate.setHours(startTime.HH);
            startDate.setMinutes(startTime.mm);

            const dto = {
              Name: allocation.name,
              Amount: web3.utils.toWei(allocation.amount),
              RemainingAmount: 0,
              ReleaseDate: (new Date(startDate).getTime()/1000),
              IsInterval: true,
              PercentageOfRelease: allocation.intervalPercentage,
              IntervalOfRelease: allocation.intervalInDays,
              Exists: true,
              Token: this.settings.address
            }
            tokenAllocations.push(dto);
          } else {
            // add time to datetime settings
            const startTime = allocation.releaseDateTime;
            const startDate = new Date(allocation.releaseDate);
            startDate.setHours(startTime.HH);
            startDate.setMinutes(startTime.mm);

            const dto = {
              Name: allocation.name,
              Amount: web3.utils.toWei(allocation.amount),
              RemainingAmount: 0,
              ReleaseDate: (new Date(startDate).getTime()/1000),
              IsInterval: allocation.interval,
              PercentageOfRelease: 0,
              IntervalOfRelease: 0,
              Exists: true,
              Token: this.settings.address
            }
            tokenAllocations.push(dto);
          }
        }
      }

      return tokenAllocations;
    },
    sendPresaleToContract: async function(presaleContractInterface, presaleDto) {
      await presaleContractInterface.methods.CreatePresale(presaleDto)
        .send({from: this.account})
        .then((response) => {
          if (response.status && response.blockHash !== '') {
            this.key++; // update components

            this.$notifications(
                'Presale successfully created',
                `https://www.bscscan.com/tx/${response.transactionHash}`,
                0, // success
                true);

            this.resetPage();

            this.$loading(false);
          }
        })
        .catch((e) => {
          this.$notifications(
              'Something went wrong creating the presale',
              e.message,
              1, // error
              true);

          this.$loading(false);
        });
    },
    detectProvider: async function () {
      // Great change MetaMask is not installed
      if (this.provider === undefined) {
        return this.showError(
            'unexpected error',
            'It looks like the connection to the MetaMask wallet failed. Try connecting again.',
            false,
            true);
      }

      if (!this.provider.isMetaMask)
        this.$notifications(
            'METAMASK not connected',
            'Please connect your METAMASK',
            1, // error
            true);
    },
    currentAccount: async function () {
      // connect to MetaMask account
      this.chainId = this.provider.chainId;
      this.provider
          .request({ method: 'eth_accounts' })
          .then(this.handleAccountsChanged(this.provider._state.accounts))
          .catch(() => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            this.$notifications(
                'METAMASK not connected',
                'Please connect your METAMASK',
                1, // error
                true);
          });
    },
    handleAccountsChanged: function (accounts) {
      if (accounts !== null && accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.isConnected = false;
        this.$notifications(
            'No connections made\'',
            'Click the connect button to connect your MetaMask account',
            1, // error
            true);
      } else {
        this.$store.state.account = accounts[0];
        this.account = accounts[0];
        // show user that MetaMask is connected
        this.isConnected = true;
      }
    },
    selectDivideTokens: function() {
      if (this.divideTokens) {
        this.divideTokens = false;
        this.burnTokens = true;
      } else {
        this.divideTokens = true;
        this.burnTokens = false;
      }
    },
    selectBurnTokens: function() {
      if (this.burnTokens) {
        this.burnTokens = false;
        this.divideTokens = true;
      } else {
        this.burnTokens = true;
        this.divideTokens = false;
      }
    },
    resetPage: function() {
      this.settings = {
        address: '',
        name: '',
        softcap: null,
        hardcap: null,
        totalTokens: null,
        tokenPresaleAllocation: null,
        startDate: null,
        endDate: null,
      };

      this.liquidity = {
        amount: null,
        percentage: null,
        locked: false,
        permaBurn: false,
        timeLocked: false,
        releaseDate: null,
        interval: false,
        intervalStartDate: null,
        intervalInDays: null,
        intervalPercentage: null,
      };

      this.tokenomics = [];
      this.socials = [{url: ''}];

      this.settingsIsValid = false;
      this.liquidityIsValid = false;
      this.tokenomicsIsValid = false;
      this.socialsIsValid = false;
      this.presaleIsValid = false;
    }
  },
  watch: {
    settings: {
      handler: function() {
        if (this.divideTokens) {
          this.settingsIsValid = this.settings.address !== null &&
              this.settings.name !== null &&
              this.settings.softcap !== null &&
              this.settings.hardcap !== null &&
              this.settings.totalTokens !== null &&
              this.settings.tokenPresaleAllocation !== null &&
              this.settings.startDate !== null &&
              this.settings.endDate !== null &&
              this.settings.startDateTime.HH !== null &&
              this.settings.endDateTime.HH !== null;
        } else if (this.burnTokens) {
          this.settingsIsValid = this.settings.address !== null &&
              this.settings.burnTokenAddress !== null &&
              this.settings.name !== null &&
              this.settings.softcap !== null &&
              this.settings.hardcap !== null &&
              this.settings.totalTokens !== null &&
              this.settings.presaleTokenPrice !== null &&
              this.settings.startDate !== null &&
              this.settings.endDate !== null &&
              this.settings.startDateTime.HH !== null &&
              this.settings.endDateTime.HH !== null;

          if (this.settingsIsValid) {
            // added presale allocation
            const presaleTokens = this.settings.hardcap / this.settings.presaleTokenPrice;
            this.remainingTokensAmount = this.settings.totalTokens - presaleTokens;
          }
        }
      },
      deep: true
    },
    liquidity: {
      handler: function() {
        if (this.divideTokens) {
          if (this.liquidity.amount !== null) {
            this.remainingAmount = (this.settings.totalTokens - this.settings.tokenPresaleAllocation - this.liquidity.amount);
          }

          if (this.liquidity.lockedOrPermaBurn !== null && this.liquidity.amount !== null) {
            if (this.liquidity.lockedOrPermaBurn === '1') {
              // all values are filled so liquidity is valid
              this.liquidityIsValid = true;
            } else if (this.liquidity.lockedOrPermaBurn === '0' && this.liquidity.timeLockedOrInterval === '0') {
              // when timelocked is selected check releasedate
              if (this.liquidity.releaseDate !== null && this.liquidity.releaseDateTime.HH !== null)
                this.liquidityIsValid = true;
            } else if (this.liquidity.lockedOrPermaBurn === '0' && this.liquidity.timeLockedOrInterval === '1') {
              // When interval is selected check interval values
              if (this.liquidity.intervalStartDate !== null &&
                  this.liquidity.intervalStartDateTime.HH !== null &&
                  this.liquidity.intervalInDays !== null &&
                  this.liquidity.intervalPercentage !== null) {
                this.liquidityIsValid = true;
              }
            } else {
              this.liquidityIsValid = false;
            }
          }
        } else if (this.burnTokens && this.liquidity.listingTokenPrice !== null) {
          if (this.liquidity.lockedOrPermaBurn === '1') {
            // all values are filled so liquidity is valid
            this.liquidityIsValid = true;
          } else if (this.liquidity.lockedOrPermaBurn === '0' && this.liquidity.timeLockedOrInterval === '0') {
            // when timelocked is selected check releasedate
            if (this.liquidity.releaseDate !== null && this.liquidity.releaseDateTime.HH !== null)
              this.liquidityIsValid = true;
          } else if (this.liquidity.lockedOrPermaBurn === '1' && this.liquidity.timeLockedOrInterval === '1') {
            // When interval is selected check interval values
            if (this.liquidity.intervalStartDate !== null &&
                this.liquidity.intervalStartDateTime.HH !== null &&
                this.liquidity.intervalInDays !== null &&
                this.liquidity.intervalPercentage !== null) {
              this.liquidityIsValid = true;
            }
          } else {
            this.liquidityIsValid = false;
          }

          // if liquidity is valid calculate remainingTokens for tokenomics
          if (this.liquidityIsValid) {
            if (this.liquidity.listingTokenPrice !== null && this.liquidity.percentage !== null) {
              const maxBnbAmount = Number(this.settings.hardcap*0.95) / 100 * this.liquidity.percentage;
              const tokenLiqAmount = maxBnbAmount /this.liquidity.listingTokenPrice;
              
              // remaining amount of tokens for tokenomics
              this.remainingAmount = this.remainingTokensAmount - tokenLiqAmount;
            }
          }
        }
      },
      deep: true
    },
    socials: {
      handler: function() {
        if (this.socials.length > 0) {
          for (let i = 0; i < this.socials.length; i++) {
            this.socialsIsValid = this.socials[i].url !== '';
          }
        }
      },
      deep: true
    },
    socialsIsValid: {
      handler: function() {
        this.presaleIsValid = this.socialsIsValid && this.settingsIsValid && this.liquidityIsValid && this.tokenomicsIsValid;
      }
    },
    tokenPriceETH: {
      handler: async function() {
        if (this.tokenPriceETH > 0) {
          await axios.get(process.env.VUE_APP_KRAKEN_API).then(response => {
            this.tokenPriceDollar = (this.tokenPriceETH * Number(response.data.result.XETHZUSD.c[0]));
          });
        }
      }
    }
  }
};
</script>
