import { components } from '@/components/global/register'
const globalComponents = {
  install(app) {
    components.forEach(({ component }) => {
      app.component(component.name, component)
    })
  }
}

export default function bootComponents({ app }) {
  app.use(globalComponents)
}
