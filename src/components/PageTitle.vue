:<template>
  <div id="page--title">
    <div class="px-4 mt-6 sm:px-6 lg:px-8">
      <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {{ title }}
        </h3>
<!--        <div class="mt-3 sm:mt-0 sm:ml-4">-->
<!--          <Search />-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
// import Search from '@/components/search/Form.search'

export default {
  name: 'pagetitle.components',
  props: {
    title: String
  },
  components: {
    // Search
  }
}
</script>

<style>

</style>