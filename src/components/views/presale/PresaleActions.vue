<template>
<div v-if="this.account != 0">
  <div v-if="
    Number(presale.CurrentStep) === 0 &&
    account.toLowerCase() === presale.TokenOwnerAddress.toLowerCase() &&
    allowanceState < presale.TotalTokenAmount">
    <div class="block text-center mt-10">
      <button v-on:click="approveCall()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Approve
      </button>
    </div>
  </div>
  <div v-if="
    Number(presale.CurrentStep) === 0 &&
    account.toLowerCase() === presale.TokenOwnerAddress.toLowerCase() &&
    allowanceState.toString() === presale.TotalTokenAmount.toString()">
    <div class="block text-center mt-10">
      <button v-on:click="transferTokens()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Transfer Tokens
      </button>
    </div>
  </div>
  <div v-if="Number(presale.CurrentStep) === 1 && !presale.finished && presale.started">
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
  <div v-if="Number(presale.CurrentStep) === 1 && !presale.SoftcapMet && presale.finished">
    <div class="block text-center mt-10">
      <button v-on:click="retrieveBNB()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Retrieve BNB
      </button>
    </div>
  </div>
  <div v-if="
    Number(presale.CurrentStep) === 1 &&
    !presale.SoftcapMet &&
    presale.finished &&
    account.toString().toLowerCase === presale.TokenOwnerAddress.toString().toLowerCase">
    <div class="block text-center mt-10">
      <button v-on:click="retrieveTokensOwner()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Retrieve Tokens
      </button>
    </div>
  </div>
  <div v-if="Number(presale.CurrentStep) === 1 && presale.SoftcapMet && presale.finished">
    <div class="block text-center mt-10">
      <button v-on:click="transferTokensToLocks()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Transfer Tokens
      </button>
    </div>
  </div>

  <div v-if="Number(presale.CurrentStep) === 2">
    <div class="block text-center mt-10">
      <button v-on:click="addLiquidity()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Add Pancakeswap Liquidity
      </button>
    </div>
  </div>
  <div v-if="Number(presale.CurrentStep) === 3 && !tokensClaimed">
    <div class="block text-center mt-10 pr-6">
      <button v-on:click="goBack()" class="py-2 p-4 mr-4 bg-yellow-500 text-white rounded-3xl">
        Go Back
      </button>
      <button v-on:click="claimTokens()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Claim Tokens
      </button>
    </div>
      <div class="block text-center mt-10">
    </div>
  </div>
  <div v-if="Number(presale.CurrentStep) === 3 && presale.BNBDistributable">
    <div class="block text-center mt-10">
      <button v-on:click="distributeBNB()" class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
        Distribute BNB
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "PresaleActions",
  props: {
    presale: Object,
    allowanceState: String,
    account: String,
    tokensClaimed: Boolean,
  },
  data() {
    return {
      contribution: "",
    }
  },
  methods: {
    approveCall: function() {
      this.$emit('approveCall');
    },
    transferTokens: function() {
      this.$emit('transferTokens');
    },
    contributeTokens: async function(contribution) {
      this.contribution = "";
      await this.$emit('contributeTokens', contribution);
    },
    goBack: function() {
     this.$router.go(-1);
    },
    retrieveBNB: function() {
      this.$emit('retrieveBNB');
    },
    retrieveTokensOwner: function() {
      this.$emit('retrieveTokensOwner');
    },
    transferTokensToLocks: function() {
      this.$emit('transferTokensToLocks');
    },
    addLiquidity: function() {
      this.$emit('addLiquidity');
    },
    claimTokens: function() {
      this.$emit('claimTokens');
    },
    distributeBNB: function() {
      this.$emit('distributeBNB');
    }
  }
}
</script>
