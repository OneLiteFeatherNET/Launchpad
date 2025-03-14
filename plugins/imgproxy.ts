// plugins/imgProxy.ts

import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import crypto from 'crypto'
import { ImgProxyParams, keyMap } from '~/types/imgProxy'

function createPath(imageUrl: string, params: ImgProxyParams): string {
    const paramsArray = Object.entries(params).map(([key, value]) => `${keyMap[key as keyof ImgProxyParams]}:${value}`)
    const paramsString = paramsArray.join('/')
    const path = paramsString ? `/${paramsString}/${imageUrl}` : `/${imageUrl}`
    return Buffer.from(path).toString('base64url')
}

function signUrl(url: string, key: string, salt: string, baseUrl: string): string {
    const keyBuffer = Buffer.from(key, 'base64')
    const saltBuffer = Buffer.from(salt, 'base64')
    const hmac = crypto.createHmac('sha256', keyBuffer)
    hmac.update(saltBuffer)
    hmac.update(url)
    const signature = hmac.digest('base64url')
    return `${baseUrl}/${signature}/${url}`
}

function generateUrl(imageUrl: string, params: ImgProxyParams, options: { sign?: boolean, key?: string, salt?: string, baseUrl: string }): string {
    const path = createPath(imageUrl, params)
    if (options.sign && options.key && options.salt) {
        return signUrl(path, options.key, options.salt, options.baseUrl)
    }
    return `${options.baseUrl}/${path}`
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const imgProxyUrl = config.public.IMGPROXY_URL as string
    const imgProxyKey = config.public.IMGPROXY_KEY as string
    const imgProxySalt = config.public.IMGPROXY_SALT as string

    nuxtApp.provide('imgProxy', (imageUrl: string, params: ImgProxyParams = {}, sign: boolean = true) => {
        return generateUrl(imageUrl, params, { sign, key: imgProxyKey, salt: imgProxySalt, baseUrl: imgProxyUrl })
    })
})
