import {useQuery} from "react-query";
import {ApiService} from "../../network/core/ApiService.ts";
import {API_CACHE_TIME, API_ENDPOINTS} from "../../network/core/requests.ts";
import {IHousingResponse} from "./models.ts";

export const useHousingHook = () => {
    const {
        data: getHousingData,
        isLoading: housingDataLoading,
        refetch: refetchHousingData
    } = useQuery(
        API_ENDPOINTS.HOUSING,
        () => ApiService.getData<IHousingResponse>(API_ENDPOINTS.HOUSING),
        {cacheTime: API_CACHE_TIME}
    )

    return {
        getHousingData,
        housingDataLoading,
        refetchHousingData
    }
}
