import React, {useState} from "react";
import {defaultKeyPhrase, keyPhraseFormSchema, KeyPhrasesModel} from "./core/models.ts";
import {usePageSearchHelpers} from "../../../_metronic/helpers/usePageSearchHelpers.ts";
import {KeyPhrasesColumns} from "./components/KeyPhrasesColumns.tsx";
import {ModalViewType} from "../../../_metronic/helpers/GlobalHelpers.ts";
import {CommonLayout} from "../../../_metronic/helpers/components/CommonLayout.tsx";
import {useFormik} from "formik";
import {KeyPhrasesForm} from "./components/KeyPhrasesForm.tsx";
import {useKeyPhrasesHook} from "./core/useKeyPhrasesHook.ts";
import {useMutation} from "react-query";
import {message} from "antd";
import {API_ENDPOINTS} from "../network/core/requests.ts";
import {ApiService} from "../network/core/ApiService.ts";

const KeyPhrases = () => {
    const [sidebarViewType, setSidebarViewType] = useState<ModalViewType>(ModalViewType.NONE);
    const [phraseData, setPhraseData] = useState<KeyPhrasesModel>(defaultKeyPhrase);
    const [showModal, setShowModal] = useState<ModalViewType>(ModalViewType.NONE);

    const {getKeyPhrasesData, refetchKeyPhrasesData, keyPhrasesDataLoading} = useKeyPhrasesHook();
    console.log("KeyPhrases data:", getKeyPhrasesData?.data);

    const {
        filteredData, setSearchText, searchText
    } = usePageSearchHelpers<KeyPhrasesModel>(getKeyPhrasesData?.data ?? []);

    const showSidebar = (
        sideBarType: ModalViewType = ModalViewType.ADD,
        data: KeyPhrasesModel = defaultKeyPhrase,
    ) => {
        setSidebarViewType(sideBarType);
        setPhraseData(data);
    };

    const columns = KeyPhrasesColumns({
        onEdit: (data) => showSidebar(ModalViewType.EDIT, data),
        onDelete: (data) => {
            setPhraseData(data);
            setShowModal(ModalViewType.DELETE);
        },
    });

    const formik = useFormik({
        initialValues: phraseData,
        enableReinitialize: true,
        validationSchema: keyPhraseFormSchema,
        onSubmit: (values) => {
            const dataToSend = {...values};
            if (!values.id) {
                dataToSend.id = undefined;
            }
            saveKeyPhrase(dataToSend);
        },
    });

    const {mutate: saveKeyPhrase, isLoading: isSaving} = useMutation(
        (data: KeyPhrasesModel) =>
            sidebarViewType === ModalViewType.EDIT && phraseData?.id
                ? ApiService.putData(API_ENDPOINTS.KEY_PHRASES, data, phraseData.id)
                : ApiService.postData(`${API_ENDPOINTS.KEY_PHRASES}`, data),
        {
            onSuccess: () => {
                refetchKeyPhrasesData().then();
                message.success('Key phrase saved successfully').then();
                setSidebarViewType(ModalViewType.NONE);
            },
            onError: () => {
                message.error('Failed to save data').then();
            }
        }
    );

    const {mutate: deleteKeyPhrase, isLoading: isDeleting} = useMutation(
        (id: string) => ApiService.deleteData(API_ENDPOINTS.KEY_PHRASES, id),
        {
            onSuccess: () => {
                refetchKeyPhrasesData().then();
                message.success('Key phrase deleted successfully').then();
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
            confirmDelete={() => deleteKeyPhrase(phraseData.id)}
            handleClose={() => setShowModal(ModalViewType.NONE)}
            isLoading={keyPhrasesDataLoading || isSaving || isDeleting}
            tableData={filteredData}
            componentData={phraseData}
            formComponent={<KeyPhrasesForm formik={formik}/>}
            colSize={'col-md-5'}
        />
    );
};

export default KeyPhrases;
