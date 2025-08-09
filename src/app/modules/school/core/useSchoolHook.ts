import {useQuery} from "react-query";
import {ApiService} from "../../network/core/ApiService.ts";
import {API_CACHE_TIME, API_ENDPOINTS} from "../../network/core/requests.ts";
import {ISchoolResponse} from "./models.ts";

export const useSchoolHook = () => {
    const {
        data: getSchoolData,
        isLoading: schoolDataLoading,
        refetch: refetchSchoolData
    } = useQuery(
        API_ENDPOINTS.SCHOOLS,
        () => ApiService.getData<ISchoolResponse>(API_ENDPOINTS.SCHOOLS),
        {cacheTime: API_CACHE_TIME}
    )

    return {
        getSchoolData,
        schoolDataLoading,
        refetchSchoolData
    }
}
