<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Liquidity
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="block">
          <div v-if="divideTokens" class="block">
            <label
                :for="liquidity.amount"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token liquidity amount - Remaining tokens: {{ remainingTokens }}

            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  :max="remainingTokens"
                  v-model="liquidity.amount"
                  placeholder="Number of tokens to add as liquidity"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div v-if="error.liquidity.maxAmount !== ''" class="block">
              <p class="text-red-500 my-2 text-left">
                {{error.liquidity.maxAmount}}
              </p>
            </div>
            <div v-if="listingPrice" class="block mt-1 text-left">
              <span class="text-yellow-500">
                {{listingPrice}}
              </span>
            </div>
          </div>
          <div v-if="burnTokens" class="block">
            <label
                :for="liquidity.listingTokenPrice"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Listing token price
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="liquidity.listingTokenPrice"
                  placeholder="Listing token price"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div v-if="listingTokenPrice" class="block mt-1 text-left text-yellow-500">
              <p>{{listingTokenPrice}}</p>
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="liquidity.percentage"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token liquidity precentage
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  max="100"
                  v-model="liquidity.percentage"
                  placeholder="Percentage of raised BNB that will be added as liquidity"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div v-if="tokensPerBNBStr" class="block mt-1 text-left">
              <span class="text-yellow-500">
                {{tokensPerBNBStr}}
              </span>
            </div>
            <div v-if="liquidityAmount" class="block mt-1 text-left">
              <span class="text-yellow-500">
                {{liquidityAmount}}
              </span>
            </div>

          </div>
          <div class="mx-auto w-1/2 mt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="radio"
                         class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600"
                         value="0"
                         v-model="liquidity.lockedOrPermaBurn">
                  <span class="text-gray-700 dark:text-gray-200 ml-2">Locked</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="radio"
                         class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600"
                         value="1"
                         v-model="liquidity.lockedOrPermaBurn">
                  <span class="text-gray-700 dark:text-gray-200 ml-2">Perma-burn</span>
                </label>
              </div>
            </div>
          </div>
          <div
            v-if="liquidity.lockedOrPermaBurn === '0'"
            class="block mx-auto w-1/2">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="inline-flex items-center mt-9">
                  <input
                      type="radio"
                      class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600"
                      value="0"
                      v-model="liquidity.timeLockedOrInterval">
                  <span class="text-gray-700 dark:text-gray-200 ml-2">Timelocked</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="radio"
                         class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600"
                         value="1"
                         v-model="liquidity.timeLockedOrInterval">
                  <span class="text-gray-700 dark:text-gray-200 ml-2">Interval</span>
                </label>
              </div>
            </div>
          </div>
          <div class="block w-full" v-if="liquidity.timeLockedOrInterval === '0'">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <label class="items-center">
                  <label
                      :for="liquidity.releaseDate"
                      class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                    Release date
                  </label>
                  <input type="date"
                         v-model="liquidity.releaseDate"
                         class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
                </label>
              </div>
              <div class="col-span-1">
                <label
                    :for="liquidity.releaseDateTime"
                    class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                  Start time
                </label>
                <vue-timepicker
                    class="w-full mt-2 mb-2 rounded-lg
                                    text-gray-600 dark:text-gray-300
                                    border border-transparent
                                    focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                                    bg-gray-100 dark:bg-gray-700"
                    v-model="liquidity.releaseDateTime"/>
              </div>
            </div>
          </div>
          <div v-if="liquidity.timeLockedOrInterval === '1'" class="grid grid-cols-4 gap-4">
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalStartDate"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Start date
              </label>
              <input type="date"
                     v-model="liquidity.intervalStartDate"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalStartDateTime"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Start time
              </label>
              <vue-timepicker
                  class="w-full mt-2 mb-2 rounded-lg
                                text-gray-600 dark:text-gray-300
                                border border-transparent
                                focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                                bg-gray-100 dark:bg-gray-700"
                  v-model="liquidity.intervalStartDateTime"/>
            </div>
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalInDays"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Interval
              </label>
              <input type="number"
                     placeholder="Interval in days"
                     v-model="liquidity.intervalInDays"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalPercentage"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Interval percentage
              </label>
              <input type="number"
                     placeholder="Interval percentage"
                     v-model="liquidity.intervalPercentage"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueTimepicker from 'vuejs-timepicker'

export default {
  name: 'presale.Liquidity.components',
  props: {
    liquidity: Object,
    hardCap: [String, Number],
    tokensPerBNB: [String, Number],
    totalTokens: [String, Number],
    presaleTokens: [String, Number],
    presaleTokenPrice: [String, Number],
    divideTokens: Boolean,
    burnTokens: Boolean,
  },
  components: {
    VueTimepicker
  },
  data: () => ({
    tokensPerBNBStr: null,
    listingPrice: null,
    listingTokenPrice: null,
    liquidityAmount: null,
    error: {
      liquidity: {
        maxAmount: ''
      }
    }
  }),
  computed: {
    remainingTokens: {
      get() {
        return Number(this.totalTokens) - Number(this.presaleTokens);
      },
      set(newValue) {
        return newValue;
      }
    }
  },
  watch: {
    liquidity: {
      handler() {
        if (this.liquidity.lockedOrPermaBurn === '1') {
          this.liquidity.locked = false;
          this.liquidity.timeLocked = false;
          this.liquidity.interval = false;
        }

        if (this.liquidity.timeLockedOrInterval === '1') {
          this.liquidity.timeLocked = false;
        }

        if (this.hardCap !== "undefined" &&
            this.hardCap !== null &&
            this.liquidity.amount !== null &&
            this.liquidity.percentage !== null)
        {
          this.liquidity.percentage = parseInt(this.liquidity.percentage).toFixed(0);
          const liquidityAmount = Number(this.hardCap*0.95) / 100 * this.liquidity.percentage;
          const tokensPerBNBLiq = this.liquidity.amount / liquidityAmount;
          this.tokensPerBNBStr = `${tokensPerBNBLiq} tokens per BNB`;

          const listingTimes = (this.tokensPerBNB/tokensPerBNBLiq).toFixed(2);//dived tokensPerBNB from presale Alloc by tokensPerBNB from liquidity alloc
          this.listingPrice = `Listing price is ~ ${listingTimes} times presale price`;
        }

        if (this.liquidity.amount > this.remainingTokens) {
          this.error.liquidity.maxAmount = `Liquidity amount can't be larger than remaining tokens: ${this.remainingTokens}`;
        } else {
          this.remainingTokens -= this.liquidity.amount;
          this.error.liquidity.maxAmount = '';
        }

        if (this.liquidity.listingTokenPrice !== null) {
          const listingTimes =  this.presaleTokenPrice / this.liquidity.listingTokenPrice;
          this.listingTokenPrice = `Listing price is ~ ${listingTimes} times presale price`;
        }

        if (this.liquidity.listingTokenPrice !== null && this.liquidity.percentage !== null && this.burnTokens) {         
          const maxBnbAmount = parseFloat(Number(this.hardCap*0.95) / 100 * this.liquidity.percentage).toFixed(2);
          const tokenLiqAmount = parseFloat(maxBnbAmount / parseFloat(this.liquidity.listingTokenPrice)).toFixed(2);
          this.liquidityAmount = `A maximum amount of ${tokenLiqAmount} tokens and ${maxBnbAmount} BNB will be added as liquidity`;
        }
      },
      deep: true
    }
  }
}
</script>
<style>
.time-picker input.display-time {
  background: transparent !important;
  border: none !important;
  text-align: left !important;
  width: 100% !important;
}
.time-picker .dropdown {
  background: transparent !important;
}
.time-picker .dropdown .select-list {
  width: 20em !important;
}
.time-picker .dropdown select {
  background: #1f2937 !important;
  padding: 5px 10px !important;
}
.time-picker .dropdown select option {
  color: #FFFFFF !important;
}
</style>