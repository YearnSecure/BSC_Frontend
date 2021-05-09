
<template>
  <div class="block">
    <span class="block text-1xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">TEAM Information</span>
    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Socials</span>
    <div class="grid mt-3">
      <div v-if="presale.Website" class="flex truncate">
        <svg class="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" clip-rule="evenodd"></path>
        </svg>
        <span  class="text-gray-900 dark:text-white pl-3 pr-3">Website: </span>
        <a :href="presale.Website" target="_blank" class="text-blue-500">{{ presale.Website}}</a>
      </div>
      <div v-if="presale.Telegram" class="flex truncate">
        <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="m.415 11.196 5.869 2.925c.227.112.495.104.712-.023l5.224-3.037-3.162 2.802c-.161.143-.253.347-.253.562v6.825c0 .72.919 1.023 1.35.451l2.537-3.373 6.274 3.573c.44.253 1.004-.001 1.106-.504l3.913-19.5c.117-.586-.466-1.064-1.008-.846l-22.5 8.775c-.604.236-.643 1.081-.062 1.37zm21.83-8.249-3.439 17.137-5.945-3.386c-.324-.185-.741-.103-.971.201l-1.585 2.107v-4.244l8.551-7.576c.677-.599-.101-1.664-.874-1.21l-11.39 6.622-3.992-1.989z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-900 dark:text-white pl-3 pr-3">Telegram: </span>
        <a :href="presale.Telegram" target="_blank" class="text-blue-500">{{ presale.Telegram }}</a>
      </div>
      <div v-if="presale.Twitter" class="flex truncate">
        <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="m21.534 7.113c.976-.693 1.797-1.558 2.466-2.554v-.001c-.893.391-1.843.651-2.835.777 1.02-.609 1.799-1.566 2.165-2.719-.951.567-2.001.967-3.12 1.191-.903-.962-2.19-1.557-3.594-1.557-2.724 0-4.917 2.211-4.917 4.921 0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147-.424.737-.674 1.58-.674 2.487 0 1.704.877 3.214 2.186 4.089-.791-.015-1.566-.245-2.223-.606v.054c0 2.391 1.705 4.377 3.942 4.835-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428-1.674 1.309-3.8 2.098-6.101 2.098-.403 0-.79-.018-1.177-.067 2.18 1.405 4.762 2.208 7.548 2.208 8.683 0 14.342-7.244 13.986-14.637z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-900 dark:text-white pl-3 pr-3">Twitter: </span>
        <a :href="presale.Twitter" target="_blank" class="text-blue-500">{{ presale.Twitter }}</a>
      </div>
      <div v-if="presale.Medium" class="flex truncate">
        <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="m22.085 4.733 1.915-1.832v-.401h-6.634l-4.728 11.768-5.379-11.768h-6.956v.401l2.237 2.693c.218.199.332.49.303.783v10.583c.069.381-.055.773-.323 1.05l-2.52 3.054v.396h7.145v-.401l-2.52-3.049c-.273-.278-.402-.663-.347-1.05v-9.154l6.272 13.659h.729l5.393-13.659v10.881c0 .287 0 .346-.188.534l-1.94 1.877v.402h9.412v-.401l-1.87-1.831c-.164-.124-.249-.332-.214-.534v-13.467c-.035-.203.049-.411.213-.534z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-900 dark:text-white pl-3 pr-3">Medium: </span>
        <a :href="presale.Medium" target="_blank" class="text-blue-500">{{ presale.Medium }}</a>
      </div>
      <div v-if="presale.Github" class="flex truncate">
        <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-900 dark:text-white pl-3 pr-3">Github: </span>
        <a :href="presale.Github" target="_blank" class="text-blue-500">{{ presale.Github }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamInformation.vue",
  props: {
    presale: Object,
  }
}
</script>
