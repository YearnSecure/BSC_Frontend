<template>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
            <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <div class="grid grid-cols-4 gap-4">
                <div>
                  <h1>
                    <span class="mt-2 block text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-2xl">TOKEN NAME</span>
                    <span class="block text-base text-white font-semibold tracking-wide uppercase">[TEAM NAME]</span>
                  </h1>
                </div>
                <div class="col-span-3">
                  [TEAM NAME] token address
                </div>
              </div>
            </div>
            <div class="relative p-6 flex-auto">
              <p class="my-4 text-gray-600 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main
                thing people are controlled by! Thoughts- their perception
                of themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you
                won’t do anything. I was taught I could do everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

  export default {
    name: 'modals.presale.components',
    props: {
      presale: Object,
    },
    components: {
    }
  };
</script>
