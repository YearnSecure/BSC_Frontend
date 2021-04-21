<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Presale information
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="block">
          <div class="block">
            <label
                :for="token.address"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token address
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.address"
                  placeholder="Token address"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <label
              v-if="error.tokenAddress !== ''"
              class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.tokenAddress }}
              </span>
            </label>
          </div>
          <div v-if="burnTokens" class="block mt-4">
            <label
                :for="token.burnTokenAddress"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Burn token address
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.burnTokenAddress"
                  placeholder="Token address"
                  readonly
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <label
                v-if="error.burnTokenAddress !== ''"
                class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.burnTokenAddress }}
              </span>
            </label>
          </div>

          <div class="block mt-4">
            <label
                :for="token.name"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Presale name
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.name"
                  placeholder="Name"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <label
                v-if="error.tokenName !== ''"
                class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.tokenName }}
              </span>
            </label>
          </div>
          <div class="block mt-4">
            <label
                :for="token.softcap"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Softcap in BNB
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.softcap"
                  placeholder="Softcap"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.hardcap"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Hardcap in BNB
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.hardcap"
                  placeholder="Hardcap"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.totalTokens"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Total tokens
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="token.totalTokens"
                  placeholder="Total tokens"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div v-if="divideTokens" class="block mt-4">
            <label
                :for="token.tokenPresaleAllocation"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token Presale Allocation
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="token.tokenPresaleAllocation"
                  placeholder="Token presale allocation"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div v-if="burnTokens" class="block mt-4">
            <label
                :for="token.presaleTokenPrice"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Presale token price
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.presaleTokenPrice"
                  placeholder="Presale token price"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div v-if="maxAmountOfTokens" class="block mt-1 text-left text-yellow-500">
              <p>{{maxAmountOfTokens}}</p>
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.startDate"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Start date
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="date"
                  v-model="token.startDate"
                  placeholder="Start date"
                  class="w-1/2 mt-2 mb-2 flex-1 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
              <vue-timepicker
                  class="w-1/2 mt-2 flex-1 ml-4 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700"
                  v-model="token.startDateTime"/>
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.endDate"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              End date
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="date"
                  v-model="token.endDate"
                  placeholder="End date"
                  class="w-1/2 mt-2 mb-2 flex-1 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
              <vue-timepicker
                  class="w-1/2 mt-2 flex-1 ml-4 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700"
                  v-model="token.endDateTime"/>
            </div>
          </div>
          <div v-if="tokensPerBNB" class="block mt-5 text-left">
            <span class="text-yellow-500">
              {{tokensPerBNB}}
            </span>
            <span class="block mt-1 text-yellow-500">
              {{BNBPerToken}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueTimepicker from 'vuejs-timepicker'
export default {
  name: 'presale.TokenAddress.components',
  props: {
    account: String,
    token: Object,
    divideTokens: Boolean,
    burnTokens: Boolean,
  },
  components: {
    VueTimepicker
  },
  data: () => ({
    tokensPerBNB: null,
    BNBPerToken: null,
    maxAmountOfTokens: null,
    error: {
      tokenAddress: '',
      burnTokenAddress: '',
      tokenName: '',
    }
  }),
  watch: {
    token: {
      handler() {
        if (this.token.hardcap !== null && this.token.tokenPresaleAllocation !== null) {
          const tokenPerBNB = this.token.tokenPresaleAllocation / this.token.hardcap;
          this.tokensPerBNB = `${tokenPerBNB} tokens per BNB`;
          this.token.tokensPerBNB = tokenPerBNB;

          const BNBPerToken = this.token.hardcap / this.token.tokenPresaleAllocation;
          this.BNBPerToken =`${BNBPerToken} BNB per token`;
        } else {
          this.tokensPerBNB = null;
        }

        if (this.token.hardcap !== null && this.token.presaleTokenPrice !== null) {
          const maxTokens = this.token.hardcap / parseFloat(this.token.presaleTokenPrice);

          if (maxTokens !== Infinity)
            this.maxAmountOfTokens = `Max amount of tokens that will be sold: ${maxTokens}`;
          else
            this.maxAmountOfTokens = `Max amount of tokens that will be sold: 0`;
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
