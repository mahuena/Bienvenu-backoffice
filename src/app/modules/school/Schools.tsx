import React, {useState} from "react";
import {defaultSchoolModel, ISchoolModel, schoolFormSchema} from "./core/models.ts";
import {usePageSearchHelpers} from "../../../_metronic/helpers/usePageSearchHelpers.ts";
import {SchoolColumns} from "./components/SchoolColumns.tsx";
import {ModalViewType} from "../../../_metronic/helpers/GlobalHelpers.ts";
import {CommonLayout} from "../../../_metronic/helpers/components/CommonLayout.tsx";
import {useFormik} from "formik";
import {SchoolForm} from "./components/SchoolForm.tsx";
import {useSchoolHook} from "./core/useSchoolHook.ts";
import {useMutation} from "react-query";
import {message} from "antd";
import {API_ENDPOINTS} from "../network/core/requests.ts";
import {ApiService} from "../network/core/ApiService.ts";

const Schools = () => {
    const [sidebarViewType, setSidebarViewType] = useState<ModalViewType>(ModalViewType.NONE);
    const [schoolData, setSchoolData] = useState<ISchoolModel>(defaultSchoolModel);
    const [showModal, setShowModal] = useState<ModalViewType>(ModalViewType.NONE);

    const {getSchoolData, refetchSchoolData, schoolDataLoading} = useSchoolHook();

    const {
        filteredData, setSearchText, searchText
    } = usePageSearchHelpers<ISchoolModel>(getSchoolData?.data ?? []);

    const showSidebar = (
        sideBarType: ModalViewType = ModalViewType.ADD,
        data: ISchoolModel = defaultSchoolModel,
    ) => {
        setSidebarViewType(sideBarType);
        setSchoolData(data);
    };

    const columns = SchoolColumns({
        onEdit: (data) => showSidebar(ModalViewType.EDIT, data),
        onDelete: (data) => {
            setSchoolData(data);
            setShowModal(ModalViewType.DELETE);
        },
    });

    const formik = useFormik({
        initialValues: schoolData,
        enableReinitialize: true,
        validationSchema: schoolFormSchema,
        onSubmit: (values) => {
            const {createdAt, updatedAt, ...dataToSend} = values;
            if (!dataToSend.id) {
                delete dataToSend.id;
            }
            console.log('Form values before saving:', dataToSend);
            saveSchool(dataToSend);
        },
    });

    const {mutate: saveSchool, isLoading: isSaving} = useMutation(
        (data: ISchoolModel) =>
            sidebarViewType === ModalViewType.EDIT && schoolData?.id
                ? ApiService.putData(API_ENDPOINTS.SCHOOLS, data, schoolData.id)
                : ApiService.postData(`${API_ENDPOINTS.SCHOOLS}`, data),
        {
            onSuccess: () => {
                refetchSchoolData().then();
                message.success('School saved successfully').then();
                setSidebarViewType(ModalViewType.NONE);
            },
            onError: () => {
                message.error('Failed to save data').then();
            }
        }
    );

    const {mutate: deleteSchool, isLoading: isDeleting} = useMutation(
        (id: string) => ApiService.deleteData(API_ENDPOINTS.SCHOOLS,
            school_id),
        {
            onSuccess: () => {
                message.success("School deleted successfully").then();
                setShowModal(ModalViewType.NONE);
                refetchSchoolData().then();
            },
            onError: (error) => {
                console.error('Error deleting school:', error);
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
            confirmDelete={() => deleteSchool(schoolData.id)}
            handleClose={() => setShowModal(ModalViewType.NONE)}
            isLoading={schoolDataLoading || isSaving || isDeleting}
            tableData={filteredData}
            componentData={schoolData}
            formComponent={<SchoolForm formik={formik}/>}
            colSize={'col-md-5'}
        />
    );
};

export default Schools;
