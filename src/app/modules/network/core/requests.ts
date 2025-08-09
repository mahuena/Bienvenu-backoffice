import axios from "axios";


export const BASE_SECURE = import.meta.env.VITE_APP_BASE_URL
export const BIENVENUE_URL = `${BASE_SECURE}/`
export const API_CACHE_TIME = 7000

export const API_ENDPOINTS = {
    HOUSING: 'housing/listings',
    SCHOOLS: 'school/listings',
    CULTURAL_TIPS: 'culture-tips/',
    KEY_PHRASES: 'key-phrases/',
}


type BaseProps = {
    endpoint: string
    params?: any
}

/*
* generic function of type <T> to post  data to the api
* takes in the endpoint,
* the data to be posted and
* */
export const postByApi = async <T>(
    {endpoint, data}: { endpoint: string, data: T },
) => {
    return axios.post(
        `${BIENVENUE_URL}${endpoint}`,
        data
    )
}

/*
* generic function of type <T> to put data to the api
* takes in the endpoint,
* the id of the data to be updated and
* the data to be updated
 */
export const putByApi = async <T>({endpoint}: BaseProps, data: T, dataId?: string) => {
    return axios.put(
        `${BIENVENUE_URL}${endpoint}/${dataId ? dataId : ''}/`,
        data
    )
}

/*
* generic function of type <T> to delete data from the api
* takes in the endpoint,
* the id of the data to be deleted*
 */
export const deleteByApi = async ({endpoint}: BaseProps, dataId: string) => {
    return axios.delete(
        `${BIENVENUE_URL}${endpoint}/${dataId}/`
    )
}

/*
*  generic function of type <T> to get data from the api
* takes in the endpoint
* */
export const fetchFromApi = async <T>({endpoint, params}: BaseProps,) => {
    const response = await axios.get<T>(
        `${BIENVENUE_URL}${endpoint}`,
        {
            params: params
        }
    )
    return response.data
}
