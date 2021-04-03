import Notification from '@/components/plugins/notifications/notification'

let vm = {}
export default {
  install(Vue, opts) {
    opts = {
      notification: {
        title: '',
        message: '',
        type: null,
      },
      show: false,
    };

    const notificationPlugin = Vue.extend( Notification );
    vm = new notificationPlugin({
      data: opts
    }).$mount();
    document.body.appendChild(vm.$el);

    Vue.prototype.$notifications = (title, message, type, showNotification) => {
      vm.notification.title = title;
      vm.notification.message = message;
      vm.notification.type = type;
      vm.show = showNotification;
    }
  },
}

