import { defineNuxtPlugin } from '#app'
import { configureContentService } from '~/composables/content/useContentService'
import { NuxtContentProvider } from '~/composables/content/nuxtContentProvider'
import { HeadlessCmsProvider } from '~/composables/content/headlessCmsProvider'

/**
 * Plugin to initialize the content service
 */
export default defineNuxtPlugin(() => {
  // Configure the content service with the default providers
  configureContentService({
    defaultProvider: 'nuxtContent',
    providers: {
      nuxtContent: new NuxtContentProvider(),
      headlessCms: new HeadlessCmsProvider()
    }
  })
  
  // Log that the content service has been initialized
  console.log('Content service initialized')
})