// types/vue.d.ts

import { ImgProxyParams } from '~/types/imgProxy'

declare module '#app' {
    interface NuxtApp {
        $imgProxy(imageUrl: string, params?: ImgProxyParams, sign?: boolean): string
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $imgProxy(imageUrl: string, params?: ImgProxyParams, sign?: boolean): string
    }
}
