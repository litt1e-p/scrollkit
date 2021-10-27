import Scrollkit from './lib/index.vue'

const components = [Scrollkit]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install
export { Scrollkit } // if need to install as component
