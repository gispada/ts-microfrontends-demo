declare module 'interpolate-html-plugin' {
  export default class InterpolateHtmlPlugin {
    constructor(config: object)
    apply(): void
  }
}

declare module "*.png"

declare module "*.vue"

// Workaround to avoid importing Vue types when connecting packages with "paths"
// @vue/runtime-dom modifies the global JSX namespace, conflicting with React
// Is there a better solution?
declare module 'product/mount' {
  export default function mount(el: HTMLElement, params: { productId?: string }): () => void
}

declare namespace tsmfe {
  type Package = {
    name: 'container' | 'account' | 'dashboard' | 'product' | 'shared'
    cors?: boolean
  }

  type RemotesMap = Record<Package['name'], { url: string }>
}
