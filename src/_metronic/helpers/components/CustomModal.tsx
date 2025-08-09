import React from "react";
import {Modal} from "react-bootstrap";
import {KTIcon} from "./KTIcon.tsx";

type CustomModalProps = {
    show: boolean;
    handleClose: () => void;
    title?: string;
    titleHeader?: React.ReactNode;
    bodyContent: React.ReactNode;
    footerContent?: React.ReactNode;
    modalWidth: string;
    size?: 'sm' | 'lg' | 'xl';
}


export const CustomModal: React.FC<CustomModalProps> = ({
                                                            show,
                                                            handleClose,
                                                            title,
                                                            modalWidth = 'mw-900',
                                                            size = 'lg',
                                                            titleHeader =
                                                                <span className={'fs-2 fw-bold text-gray-700'}>
                                                                      {title}
                                                                </span>,
                                                            bodyContent,
                                                            footerContent
                                                        }) => {

    return (
        <Modal
            dialogClassName={`modal-dialog modal-dialog-centered ${modalWidth}px`}
            show={show}
            onHide={handleClose}
            backdrop={true}
            size={size}
        >
            <div className='modal-header justify-content-between'>
                <div>
                    {titleHeader}
                </div>
                {/* begin::Close */}
                <div className='btn btn-sm btn-icon bg-secondary btn-active-color-primary' onClick={handleClose}>
                    <KTIcon className='fs-1 jus' iconName='cross'/>
                </div>
            </div>

            <div className='modal-body'>
                {bodyContent}
            </div>
            {
                footerContent &&
                <div className='modal-footer'>
                    {footerContent}
                </div>
            }
        </Modal>
    );
};