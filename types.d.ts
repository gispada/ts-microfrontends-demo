declare module '*.png'

declare module '*.vue'

// Workaround to avoid importing Vue types when connecting packages with "paths"
// @vue/runtime-dom modifies the global JSX namespace, conflicting with React
// Is there a better solution?
declare module 'product/mount' {
  export default function mount(el: HTMLElement | string, params?: { productId?: string }): () => void
}

// Same problem here. This file is `.js` to avoid importing vue types and getting JSX conflicts.
declare module 'shared/components-vue'

declare namespace tsmfe {
  type Package = {
    name: 'container' | 'account' | 'dashboard' | 'product' | 'shared'
    cors?: boolean
  }

  type RemotesMap = Record<Package['name'], { url: string }>
}
