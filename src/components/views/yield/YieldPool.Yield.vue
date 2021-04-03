:<template>
  <div id="yield">
    <div class="block px-4 mt-6 sm:px-6 lg:px-8">
      <ul class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3">
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.totalYsecStaked }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Total $YSEC staked</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.accountYsecStaked }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Your $YSEC staked</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.rewards }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Rewards (in ETH)</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.ETHPool }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">ETH in pool</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.preSales }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Presale(s) launched</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.participants }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Participant(s)</span>
            </h1>
          </div>
        </li>
      </ul>
    </div>
    <div class="block px-4 mt-6 sm:px-6 lg:px-8" v-if="!showApproveButton">
      <div class="block">
        <p class="text-gray-700 dark:text-white">Your balance: {{yieldPoolAmount}} YSEC</p>
        <input
            type="text"
            v-model="amount"
            min="0"
            placeholder="Amount"
            class="w-10/12 flex mt-2 mb-2 px-3 py-1 rounded-lg
              text-gray-600 dark:text-gray-300
              border border-transparent
              focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
              bg-gray-100 dark:bg-gray-700">
        <button v-if="isVisible" v-on:click="stake" class="flex py-2 px-4 m-auto rounded bg-yellow-500 hover:bg-yellow-600">
          <span class="flex text-white">Stake</span>
        </button>
      </div>
      <div class="block mt-10">
        <div class="w-1/2">
          <div class="flex">
            <button
                v-if="yieldPool.rewards && yieldPool.rewards > 0"
                v-on:click="claim" class="flex-1 text-center py-2 px-4 m-auto rounded bg-yellow-500 hover:bg-yellow-600">
              <span class="text-white">Claim</span>
            </button>
            <button v-if="yieldPool.accountYsecStaked && yieldPool.accountYsecStaked > 0"
                    v-on:click="unStake" class="flex-1 ml-3 py-2 px-4 m-auto rounded bg-transparent border border-white hover:bg-yellow-500 hover:border-yellow-500 hover:text-yellow-500">
              <span class="text-white">Unstake</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="block px-4 mt-6 sm:px-6 lg:px-8" v-else-if="showApproveButton">
      <div class="w-1/2">
        <div class="flex">
          <button v-on:click="approve" class="flex-1 text-center py-2 px-4 m-auto rounded bg-yellow-500 hover:bg-yellow-600">
            <span class="text-white">Approve wallet</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Yield.views.components',
  props: {
    yieldPool: Object,
    chartData: Object,
    options: Object,
    account: String,
    showApproveButton: Boolean,
    yieldPoolAmount: String,
  },
  data: () => ({
    amount: "",
    isVisible: null,
    provider: window.ethereum,
  }),
  methods: {
    stake: function() {
      this.$emit('stake', this.amount);
    },
    unStake: function() {
      this.$emit('unStake');
    },
    claim: function() {
      this.$emit('claim');
    },
    approve: function() {
      this.$emit('approve');
    }
  },
  watch: {
    amount: {
      handler: function() {
        this.isVisible = !!Number(this.amount > 0);
      }
    }
  }
}
</script>
