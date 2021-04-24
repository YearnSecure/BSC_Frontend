<template>
  <div class="grid grid-cols-4 gap-4">
    <div>
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
    </div>
    <div class="col-span-3">
      <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
        {{ presale.name }} Token address:
        <a :href="`https://bscscan.com/address/${presale.TokenAddress}`" target="_blank" class="text-blue-500 hover:text-yellow-600 transiation duration-300">{{ presale.TokenAddress }}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PresaleData",
  props: {
    presale: Object
  },
  methods: {
    formatEpochDate: function(date) {
      return new Date(date * 1000).toLocaleString();
    },
  }
}
</script>


