import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import type { App } from 'vue'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Create plugin options
const vueQueryPluginOptions = {
  queryClient
}

export function installVueQuery(app: App) {
  app.use(VueQueryPlugin, vueQueryPluginOptions)
}

export { queryClient }
