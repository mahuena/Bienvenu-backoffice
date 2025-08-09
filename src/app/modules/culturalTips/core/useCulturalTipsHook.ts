import {useQuery} from "react-query";
import {ApiService} from "../../network/core/ApiService.ts";
import {API_CACHE_TIME, API_ENDPOINTS} from "../../network/core/requests.ts";
import {ICulturalTipResponse} from "./models.ts";

export const useCulturalTipsHook = () => {
    const {
        data: getCulturalTipsData,
        isLoading: culturalTipsDataLoading,
        refetch: refetchCulturalTipsData
    } = useQuery(
        API_ENDPOINTS.CULTURAL_TIPS,
        () => ApiService.getData<ICulturalTipResponse>(API_ENDPOINTS.CULTURAL_TIPS),
        {cacheTime: API_CACHE_TIME}
    )

    return {
        getCulturalTipsData,
        culturalTipsDataLoading,
        refetchCulturalTipsData
    }
}
