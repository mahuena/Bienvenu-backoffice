import React, {useState} from "react";
import {culturalTipFormSchema, defaultCulturalTipModel, ICulturalTipModel} from "./core/models.ts";
import {usePageSearchHelpers} from "../../../_metronic/helpers/usePageSearchHelpers.ts";
import {CulturalTipsColumns} from "./components/CulturalTipsColumns.tsx";
import {ModalViewType} from "../../../_metronic/helpers/GlobalHelpers.ts";
import {CommonLayout} from "../../../_metronic/helpers/components/CommonLayout.tsx";
import {useFormik} from "formik";
import {CulturalTipsForm} from "./components/CulturalTipsForm.tsx";
import {useCulturalTipsHook} from "./core/useCulturalTipsHook.ts";
import {useMutation} from "react-query";
import {message} from "antd";
import {API_ENDPOINTS} from "../network/core/requests.ts";
import {ApiService} from "../network/core/ApiService.ts";

const CulturalTips = () => {
    const [sidebarViewType, setSidebarViewType] = useState<ModalViewType>(ModalViewType.NONE);
    const [tipData, setTipData] = useState<ICulturalTipModel>(defaultCulturalTipModel);
    const [showModal, setShowModal] = useState<ModalViewType>(ModalViewType.NONE);

    const {getCulturalTipsData, refetchCulturalTipsData, culturalTipsDataLoading} = useCulturalTipsHook();

    const {
        filteredData, setSearchText, searchText
    } = usePageSearchHelpers<ICulturalTipModel>(getCulturalTipsData?.data ?? []);

    const showSidebar = (
        sideBarType: ModalViewType = ModalViewType.ADD,
        data: ICulturalTipModel = defaultCulturalTipModel,
    ) => {
        setSidebarViewType(sideBarType);
        setTipData(data);
    };

    const columns = CulturalTipsColumns({
        onEdit: (data) => showSidebar(ModalViewType.EDIT, data),
        onDelete: (data) => {
            setTipData(data);
            setShowModal(ModalViewType.DELETE);
        },
    });

    const formik = useFormik({
        initialValues: tipData,
        enableReinitialize: true,
        validationSchema: culturalTipFormSchema,
        onSubmit: (values) => {
            saveCulturalTip(values);
        },
    });

    const {mutate: saveCulturalTip, isLoading: isSaving} = useMutation(
        (data: ICulturalTipModel) =>
            sidebarViewType === ModalViewType.EDIT && tipData?.id
                ? ApiService.putData(API_ENDPOINTS.CULTURAL_TIPS, data, tipData.id)
                : ApiService.postData(`${API_ENDPOINTS.CULTURAL_TIPS}`, data),
        {
            onSuccess: () => {
                refetchCulturalTipsData().then();
                message.success('Cultural tip saved successfully').then();
                setSidebarViewType(ModalViewType.NONE);
            },
            onError: () => {
                message.error('Failed to save data').then();
            }
        }
    );

    const {mutate: deleteCulturalTip, isLoading: isDeleting} = useMutation(
        (id: string) => ApiService.deleteData(API_ENDPOINTS.CULTURAL_TIPS, id),
        {
            onSuccess: () => {
                refetchCulturalTipsData().then();
                message.success('Cultural tip deleted successfully').then();
                setShowModal(ModalViewType.NONE);
            },
            onError: () => {
                message.error('Failed to delete data').then();
            }
        }
    );

    return (
        <CommonLayout
            columns={columns}
            sidebarViewType={sidebarViewType}
            showSidebar={showSidebar}
            showModal={showModal}
            elemenName={''}
            formikInstance={formik}
            confirmDelete={() => tipData.id ? deleteCulturalTip(tipData.id) : undefined}
            handleClose={() => setShowModal(ModalViewType.NONE)}
            isLoading={culturalTipsDataLoading || isSaving || isDeleting}
            tableData={filteredData}
            componentData={tipData}
            formComponent={<CulturalTipsForm formik={formik}/>}
            colSize={'col-md-5'}
        />
    );
};

export default CulturalTips;
