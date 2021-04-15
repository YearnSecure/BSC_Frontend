<template>
  <div id="presale--table" >
    <div class="mt-8 sm:block pt-4 px-4 sm:px-6 lg:px-8">
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Presale list</h2>
        <div v-if="presales.length > 0" class="align-middle inline-block min-w-full mt-3 border-b border-l border-r border-gray-200">
          <table class="min-w-full">
            <thead>
              <tr class="border-t border-gray-200">
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Start date
                </th>
                <th class="px-6 py-3 border-b border-gray-200 text-left bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  End date
                </th>
                <th class="px-6 py-3 border-b border-gray-200 text-left bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Liquidity locked
                </th>
                <th class="px-6 py-3 border-b border-gray-200 text-left bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tokens locked
                </th>
                <th class="px-6 py-3 border-b border-gray-200 text-left bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Softcap
                </th>
                <th class="px-6 py-3 border-b border-gray-200 text-left bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Hardcap
                </th>
                <th class="px-6 py-3 border-b border-gray-200 text-left bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Contributed BNB
                </th>
                <th class="pr-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
                <th class="pr-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-100">
              <tr v-for="(presale, key) in presales" :key="key">
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.name }}
                        <br>
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ formatDate(presale.startDate) }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ formatDate(presale.endDate) }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.liquidityPercentage }}%
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ parseToWei(presale.amountOfTokensLocked) }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.softcapInEth }} BNB
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                       {{ presale.hardcapInEth }} BNB
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                       {{ presale.contributedEth }} BNB
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium">
                  <div class="flex items-center space-x-3">
                      <button v-on:click="showPresale(presale)" class="bg-yellow-500 rounded pl-3 pr-3 pt-2 pb-2 text-white">View</button>
                  </div>
                </td>
<!--                <td class="px-6 py-3 text-sm font-medium">-->
<!--                  <div class="flex items-center space-x-3">-->
<!--                    <button v-on:click="pinPresale(presale)" class="bg-purple-800 rounded pl-3 pr-3 pt-2 pb-2 text-white">Pin</button>-->
<!--                  </div>-->
<!--                </td>-->
              </tr>
            </tbody>
          </table>
        </div>
      <img class="w-1/3 mx-auto mt-10" v-if="presales.length <= 0" src="/assets/images/empty-state.svg" />
      </div>
  </div>
</template>

<script>

export default {
  name: 'presale.table.presale.dashboard.views.components',
  props: { 
    presales: Array
  },
  data: () => ({
    presale: {},
  }),
  methods: {
    parseToWei: function(eth) {
      return eth;
    },
    showPresale: function(presale) {
      this.$store.state.presale = presale;
      this.$router.push({ name: 'presale.show', params: {id: presale.presaleId} });
    },
    pinPresale: function(presale) {
      this.$emit('pinPresale', presale);
    },
    formatDate: function(date) {
      return new Date(date).toUTCString();
    }
  }
}
</script>

<style>

</style>