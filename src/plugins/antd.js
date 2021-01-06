import { Button, Menu } from 'ant-design-vue'

const components = [Button, Menu]

const antd = {
  install(app) {
    components.forEach(component => app.use(component))
  },
}

export default antd
