import React, {useState} from "react";
import {defaultHousingModel, housingFormSchema, IHousingModel} from "./core/models.ts";
import {usePageSearchHelpers} from "../../../_metronic/helpers/usePageSearchHelpers.ts";
import {HousingColumns} from "./components/HousingColumns.tsx";
import {ModalViewType} from "../../../_metronic/helpers/GlobalHelpers.ts";
import {CommonLayout} from "../../../_metronic/helpers/components/CommonLayout.tsx";
import {useFormik} from "formik";
import {HousingForm} from "./components/HousingForm.tsx";
import {useHousingHook} from "./core/useHousingHook.ts";
import {useMutation} from "react-query";
import {message} from "antd";
import {API_ENDPOINTS} from "../network/core/requests.ts";
import {ApiService} from "../network/core/ApiService.ts";

const Housings = () => {
    const [sidebarViewType, setSidebarViewType] = useState<ModalViewType>(ModalViewType.NONE);
    const [housingData, setHousingData] = useState<IHousingModel>(defaultHousingModel);
    const [showModal, setShowModal] = useState<ModalViewType>(ModalViewType.NONE);

    const {getHousingData, refetchHousingData, housingDataLoading} = useHousingHook()
    console.log('getHousingData', getHousingData)

    const {
        filteredData, setSearchText, searchText
    } = usePageSearchHelpers<IHousingModel>(getHousingData?.data ?? []);

    const showSidebar = (
        sideBarType: ModalViewType = ModalViewType.ADD,
        data: IHousingModel = defaultHousingModel,
    ) => {
        setSidebarViewType(sideBarType);
        setHousingData(data);
    };

    const housingColumns = HousingColumns({
        onEdit: (data) => {
            showSidebar(ModalViewType.EDIT, data)
        },
        onDelete: (data) => {
            setHousingData(data)
            setShowModal(ModalViewType.DELETE)
        },
    })

    const formik = useFormik({
        initialValues: housingData,
        enableReinitialize: true,
        validationSchema: housingFormSchema,
        onSubmit: (values) => {
            console.log('Form values before saving:', values);
            saveHousing(values)
        },
    });

    const {mutate: saveHousing, isLoading: isSaving} = useMutation(
        (data: IHousingModel) =>
            sidebarViewType === ModalViewType.EDIT && housingData?.id
                ? ApiService.putData(API_ENDPOINTS.HOUSING, data, housingData.id)
                : ApiService.postData(`${API_ENDPOINTS.HOUSING}`, data),
        {
            onSuccess: () => {
                refetchHousingData().then()
                message.success('Housing saved successfully').then()
                setSidebarViewType(ModalViewType.NONE)
            },
            onError: () => {
                message.error('Failed to save data').then();
            }
        }
    )

    const {mutate: deleteHousing, isLoading: isDeleting} = useMutation(
        (id: string) => ApiService.deleteData(API_ENDPOINTS.HOUSING, id),
        {
            onSuccess: () => {
                refetchHousingData().then()
                message.success('Housing deleted successfully').then()
                setShowModal(ModalViewType.NONE)
            },
            onError: () => {
                message.error('Failed to delete data').then();
            }
        }
    )

    return (
        <CommonLayout
            columns={housingColumns}
            sidebarViewType={sidebarViewType}
            showSidebar={showSidebar}
            showModal={showModal}
            elemenName={''}
            formikInstance={formik}
            confirmDelete={() => deleteHousing(housingData.id)}
            handleClose={() => setShowModal(ModalViewType.NONE)}
            isLoading={housingDataLoading || isSaving || isDeleting}
            tableData={filteredData}
            componentData={housingData}
            formComponent={<HousingForm formik={formik}/>}
            colSize={'col-md-5'}
        />
    )
}

export default Housings;

