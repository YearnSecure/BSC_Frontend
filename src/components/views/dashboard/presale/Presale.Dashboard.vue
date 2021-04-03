<template>
  <div id="presale--dashboard">
    <!-- Pinned projects -->
    <div class="px-4 mt-6 sm:px-6 lg:px-8">
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Presales</h2>
      <ul v-if="presales.length > 0" class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3">
        <li v-for="(presale, key) in presales" class="relative grid-cols-3 shadow-sm" :key="key">
          <div class="flex-root pt-2 pb-2 pl-6 rounded-tl-lg rounded-tr-lg bg-yellow-500">
            <img class="h-8 inline-block" src="/assets/images/logo.svg">
            <h1 class="inline-block pl-5">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">{{ presale.token_name }} - {{ presale.company_name }}</span>
            </h1>
          </div>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-bl-lg rounded-br-lg bg-gray-50 border border-gray-200 dark:bg-gray-800">
            <div class="grid grid-cols-2 pt-3 pb-4">
              <div class="sm:col-span-1">
                <div class="sm:col-span-1 mt-3">
                  <dt class="text-sm font-medium text-gray-900 dark:text-gray-300">
                    You've deposited
                    <span class="text-yellow-500 text-xs">
                        [Amount ETH]
                    </span>
                  </dt>
                </div>
                <div class="sm:col-span-1 mt-3">
                  <dt class="text-sm font-medium text-gray-900 dark:text-gray-300">
                    Your
                    <span class="text-yellow-500 text-xs">
                        [presale holder currency]
                    </span>
                  </dt>
                </div>
                <div class="sm:col-span-1 mt-3">
                  <dt class="text-sm font-medium text-gray-900 dark:text-gray-300">
                    Total ETH deposited
                    <span class="text-yellow-500 text-xs">
                        [Amount ETH]
                    </span>
                  </dt>
                </div>
                <div class="sm:col-span-1 mt-3">
                  <dt class="text-sm font-medium text-gray-900 dark:text-gray-300">
                    Total presale depositors
                    <span class="text-yellow-500 text-xs">
                        [depositors]
                    </span>
                  </dt>
                </div>
                <div class="sm:col-span-1 mt-3">
                  <dt class="text-sm font-medium text-gray-900 dark:text-gray-300">
                    Total presale
                    <span class="text-yellow-500 text-xs">
                        [presale holder currency]
                    </span>
                  </dt>
                </div>
              </div>
              <div class="sm:col-span-1">
                <Chart class="pl-5" style="height: 300px;" :chartData="presale.chartData" :options="options" />
              </div>
            </div>
            <div class="sm:col-span-1 text-center pb-6">
              <div class="relative pt-1">
                <dt class="text-lg font-medium text-gray-900 dark:text-gray-300 pb-2">
                  25 ETH Raised
                </dt>
                <div class="overflow-hidden h-5 mb-4 text-xs flex rounded-lg bg-gray-300">
                  <div style="width: 20%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-600"></div>
                  <div style="width: 2%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"></div>
                </div>
                <div class="flex">
                  <div class="flex-1">
                    <button class="bg-yellow-600 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2  shadow hover:shadow-md outline-none focus:outline-none mr-1 pt-5" type="button" style="transition: all .15s ease">
                    </button>
                    <span class="text-gray-900 dark:text-gray-300">
                      softcap
                    </span>
                   </div>
                   <div class="flex-1">
                      <button class="bg-yellow-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2  shadow hover:shadow-md outline-none focus:outline-none mr-1 pt-5" type="button" style="transition: all .15s ease">
                    </button>
                    <span class="text-gray-900 dark:text-gray-300">
                      total raised
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-1 text-center pt-5 pb-6">
              <button class="rounded-full py-2 px-10 bg-yellow-500 text-white">Deposit</button>
            </div>
          </div>
        </li>
      </ul>
      <img class="w-1/3 mx-auto mt-10" v-if="presales.length <= 0" src="/assets/images/empty-state.svg" />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/views/dashboard/presale/charts/Presale.Chart'

export default {
  name: 'presale.presale.dashboard.views.components',
  props: {
    presales: Array,
    chartData: Object,
    options: Object,
  },
  components: {
    Chart
  },
}
</script>