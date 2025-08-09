import {deleteByApi, fetchFromApi, postByApi, putByApi} from "./requests.ts";

export class ApiService {
    static async getData<T>(
        endpoint: string,
    ) {
        return await fetchFromApi<T>(
            {
                endpoint: endpoint
            }
        )
    }

    static async postData<T>(
        endpoint: string,
        data: T
    ) {
        return await postByApi<T>(
            {
                endpoint: endpoint,
                data: data
            }
        )
    }

    static async putData<T>(
        endpoint: string,
        data: T,
        dataId: string,
    ) {
        return await putByApi<T>(
            {
                endpoint: endpoint
            },
            data,
            dataId
        )
    }

    static async deleteData(
        endpoint: string,
        dataId: string
    ) {
        return await deleteByApi(
            {
                endpoint: endpoint
            },
            dataId
        )
    }
}
