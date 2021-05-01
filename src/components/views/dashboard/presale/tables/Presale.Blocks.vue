<template>
<div>
      <h2 class="p-6 text-gray-500 text-xs font-medium uppercase tracking-wide">Presale list</h2>
      <div v-if="(presales.length > 0)">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 relative">
        <div v-for="(presale, key) in presales" :key="key">
        <div class="text-center p-6 rounded-lg static presale-blocks">
            <div class="rounded-lg w-48 absolute top-0 fix-presale">
            <div v-if="(presale.isFinished) == true">
              <div class="bg-red-600 rounded-lg p-1 ">
              <h2 class="font-bold text-white">Filled</h2>
              </div>
            </div>
              <div v-if="(presale.IsStarted) == true">
              <div class="bg-green-600 rounded-lg p-1">
              <h2 class="font-bold text-white">Ongoing</h2>
              </div>
            </div>
              <div v-if="(presale.isUpcoming) == true">
              <div class="bg-blue-600 rounded-lg p-1">
              <h2 class="font-bold text-white">Upcoming</h2>
              </div>
            </div>
            </div>
            <div class="p-2 align-left text-left object-left content-left">
                 <img src="/assets/images/logo.svg" class="h-10 h-auto inline">
                  <span class="content-left text-left font-bold text-white text-xl p-2 w-3/4  align-middle"> {{ presale.name }}</span>
          </div>
            <span class="text-center text-sm text-white "> {{ TokenPrice }} per token</span>
            <br>   
                <span class="truncate text-yellow-500">  {{ presale.contributedEth }} BNB</span>
                  <div class="overflow-hidden h-5 mt-2 text-center text-xs flex rounded-lg progress-bar">
          <div :style="progressStyle" class="h-5 p-4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center "></div>
        </div>
                       <span class="truncate hover:text-gray-600">
                    <p class="p-2"> {{ presale.Percentage}}   {{ presale.contributedEth }}  /  {{ presale.hardcapInEth }} BNB</p>
                    </span>
        <div class="grid grid-cols-2">
            <div class="items-center space-x-3">
                <span class="truncate hover:text-gray-600">
                     <label class="text-white">End date:</label>
                     <br>
                    {{ formatDate(presale.endDate) }}
                </span>
            </div>
         <div class="items-center space-x-3">
            <span class="truncate hover:text-gray-600">
                 <label>Connect</label>
                  <br> 
                <a href="/">connectlinks</a>
         </span>
     </div>
    </div>     
 </div>
  </div>
</div>

  </div>
</div>
</template>

<script>
import WalletConnector from "@/plugins/walletConnect.plugin";
import Web3 from "web3";

export default {
  name: "presale.blocks.presale.dashboard.views.components",
  props: {
    presales: Array,
  },

  data: () => ({
    presale: {},
    web3: null,
     contractAbi: [{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"},{"internalType":"address","name":"yieldFeeAddress","type":"address"},{"internalType":"address","name":"feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BNBYieldFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Contributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"NoTokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"permaLockedLiq","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountOfBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokens","type":"uint256"}],"name":"PancakeswapLiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedBNB","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UnliqedTokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UnsoldTokensTransfered","type":"event"},{"inputs":[],"name":"FeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PancakeswapFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PancakeswapRouterAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PresaleIndexer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Presales","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"}],"internalType":"struct PresaleInfo","name":"Info","type":"tuple"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"components":[{"internalType":"address","name":"TokenOwnerAddress","type":"address"},{"internalType":"address","name":"TokenAddress","type":"address"},{"internalType":"address","name":"TokenTimeLock","type":"address"},{"internalType":"address","name":"UnsoldTransferAddress","type":"address"}],"internalType":"struct PresaleDataAddresses","name":"Addresses","type":"tuple"},{"components":[{"internalType":"uint256","name":"TotalTokenAmount","type":"uint256"},{"internalType":"uint256","name":"Step","type":"uint256"},{"internalType":"uint256","name":"ContributedBNB","type":"uint256"},{"internalType":"uint256","name":"RaisedFeeBNB","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"uint256","name":"RetrievedTokenAmount","type":"uint256"},{"internalType":"uint256","name":"RetrievedBNBAmount","type":"uint256"},{"internalType":"uint256","name":"NumberOfContributors","type":"uint256"},{"internalType":"uint256","name":"PresaleTokenPrice","type":"uint256"},{"internalType":"uint256","name":"ListingTokenPrice","type":"uint256"},{"internalType":"bool","name":"IsBurnUnsold","type":"bool"},{"internalType":"uint256","name":"TransferedBurnUnsold","type":"uint256"}],"internalType":"struct PresaleDataState","name":"State","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"TimelockFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"YieldFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"}],"name":"SetTimelockFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"yieldFeeAddress","type":"address"}],"name":"SetYieldFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress","type":"address"}],"name":"SetFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"SetPancakeswapRouterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"SetPancakeswapFactoryAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"TokenAllocations","type":"tuple[]"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"internalType":"address","name":"Token","type":"address"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"},{"internalType":"uint256","name":"PresaleTokenPrice","type":"uint256"},{"internalType":"uint256","name":"ListingTokenPrice","type":"uint256"},{"internalType":"bool","name":"IsBurnUnsold","type":"bool"},{"internalType":"address","name":"UnsoldTransferAddress","type":"address"}],"internalType":"struct PresaleSettings","name":"settings","type":"tuple"}],"name":"CreatePresale","outputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"Contribute","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"contributor","type":"address"}],"name":"RetrieveBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"RetrieveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokensToLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"AddLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"ClaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"DistributeBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"SoftcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"HardcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PresaleIndexerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetTokenAllocations","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetBNBContributedForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetHardcapAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetNumberOfContributors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"ContributorHasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true}],
      tokenAbi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
  }),
     mounted: async function () {
    this.provider = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
    await this.initWalletConnector();
  
     this.getPresaleData();
     this.GetPresalePercentage();
  },

  methods: {
      getPresaleData: async function() {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
      await this.walletConnector.GetPresaleData(this.contractAbi, 1, process.env.VUE_APP_PRESALE_CONTRACT).then((response) => {
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
            this.TokenPrice = this.getTokenPrice().toFixed(10);
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
    initWalletConnector: async function() {
      this.walletConnector = new WalletConnector(window.ethereum);
    },
      getTokenPrice: function() {
      return parseInt(this.presale.Hardcap)/(parseInt(this.presale.RawTokensInPresale));
    },

      GetPresalePercentage: function() {
      this.presale.Percentage = parseInt(this.presale.Hardcap)/(parseInt(this.presale.contributedEth) * 100);
      return this.presale.Percentage;
    },

    parseToWei: function (eth) {
      return eth;
    },
     readableFormatNumbers: function(x){
        const parts = x.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
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
    showPresale: function (presale) {
      this.$store.state.presale = presale;
      this.$router.push({
        name: "presale.show",
        params: { id: presale.presaleId },
      });
    },
    pinPresale: function (presale) {
      this.$emit("pinPresale", presale);
    },
    formatDate: function (date) {
      return new Date(date * 1000).toLocaleString();
    },
  },
};
</script>

<style>
.presale-blocks {
    background-color:#1B2233 ;
}
.progress-bar {
    background-color:#059669 ;
}

.fix-presale {
  margin-left: 80px;
}

</style>