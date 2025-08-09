import React, {ReactNode} from "react";
import {LayoutGroup, motion} from "framer-motion";
import {Skeleton, Table} from "antd";
import {ButtonPair} from "./ButtonPair.tsx";
import {ColumnsType} from "antd/es/table";
import {Content} from "../../layout/components/Content.tsx";
import {Toolbar} from "../../layout/components/toolbar/Toolbar.tsx";
import {FormikValues, useFormik} from "formik";
import {DeleteModal} from "./DeleteModal.tsx";
import {useLocation} from "react-router-dom";
import {PageSearch} from "./PageSearch.tsx";
import {ModalViewType} from "../GlobalHelpers.ts";

interface CommonLayoutProps<T extends FormikValues> {
    columns: ColumnsType<T>;
    sidebarViewType: ModalViewType;
    showSidebar: (sideBarType: ModalViewType) => void;
    showModal?: string;
    elemenName: string;
    confirmDelete: () => void;
    isLoading: boolean;
    handleClose: () => void;
    componentData?: T;
    formikInstance: ReturnType<typeof useFormik<T>>;
    formComponent: ReactNode;
    tableData?: T[];
    hasGoBack?: boolean;
    heigth?: string;
    colSize?: string;
}

export const CommonLayout = <T extends FormikValues>({
                                                         columns,
                                                         sidebarViewType,
                                                         showSidebar,
                                                         showModal,
                                                         elemenName,
                                                         formComponent,
                                                         confirmDelete,
                                                         isLoading,
                                                         hasGoBack,
                                                         componentData,
                                                         handleClose,
                                                         formikInstance,
                                                         tableData,
                                                         heigth,
                                                         colSize = "col-md-4",
                                                     }: CommonLayoutProps<T>) => {
    const [searchText, setSearchText] = React.useState<string>("");
    const [gridData, setGridData] = React.useState<T[] | undefined>(tableData);
    const location = useLocation();
    const previousLocation: string = location?.state as string;

    const handleSearchTextChange = (searchText: string) => {
        setSearchText(searchText);
    };

    const handleCancel = () => {
        formikInstance.resetForm();
        showSidebar(ModalViewType.NONE);
    };

    React.useEffect(() => {
        if (tableData) {
            setGridData(
                tableData.filter((item) => {
                    return Object.values(item).some((value) => {
                        return String(value)
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    });
                })
            );
        }
    }, [searchText, tableData]);

    return (
        <>
            <Toolbar/>
            <Content>
                <LayoutGroup>
                    <div className={"d-flex flex-row mb-10"}>
                        <motion.div
                            layout={"size"}
                            initial={{opacity: 0.1, y: -10, scale: 0.95}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 150,
                                damping: 20,
                                ease: "easeInOut",
                            }}
                            className="card card-custom shadow w-100"
                        >
                            {previousLocation && (
                                <div className="px-10 pt-5">
                                    <span className="text-muted fw-bold">{previousLocation}</span>
                                </div>
                            )}
                            <div
                                className={
                                    "card-header d-flex justify-content-between align-items-center"
                                }
                            >
                                <div className="d-flex align-items-center gap-3">
                                    {hasGoBack && (
                                        <>
                                            <ButtonPair
                                                positiveText={`Go Back`}
                                                positiveAction={() => window.history.back()}
                                                showNegative={false}
                                                positiveIcon={"arrow-left"}
                                                positiveClassName={"btn-light-primary hover-elevate-up"}
                                            />
                                        </>
                                    )}
                                    <PageSearch
                                        onSearchTextChange={handleSearchTextChange}
                                        placeholder={`Search ${elemenName}`}
                                        searchText={searchText}
                                    />
                                </div>

                                <ButtonPair
                                    positiveText={`Add ${elemenName}`}
                                    positiveAction={() => showSidebar(ModalViewType.ADD)}
                                    showNegative={false}
                                    positiveIcon={"plus"}
                                    positiveClassName={"btn-primary hover-elevate-up"}
                                />
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {isLoading ? (
                                        <Skeleton active/>
                                    ) : (
                                        <Table
                                            dataSource={gridData}
                                            columns={columns}
                                            bordered
                                            scroll={{x: "max-content"}}
                                            pagination={{
                                                showSizeChanger: true,
                                                pageSizeOptions: ["5", "10", "20", "50"],
                                                showTotal: (total, range) =>
                                                    `${range[0]}-${range[1]} of ${total} records`,
                                            }}
                                            className="table-responsive"
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                        {sidebarViewType !== "none" && (
                            <motion.div
                                layout={"preserve-aspect"}
                                initial={{opacity: 0.45, x: 120, scale: 0.75}}
                                animate={{opacity: 1, x: 0, scale: 1}}
                                transition={{
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 20,
                                    ease: "easeInOut",
                                }}
                                className={`${colSize} ms-4 d-flex justify-content-center`}
                            >
                                <div
                                    style={{height: heigth}}
                                    className="card card-custom shadow w-100"
                                >
                                    <div className="card-header">
                                        <div className="card-title">
                                            {sidebarViewType === "add"
                                                ? `Add ${elemenName}`
                                                : `Edit ${elemenName}`}
                                        </div>
                                        <ButtonPair
                                            positiveText={""}
                                            positiveAction={handleCancel}
                                            positiveIcon={"cross"}
                                            positiveClassName={"btn-light-danger btn-icon"}
                                            showNegative={false}
                                        />
                                    </div>
                                    <div className="card-body">{formComponent}</div>
                                    <div className="card-footer py-6">
                                        <ButtonPair
                                            positiveText={"Save"}
                                            positiveAction={formikInstance.handleSubmit}
                                            positiveLoading={isLoading}
                                            negativeText={"Cancel"}
                                            negativeAction={handleCancel}
                                            negativeIcon={"close"}
                                            positiveIcon={"check"}
                                            positiveClassName={"btn-primary hover-scale"}
                                            className={"d-flex flex-row-reverse gap-4"}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <DeleteModal
                        show={showModal === "delete"}
                        handleClose={handleClose}
                        onConfirm={confirmDelete}
                        deleteTitle={elemenName}
                        recordName={componentData?.name}
                        deleting={isLoading}
                        idToDelete={componentData?.id || 0}
                    />
                </LayoutGroup>
            </Content>
        </>
    );
};
