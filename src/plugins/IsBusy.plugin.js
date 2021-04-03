import Loading from '@/components/plugins/is-busy/IsBusy.is-busy'

let vm = {}
export default {
  install(Vue, opts) {
    opts = {
      loading: false
  };

    const loadingPlugin = Vue.extend( Loading );
    vm = new loadingPlugin({
      data: opts
    }).$mount();

    document.body.appendChild(vm.$el);

    Vue.prototype.$loading = (loading) => vm.loading = loading;
  },
}


