<template>
  <div class="block mt-8">
    <div class="grid">
      <div>
        <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Token information</span>
        <div class="grid gap-1 mt-3">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Liquidity locked:</span>
            <a href="#" class="text-blue-500">{{ presale.LiquidityLocked }}% of raised BNB</a>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Total tokens:</span>
            <a href="#" class="text-blue-500">{{ presale.TotalSupply }} {{ presale.TokenName }}</a>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Tokens in presale:</span>
            <a href="#" class="text-blue-500">{{ presale.TokensInPresale }} {{ presale.TokenName }}</a>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Token Liquidity:</span>
            <a href="#" class="text-blue-500">{{ presale.TokenLiquidity }} {{ presale.TokenName }}</a>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Price per token:</span>
            <a href="#" class="text-blue-500">{{ presale.TokenPrice }} BNB</a>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="block">
            <span class="text-gray-900 block dark:text-white pr-5">Listing price per token is: </span>
            <a href="#" class="block text-blue-500">{{ presale.listingTokenPrice }} (~ {{ presale.listingPrice }} times presale price)</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenInformation",
  props: {
    presale: Object,
  }
}
</script>
