import {AxiosError} from "axios";
import {message} from "antd";

type ErrorProps = {
    error: any
}
export const AxiosErrorMessage = ({error}: ErrorProps) => {
    const messageString = AxiosErrorText({error})
    return (message.error(messageString).then())
}

export const AxiosErrorText = ({error}: ErrorProps) => {
    const axiosError = error as AxiosError
    return axiosError.response?.data ? axiosError.response.data.toString() : axiosError.message
}