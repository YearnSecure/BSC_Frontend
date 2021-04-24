<template>
  <div>
    <span class="block text-1xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">Token allocation</span>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1" v-for="(allocation, index) in presale.Allocations" :key="index">
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
            <a :href="`https://bscscan.com/address/${presale.TokenTimeLock}`" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400" >
              {{ truncateString(presale.TokenTimeLock, 10) }}
            </a>
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
            <a :href="`https://bscscan.com/address/${presale.TokenTimeLock}`" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400" >
              {{ truncateString(presale.TokenTimeLock, 10) }}
            </a>
          </span>
        </div>
        <hr class="mt-3 mb-3">
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";

export default {
  name: "TokenAllocations",
  props: {
    presale: Object,
    web3: Object,
  },
  methods: {
    formatEpochDate: function(date) {
      return new Date(date * 1000).toLocaleString();
    },
    formatFromWei: function(wei) {
      return this.web3.utils.fromWei(wei.toString());
    },
    truncateString: function(str, num) {
      if (str !== undefined) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    },
  }
}
</script>
