<template>
  <div>
    <h2 class="p-6 text-gray-500 text-xs font-medium uppercase tracking-wide">
      Presale list
    </h2>
    <div v-if="this.allPresales.length > 0">
      <div
        class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 relative"
      >
        <div v-for="(presale, key) in this.allPresales" :key="key">
          <div class="p-6 rounded-lg static presale-blocks">
            <div class="rounded-lg w-48 m-auto text-center">
              <div v-if="presale.isFinished == true">
                <div class="bg-red-600 rounded-lg p-1">
                  <h2 class="font-bold text-white">Failed</h2>
                </div>
              </div>
              <div v-else-if="presale.isStarted == true">
                <div class="bg-green-600 rounded-lg p-1">
                  <h2 class="font-bold text-white">Ongoing</h2>
                </div>
              </div>
              <div v-else-if="presale.isUpcoming == true">
                <div class="bg-blue-600 rounded-lg p-1">
                  <h2 class="font-bold text-white">Upcoming</h2>
                </div>
              </div>
                 <div v-else-if="presale.contributedEth == presale.hardcapInEth">
                <div class="bg-green-600 rounded-lg p-1">
                  <h2 class="font-bold text-white">Filled</h2>
                </div>
              </div>
            </div>
            <div class="p-2 align-left text-left object-left content-left">
              <img src="/assets/images/logo.svg" class="h-10 h-auto inline" />
              <span
                class="content-left text-left font-bold text-white text-xl p-2 w-3/4 align-middle"
              >
                {{ presale.name }}</span
              >
            </div>
            <span class="text-left text-sm text-white">
              {{ (presale.hardcapInEth / presale.tokenPresaleAllocation).toFixed(10) }} per token</span
            >
            <br />
            <span class="truncate text-xl font-bold text-yellow-500">
              {{ presale.contributedEth }} BNB</span
            >
             <div :key="percentage.index" v-for="(percentage) in percentages">
         
            <div v-if="percentage.index == presale.presaleId">
             
             
            <div
              class="overflow-hidden h-5 mt-2 text-center text-xs flex rounded-lg progress-bar"
            >
              <div
                :style="percentage.width"
                class="h-5 shadow-none progressbar flex flex-col text-center whitespace-nowrap text-white justify-center"
              >
                <p class="text-white">{{presale.contributedEth/presale.hardcapInEth*100}}%</p>
              </div>
                     
            </div>
              </div>
            </div>
            <span class="truncate text-center text-sm text-gray-600">
              <p class="p-2">
                {{ presale.contributedEth / presale.hardcapInEth * 100  }}% (Min {{presale.softcapInEth / presale.hardcapInEth * 100}}%) {{ presale.contributedEth }}/{{presale.hardcapInEth}} BNB
              </p>
            </span>
            <div class="grid grid-cols-2 text-center pb-6">
              <div class="items-center space-x-3">
                <span class="truncate hover:text-gray-600">
                  <label class="text-white">End date:</label>
                  <br />
                  <p class="text-yellow-500">
                    {{ formatDate(presale.endDate) }}
                  </p>
                </span>
              </div>
              <div>
                <label class="text-white">Connect</label>
                <br />
                <a class="p-2" :href="presale.website">
                  <svg
                    fill="#f59e0b"
                    class="h-4 w-4 inline yellow"
                    id="Layer_1"
                    enable-background="new 0 0 511.771 511.771"
                    height="512"
                    viewBox="0 0 511.771 511.771"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="m189.547 128.897c-60.302 62.391-47.143 165.931 21.932 211.798 2.276 1.512 5.304 1.212 7.259-.698 14.542-14.209 26.844-27.972 37.616-45.476 1.648-2.678.623-6.153-2.142-7.651-10.536-5.708-21.02-16.411-26.922-27.717l-.007.004c-7.07-14.078-9.477-29.859-5.734-46.157.004.001.008.002.012.002 4.307-20.866 26.708-40.276 43.817-58.227-.036-.012-.071-.025-.107-.037l64.103-65.426c25.546-26.073 67.566-26.288 93.377-.477 26.072 25.545 26.503 67.777.958 93.849l-38.828 39.928c-1.797 1.848-2.38 4.544-1.539 6.981 8.94 25.925 11.139 62.48 5.148 90.098-.168.773.786 1.279 1.339.714l82.638-84.344c52.791-53.88 52.343-141.604-.995-194.942-54.433-54.433-143.048-53.98-196.922 1.005l-84.672 86.419c-.112.118-.218.238-.331.354z"
                      />
                      <path
                        d="m344.038 352.576c-.001.003-.003.006-.004.009.053-.022.102-.043.155-.066 16.865-30.839 20.185-66.208 12.281-100.687l-.036.037-.039-.017c-7.505-30.709-28.098-61.203-56.066-79.978-2.406-1.615-6.249-1.428-8.502.394-14.167 11.455-28.034 26.144-37.184 44.889-1.437 2.943-.361 6.478 2.471 8.122 10.619 6.165 20.209 15.191 26.63 27.174l.01-.007c5.004 8.465 9.935 24.527 6.741 41.785-.002 0-.005 0-.007 0-2.98 22.881-26.086 43.869-44.454 62.781l.009.009c-13.982 14.298-49.525 50.532-63.757 65.072-25.545 26.072-67.777 26.503-93.849.958-26.072-25.545-26.503-67.777-.958-93.849l38.943-40.048c1.765-1.815 2.365-4.453 1.58-6.86-8.647-26.531-11.016-62.262-5.558-89.849.152-.769-.794-1.26-1.343-.7l-81.395 83.075c-53.332 54.433-52.88 143.057 1.006 196.942 54.43 53.33 142.597 52.429 195.927-2.001 18.527-20.724 97.835-94.153 107.399-117.185z"
                      />
                    </g>
                  </svg>
                </a>
                <a class="p-2" :href="presale.telegram">
                  <svg
                    fill="#f59e0b"
                    class="h-4 w-4 inline"
                    x="0px"
                    y="0px"
                    viewBox="0 0 189.5 189.5"
                    style="enable-background: new 0 0 189.5 189.5"
                  >
                    <g id="Layer_2">
                      <g>
                        <g>
                          <path
                            class="st0"
                            d="M152.5,179.5c-1.5,0-2.9-0.4-4.2-1.3l-47.6-32.3l-25.6,18.4c-2,1.4-4.6,1.8-6.9,1c-2.3-0.8-4.1-2.8-4.7-5.1
				l-12.8-48.6L4.8,93.9C1.9,92.8,0,90.1,0,87c0-3.1,1.9-5.9,4.7-7L179,10.6c0.8-0.3,1.6-0.5,2.5-0.6c0.3,0,0.6,0,0.9,0
				c1.7,0.1,3.5,0.8,4.8,2.1c0.1,0.1,0.3,0.3,0.4,0.4c1.1,1.3,1.7,2.8,1.8,4.4c0,0.4,0,0.8,0,1.2c0,0.3-0.1,0.6-0.1,0.9l-29.4,154.4
				c-0.5,2.5-2.2,4.6-4.5,5.5C154.5,179.3,153.5,179.5,152.5,179.5z M104.9,130.6l42.4,28.8l22.9-120.1l-82.7,79.6l17.2,11.6
				C104.7,130.5,104.8,130.5,104.9,130.6z M69.5,124.2l5.7,21.5l12.2-8.8l-16-10.9C70.7,125.5,70,124.9,69.5,124.2z M28.1,86.8
				l31.5,12c2.3,0.9,4,2.8,4.6,5.1l4,15.1c0.2-1.7,1-3.4,2.3-4.6l78.8-75.8L28.1,86.8z"
                          />
                        </g>
                        <path
                          class="st1"
                          d="M166.7,20.3L22.2,80.4l-3,10.5l28.6,12.1l14.6,18.1l4.3,29.7l10.5,2.2l21.8-13.8c0,0,24.3,8.6,24.8,9.4
			c0.5,0.8,20.2,18.3,20.2,18.3l11.9-11.6c0,0,15.9-96.3,16.7-96.8c0.8-0.5,5.7-38.3,5.7-38.3H166.7z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <div class="center">
              <button
                v-on:click="showPresale(presale)"
                class="bg-yellow-500 rounded pl-3 pr-3 pt-2 pb-2 text-white w-full"
              >
                View
              </button>
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
import axios from 'axios'

export default {
  name: "presale.blocks.presale.dashboard.views.components",
  props: {
    presales: Array,
    // allPresales: Array,
  },
  data: () => ({
    presale: {},
      percentages: [{
      'index': '',
      'width': ''
    }],
    web3: null,
    progressStyle: 'width: 0%',
    // progressPercentage: 0,
    allPresales: {}, // empty array
  }),

    mounted: async function () {
    this.provider = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
    await this.initWalletConnector();
    await this.getPresales();
    await this.initCard();
  },

  methods: {
    getPresales: async function () {
      await axios.get(`${process.env.VUE_APP_SERVICE_GETALL}`)
        .then((response) => {
          if (response.status === 200) {
            this.allPresales = response.data.items;
            if(this.allPresales.isBurn){
            this.allPresales.TokenPrice = this.readableFormatNumbers(parseFloat(Web3.utils.fromWei(response.State.PresaleTokenPrice)).toFixed(10));
          } else {
            this.TokenPrice = this.getTokenPrice().toFixed(10);
          }
          }
        }).catch(() => {
          this.showError('Error');
        }).finally(() => {
          this.$loading(false);
        });
    },

    setProgress: async function(percentage) {
      this.progressStyle = `width: ${percentage}%; background-color: #059669;`;
    },

   initCard: function () {
      const sweeterArray = this.allPresales.map((presale) => { 
       const width = presale.contributedEth/presale.hardcapInEth*100;
       const presaleid = presale.presaleId;
          return {
              width: width,
              index: presaleid
          };
      })

      let i;
     
      for (i = 0; i < sweeterArray.length; i++) {
        this.percentages.push({'index': sweeterArray[i].index, 'width': 'width:' + sweeterArray[i].width + '%'});
          }

          this.percentages.shift(); 
   
    },
    initWalletConnector: async function() {
      this.walletConnector = new WalletConnector(window.ethereum);
    },
      getTokenPrice: function() {
      return parseInt(this.presale.Hardcap)/(parseInt(this.presale.RawTokensInPresale));
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
  background-color: #1b2233;
}

.progress-bar {
  background-color: #111827;
}

.progressbar {
  background-color: #059669;
}

</style>