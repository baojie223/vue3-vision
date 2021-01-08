import { Button, Form, InputNumber, Menu } from 'ant-design-vue'

const components = [Button, Menu, Form, InputNumber]

const antd = {
  install(app) {
    components.forEach(component => app.use(component))
  },
}

export default antd
