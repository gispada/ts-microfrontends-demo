import { createApp } from 'vue'
import { Button, PageHeader, Tag, Rate, Row, Col, Statistic, Spin } from 'shared/components-vue'
import App from './App.vue'

type ProductParams = {
  productId: string
}

function mount(el: HTMLElement, params: ProductParams) {
  const app = createApp(App, params)
    .use(Spin)
    .use(Button)
    .use(PageHeader)
    .use(Tag)
    .use(Rate)
    .use(Row)
    .use(Col)
    .use(Statistic)

  app.mount(el)

  return function unmount() {
    app.unmount()
  }
}

export default mount
