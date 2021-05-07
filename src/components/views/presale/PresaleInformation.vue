<template>
  <div class="block mt-8">
    <div class="grid">
      <div>
        <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Presale information</span>
        <div class="grid gap-1 mt-3">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Hardcap:</span>
            <a href="#" class="text-blue-500">{{ presale.Hardcap }}</a>
            <span class="text-yellow-500 pl-2">BNB</span>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Softcap:</span>
            <a href="#" class="text-blue-500">{{ presale.Softcap }}</a>
            <span class="text-yellow-500 pl-2">BNB</span>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Total deposited currently:</span>
            <a href="#" class="text-blue-500">{{ presale.TotalContributed }}</a>
            <span class="text-yellow-500 pl-2">BNB</span>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Your current investment:</span>
            <a href="#" class="text-blue-500">{{ presale.UserContribution }}</a>
            <span class="text-yellow-500 pl-2">BNB</span>
          </div>
        </div>
        <div class="grid gap-1 mt-1">
          <div class="flex">
            <span class="text-gray-900 dark:text-white pr-5">Estimated return:</span>
            <a href="#" class="text-blue-500">{{ presale.Roi }} </a>
            <span class="text-yellow-500 pl-2">{{ presale.TokenName }} </span>
          </div>
        </div>
      </div>
      <div class="block mt-2">
                    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">
                      Progress
                    </span>
        <div class="overflow-hidden h-5 mt-2 text-center text-xs flex rounded bg-gray-400">
          <div :style="progressStyle" class="h-5 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
        </div>
        <div class="block text-center text-gray-900 dark:text-white">
          <p>{{progressPercentage}}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PresaleInformation",
  props: {
    presale: Object,
    progressPercentage: String,
    progressStyle: String,
  }
}
</script>

<style scoped>

</style>