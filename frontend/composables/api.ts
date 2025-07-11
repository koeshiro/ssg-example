import { Configuration, DefaultApi } from "../api/backend"

export const useApi = () => {
    const config = useRuntimeConfig()
    return {
        backend: new DefaultApi(new Configuration({ basePath: String(config.public.publicApiBaseUrl ?? '') }))
    }
}