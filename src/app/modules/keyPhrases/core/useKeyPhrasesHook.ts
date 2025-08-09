import {useQuery} from "react-query";
import {ApiService} from "../../network/core/ApiService.ts";
import {API_CACHE_TIME, API_ENDPOINTS} from "../../network/core/requests.ts";
import {IKeyPhrasesResponse} from "./models.ts";

export const useKeyPhrasesHook = () => {
    const {
        data: getKeyPhrasesData,
        isLoading: keyPhrasesDataLoading,
        refetch: refetchKeyPhrasesData
    } = useQuery(
        API_ENDPOINTS.KEY_PHRASES,
        () => ApiService.getData<IKeyPhrasesResponse>(API_ENDPOINTS.KEY_PHRASES),
        {cacheTime: API_CACHE_TIME}
    );

    return {
        getKeyPhrasesData,
        keyPhrasesDataLoading,
        refetchKeyPhrasesData
    };
};
