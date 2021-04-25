<template>
  <div id="presale" :class="!isLoaded ? 'h-screen' : ''">
    <transition name="slide-fade">
      <main v-if="isNotConnected">
        <span>Not connected LOL</span>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button v-on:click="connectMetamask" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Connect metamask
        </button>
        <button v-on:click="connectWalletConnect" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Connect walletConnect
        </button>
      </div>
      </main>
      <main v-if="isLoaded && !isNotConnected" class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
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
          <div class="grid grid-cols-4 gap-4">
            <div>
              <h1>
                <span class="block text-2xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                  {{ presale.Name }}
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
                  {{ presale.TokenName }}
                </span>
                <span v-if="presale.isBurn" class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide">
                 Presale type: <span class="text-yellow-500">Burn</span>
                </span>
                  <span v-else class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide">
                 Presale type: <span class="text-yellow-500">Divide</span>
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-medium tracking-wide">
                  Start date: {{ formatEpochDate(presale.StartDate) }}
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-medium tracking-wide">
                  End date: {{ formatEpochDate(presale.EndDate) }}
                </span>
              </h1>
            </div>
            <div class="col-span-3">
              <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
                {{ presale.name }} Token address:
                <a :href="`https://bscscan.com/address/${presale.TokenAddress}`" target="_blank" class="text-blue-500 hover:text-yellow-600 transiation duration-300">{{ presale.TokenAddress }}</a>
              </span>
            </div>
          </div>
        </div>
        <div class="block px-4 mt-6 sm:px-6 lg:px-8">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-1">
              <div class="block">
                <span class="block text-1xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">TEAM Information</span>
                <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Socials</span>
                <div class="grid mt-3">
                  <div class="flex truncate">
                    <svg class="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Website: </span>
                    <a :href="presale.Website" target="_blank" class="text-blue-500">{{ presale.Website}}</a>
                  </div>
                  <div class="flex truncate">
                    <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="m.415 11.196 5.869 2.925c.227.112.495.104.712-.023l5.224-3.037-3.162 2.802c-.161.143-.253.347-.253.562v6.825c0 .72.919 1.023 1.35.451l2.537-3.373 6.274 3.573c.44.253 1.004-.001 1.106-.504l3.913-19.5c.117-.586-.466-1.064-1.008-.846l-22.5 8.775c-.604.236-.643 1.081-.062 1.37zm21.83-8.249-3.439 17.137-5.945-3.386c-.324-.185-.741-.103-.971.201l-1.585 2.107v-4.244l8.551-7.576c.677-.599-.101-1.664-.874-1.21l-11.39 6.622-3.992-1.989z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Telegram: </span>
                    <a :href="presale.Telegram" target="_blank" class="text-blue-500">{{ presale.Telegram }}</a>
                  </div>
                  <div class="flex truncate">
                    <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="m21.534 7.113c.976-.693 1.797-1.558 2.466-2.554v-.001c-.893.391-1.843.651-2.835.777 1.02-.609 1.799-1.566 2.165-2.719-.951.567-2.001.967-3.12 1.191-.903-.962-2.19-1.557-3.594-1.557-2.724 0-4.917 2.211-4.917 4.921 0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147-.424.737-.674 1.58-.674 2.487 0 1.704.877 3.214 2.186 4.089-.791-.015-1.566-.245-2.223-.606v.054c0 2.391 1.705 4.377 3.942 4.835-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428-1.674 1.309-3.8 2.098-6.101 2.098-.403 0-.79-.018-1.177-.067 2.18 1.405 4.762 2.208 7.548 2.208 8.683 0 14.342-7.244 13.986-14.637z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Twitter: </span>
                    <a :href="presale.Twitter" target="_blank" class="text-blue-500">{{ presale.Twitter }}</a>
                  </div>
                  <div class="flex truncate">
                    <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="m22.085 4.733 1.915-1.832v-.401h-6.634l-4.728 11.768-5.379-11.768h-6.956v.401l2.237 2.693c.218.199.332.49.303.783v10.583c.069.381-.055.773-.323 1.05l-2.52 3.054v.396h7.145v-.401l-2.52-3.049c-.273-.278-.402-.663-.347-1.05v-9.154l6.272 13.659h.729l5.393-13.659v10.881c0 .287 0 .346-.188.534l-1.94 1.877v.402h9.412v-.401l-1.87-1.831c-.164-.124-.249-.332-.214-.534v-13.467c-.035-.203.049-.411.213-.534z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Medium: </span>
                    <a :href="presale.Medium" target="_blank" class="text-blue-500">{{ presale.Medium }}</a>
                  </div>
                  <div class="flex truncate">
                    <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Github: </span>
                    <a :href="presale.Github" target="_blank" class="text-blue-500">{{ presale.Github }}</a>
                  </div>
                </div>
              </div>
              <div class="block mt-8">
                <div class="grid">
                  <div>
                    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Token information</span>
                    <div class="grid gap-1 mt-3">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Liquidity locked:</span>
                        <a href="#" class="text-blue-500">{{ presale.LiquidityLocked }}% of raised BNB</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Total tokens:</span>
                        <a href="#" class="text-blue-500">{{ presale.TotalSupply }} {{ presale.TokenName }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Tokens in presale:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokensInPresale }} {{ presale.TokenName }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Token Liquidity:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokenLiquidity }} {{ presale.TokenName }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Price per token:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokenPrice }} BNB</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="block">
                        <span class="text-gray-900 block dark:text-white pr-5">Listing price per token is: </span>
                        <a href="#" class="block text-blue-500">{{ presale.listingTokenPrice }} (~ {{ presale.listingPrice }} times presale price)</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block mt-8">
                <div class="grid">
                  <div>
                    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Presale information</span>
                    <div class="grid gap-1 mt-3">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Hardcap:</span>
                        <a href="#" class="text-blue-500">{{ presale.Hardcap }}</a>
                        <span class="text-yellow-500 pl-2">BNB</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Softcap:</span>
                        <a href="#" class="text-blue-500">{{ presale.Softcap }}</a>
                        <span class="text-yellow-500 pl-2">BNB</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Total deposited currently:</span>
                        <a href="#" class="text-blue-500">{{ presale.TotalContributed }}</a>
                        <span class="text-yellow-500 pl-2">BNB</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Your current investment:</span>
                        <a href="#" class="text-blue-500">{{ presale.UserContribution }}</a>
                        <span class="text-yellow-500 pl-2">BNB</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Estimated return:</span>
                        <a href="#" class="text-blue-500">{{ presale.Roi }} </a>
                        <span class="text-yellow-500 pl-2">{{ presale.TokenName }} </span>
                      </div>
                    </div>
                  </div>
                  <div class="block mt-2">
                    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">
                      Progress
                    </span>
                    <div class="overflow-hidden h-5 mt-2 text-center text-xs flex rounded bg-gray-400">
                      <div :style="progressStyle" class="h-5 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                    </div>
                    <div class="block text-center text-gray-900 dark:text-white">
                      <p>{{progressPercentage}}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-1">
                  <span class="block text-1xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">Token allocation</span>
                  <div v-for="(allocation, index) in presale.Allocations" :key="index">
                    <div class="mt-3 block">
                      <span class="text-gray-900 dark:text-white">
                        Allocation Name:
                      </span>
                      <span class="text-yellow-500">
                        {{ allocation.Name }}
                      </span>
                    </div>
                    <div class="mt-3 block">
                      <span class="text-gray-900 dark:text-white">
                        Allocation address:
                      </span>
                      <span class="text-yellow-500">
                        <a :href="`https://bscscan.com/address/${presale.TokenTimeLock}`" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400" >{{ presale.TokenTimeLock }}</a>
                      </span>
                    </div>
                    <div class="mt-3 block">
                      <span class="text-gray-900 dark:text-white">
                        Allocation release date:
                      </span>
                      <span class="text-yellow-500">
                        {{ formatEpochDate(allocation.ReleaseDate) }}
                      </span>
                    </div>
                    <div class="mt-3 block">
                      <span class="text-gray-900 dark:text-white">
                        Allocation amount:
                      </span>
                      <span class="text-yellow-500">
                        {{ formatFromWei(allocation.Amount) }}
                      </span>
                    </div>

                    <div class="mt-3 block" v-if="allocation.IsInterval">
                      <span class="text-gray-900 dark:text-white" >
                        Releases every:
                      </span>
                      <span class="text-yellow-500">
                        {{ allocation.IntervalOfRelease }} days
                      </span>
                    </div>
                    <div class="mt-3 block" v-if="allocation.IsInterval">
                      <span class="text-gray-900 dark:text-white" >
                        Percentage of release:
                      </span>
                      <span class="text-yellow-500">
                        {{ allocation.PercentageOfRelease }}
                      </span>
                    </div>
                    <div class="mt-3 block" v-if="allocation.IsInterval">
                      <span class="text-gray-900 dark:text-white" >
                        Remaining tokens to be released:
                      </span>
                      <span class="text-yellow-500">
                        {{ formatFromWei(allocation.RemainingAmount) }}
                      </span>
                    </div>
                    <div class="mt-3 block" v-if="allocation.IsInterval">
                      <span class="text-gray-900 dark:text-white" >
                        Allocation Token Address:
                      </span>
                      <span class="text-yellow-500">
                        <a :href="`https://bscscan.com/address/${presale.TokenTimeLock}`" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400" >{{ presale.TokenTimeLock }}</a></span>
                    </div>
                    <hr class="mt-3 mb-3">
                  </div>
                </div>
                <div class="col-span-2">
                  <span class="block text-1xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">
                    Token allocation chart
                  </span>
                  <Chart class="block mt-5" style="height: 300px;" :chartData="presale.chartData" :options="options" />
                </div>
              </div>
            </div>
          </div>
          <div class="block mt-8">
             <div v-if="this.presale.CurrentStep == 0 && this.account.toLowerCase() == this.presale.TokenOwnerAddress.toLowerCase() && this.allowanceState < this.presale.TotalTokenAmount">
              <div class="block text-center mt-10">
                <button v-on:click="approveCall()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Approve
                </button>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 0 && this.account.toLowerCase() == this.presale.TokenOwnerAddress.toLowerCase() && this.allowanceState == this.presale.TotalTokenAmount">
              <div class="block text-center mt-10">
                <button v-on:click="transferTokens()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Transfer Tokens
                </button>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 1 && !this.presale.finished && this.presale.started">
              <div class="block mt-10">
                <div class="flex">
                  <div class="flex-1">
                    <input
                        v-model="contribution"
                        placeholder="Enter amount in BNB"
                        class="w-full px-3 py-1 rounded-lg
                    text-gray-600 dark:text-gray-300
                    border border-transparent
                    focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                    bg-gray-100 dark:bg-gray-700">
                  </div>
                  <div class="flex-1 has-text-left ml-4">
                    <button v-on:click="contributeTokens(contribution)" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                      Contribute
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 1 && !this.presale.SoftcapMet && this.presale.finished">
              <div class="block text-center mt-10">
                <button v-on:click="retrieveBNB()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Retrieve BNB
                </button>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 1 && !this.presale.SoftcapMet && this.presale.finished && toString(this.account).toLowerCase == toString(this.presale.TokenOwnerAddress).toLowerCase">
              <div class="block text-center mt-10">
                <button v-on:click="retrieveTokensOwner()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Retrieve Tokens
                </button>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 1 && this.presale.SoftcapMet && this.presale.finished">
              <div class="block text-center mt-10">
                <button v-on:click="TransferTokensToLocks()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Transfer Tokens
                </button>
              </div>
            </div>

            <div v-if="this.presale.CurrentStep == 2">
              <div class="block text-center mt-10">
                <button v-on:click="addLiquidity()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Add Pancakeswap Liquidity
                </button>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 3 && !this.tokensClaimed">
              <div class="block text-center mt-10">
                <button v-on:click="claimTokens()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Claim Tokens
                </button>
              </div>
            </div>
            <div v-if="this.presale.CurrentStep == 3 && this.presale.BNBDistributable">
              <div class="block text-center mt-10">
                <button v-on:click="distributeBNB()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                  Distribute BNB
                </button>
              </div>
            </div>
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

import WalletConnector from '@/components/plugins/WalletConnection/WalletConnector.ts'

import Chart from '@/components/views/dashboard/presale/charts/Presale.Chart'
import axios from "axios";
import Web3 from "web3";
import moment from 'moment';

export default {
  name: "presale.detail.cp.views",
  components: {
    AlertModal,
    Header,
    PageTitle,
    Chart,   
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
      isNotConnected: false,
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
      tokenAbi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
      walletConnector:null,
    }
  }, 
  mounted: async function () {
    this.$loading(true);

    if (!this.isLoaded) {
      //do shit

      //this.isLoaded = true;
      this.walletConnector = new WalletConnector(window.ethereum);
      if(this.walletConnector.IsConnected())
      {
        await this.loadAccounts();
        this.isLoaded = true;
      }else{
        this.isNotConnected = true;
      }
    }
    // if (this.provider.chainId !== '0x38') {
    //   this.showError(
    //       'Wrong network detection',
    //       'It looks like you are connected to the wrong network. Please connect to Binance Smart Chain and refresh the page.',
    //       false);
    //   this.isLoaded = true;
    // }

    // if (!this.isLoaded) {
    //   // Detect provider
    //   await this.detectProvider();
    //   // Connect to your account
    //   await this.currentAccount();
    // }

    if(this.isLoaded == true)
      await this.initDetailPage();

    this.$loading(false);
    //this.isLoaded = true;
  },
  methods: {
    initDetailPage: async function() {
      //this.web3 = new Web3(this.provider);

      await this.getPresaleData();
      // await this.getContributedBNB();
      // await this.getSoftcapMet();
      // if (this.account.toLowerCase() === this.presale.TokenOwnerAddress.toLowerCase()){
      //   await this.getAllowance();
      // }
      // if (parseInt(this.presale.CurrentStep) === 1){
      //   await this.getPresaleFinished();
      //   if (!this.presale.finished){
      //     await this.getPresaleStarted();
      //   }
      // }

      // await this.getTokenAllocations();
      // await this.getContributorHasTokensClaimed();

      // this.setProgressBar();
    },
    getPresaleData: async function() {
      const web3 = new Web3(this.provider);
      let result;
      try {
        result = await this.walletConnector.GetPresaleData(this.contractAbi, this.id, process.env.VUE_APP_PRESALE_CONTRACT); 
      } catch (error) {
          console.log('error: ' + error);
      }
      
      if(result != null)
      {
        this.presale.isBurn = result.State.IsBurnUnsold;
        this.presale.Name = result.Info.Name;
        this.presale.StartDate = (parseInt(result.StartDate));
        this.presale.EndDate = (parseInt(result.EndDate));
        this.presale.Softcap = parseFloat(web3.utils.fromWei(result.Softcap));
        this.presale.Hardcap = parseFloat(web3.utils.fromWei(result.Hardcap));
        this.presale.TokenAddress = result.Addresses.TokenAddress;
        this.presale.LiquidityLocked = result.LiqPercentage;
        this.totalSupply = web3.utils.fromWei(result.State.TotalTokenAmount);
        this.presale.TotalSupply = (this.readableFormatNumbers(Math.ceil(parseFloat(web3.utils.fromWei(result.State.TotalTokenAmount)))));
        this.presale.TotalTokenAmount = result.State.TotalTokenAmount;
        this.presale.TokensInPresale = this.readableFormatNumbers(web3.utils.fromWei(result.TokenPresaleAllocation));
        this.tokensInPresale = web3.utils.fromWei(result.TokenPresaleAllocation);
        this.presale.RawTokensInPresale = web3.utils.fromWei(result.TokenPresaleAllocation);
        this.presale.TokenLiquidity = this.readableFormatNumbers(web3.utils.fromWei(result.TokenLiqAmount));
        this.liquidityTokens = web3.utils.fromWei(result.TokenLiqAmount);

        if(this.presale.isBurn){
          this.presale.TokenPrice = this.readableFormatNumbers(parseFloat(web3.utils.fromWei(result.State.PresaleTokenPrice)).toFixed(10));
        } else {
          this.presale.TokenPrice = this.getTokenPrice().toFixed(10);
        }

        this.presale.TotalContributed = web3.utils.fromWei(result.State.ContributedBNB);
        this.presale.TokenOwnerAddress = result.Addresses.TokenOwnerAddress;
        this.presale.BNBDistributable = (result.State.ContributedBNB - result.State.RetrievedBNBAmount) > 0;
        this.presale.TokenTimeLock = result.Addresses.TokenTimeLock;

        const presalePrice = web3.utils.fromWei(result.TokenPresaleAllocation)/web3.utils.fromWei(result.Hardcap);
        const listingPrice = web3.utils.fromWei(result.TokenLiqAmount) / ((result.LiqPercentage/100)*Number(web3.utils.fromWei(result.Hardcap)*0.95)); 
        this.presale.listingPrice =  (presalePrice/listingPrice).toFixed(2);

        const hardCapPercentage = Number(web3.utils.fromWei(result.Hardcap)) * 0.95;
        const toLiquidity = hardCapPercentage * ((1/100) * Number(result.LiqPercentage));
        this.presale.listingTokenPrice = (toLiquidity / Number(web3.utils.fromWei(result.TokenLiqAmount))).toFixed(10);

        //Current Presale Step
        this.presale.CurrentStep = result.State.Step;
        //Socials
        this.presale.Github = result.Info.Github;
        this.presale.Medium = result.Info.Medium;
        this.presale.Telegram = result.Info.Telegram;
        this.presale.Twitter = result.Info.Twitter;
        this.presale.Website = result.Info.Website;
        this.getTokenTicker();
      }
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
    getTokenTicker: async function() {
      try {
        const result = await this.walletConnector.GetTokenSymbol(this.tokenAbi, this.presale.TokenAddress);
        this.presale.TokenName = result;
      } catch (error) {
        console.log('error:' + error);
      }      
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
      await this.walletConnector.ClaimTokens(this.contractAbi, this.id, process.env.VUE_APP_PRESALE_CONTRACT, this.account)
      // this.$loading(true);
      // const presaleContractAbi = this.contractAbi;
      // const web3 = new Web3(this.provider);
      // const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      // presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      //   await presaleContractInterface.methods.ClaimTokens(this.id)
      //     .send({from: this.account})
      //     .then(() => {
      //       this.initDetailPage();
      //     })
      //     .catch((e) => {
      //       console.log('error:' + e);
      //     }).finally(() => {
      //       this.$loading(false);
      //     });
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
    TransferTokensToLocks: async function() {
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
    contributeTokens: async function(x) {
      this.$loading(true);
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.Contribute(this.id)
            .send({from: this.account, value:web3.utils.toWei(x.toString())})
            .then(() => {
              this.contribution = "";
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
      const totalContributed = Number(this.presale.TotalContributed); //web3.utils.fromWei(this.presale.TotalContributed.toString());
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
    connectMetamask: function () {      
      this.walletConnector.ConnectMetaMask();
      // this.provider
      //     .request({ method: 'eth_requestAccounts' })
      //     .then(this.handleAccountsChanged(this.provider._state.accounts))
      //     .catch((err) => {
      //       if (err.code === 4001) {
      //         // EIP-1193 userRejectedRequest error
      //         // If this happens, the user rejected the connection request.
      //         this.showError('Please connect to MetaMask.', err.message);
      //       } else {
      //         this.showError('Something went wrong', err.message);
      //       }
      //     });

    },
    connectWalletConnect: function(){
      this.walletConnector.ConnectWalletConnect();
    },
    loadAccounts: async function(){
      const accounts = await this.walletConnector.GetAccounts();
      this.$store.state.account = accounts[0];
      this.account = accounts[0];
      console.log(this.account);
    },
    formatDate: function(date) {
      // const dateTimeOffset = Math.abs()
      return new Date(date).toUTCString();
    },
    formatEpochDate: function(date) {
      return new Date(date * 1000).toLocaleString();
    },
    formatFromWei: function(wei) {
      return this.web3.utils.fromWei(wei.toString());
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