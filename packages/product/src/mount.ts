import { createApp } from 'vue'
import { Button, PageHeader, Tag, Rate, Row, Statistic, Spin, Col } from 'ant-design-vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'

type ProductParams = {
  productId: string
}

function mount(el: HTMLElement, params: ProductParams) {
  const app = createApp(App, params)
    .use(Button)
    .use(PageHeader)
    .use(Tag)
    .use(Rate)
    .use(Row)
    .use(Col)
    .use(Statistic)
    .use(Spin)

  app.mount(el)

  return function unmount() {
    app.unmount()
  }
}

export default mount
