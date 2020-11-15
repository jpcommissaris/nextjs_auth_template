import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.API 

export const DOMAIN = publicRuntimeConfig.DOMAIN

export const MONGO = publicRuntimeConfig.MONGO

