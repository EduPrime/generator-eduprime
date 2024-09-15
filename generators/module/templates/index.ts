import type { App } from 'vue'
import routes from './<%= routesFile %>'
import <%= serviceName %> from './services/<%= serviceName %>'
import <%= componentName %> from './components/<%= componentName %>.vue'

export default {
  install(app: App) {
    app.component('<%= componentName %>', <%= componentName %>)
    app.config.globalProperties.$<%= serviceInstanceName %> = new <%= serviceName %>()
  },
  routes,
}
