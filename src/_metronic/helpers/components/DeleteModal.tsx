import {ButtonPair} from "./ButtonPair.tsx";
import React from "react";
import {Modal} from "antd";

type Props = {
    show: boolean
    handleClose: () => void
    onConfirm: (id: number) => void
    deleteTitle: string
    recordName: string
    deleting: boolean
    idToDelete: number
}


const DeleteModal: React.FC<Props> = (props) => {

    return (
        <Modal
            open={props.show}
            title={props.deleteTitle}
            onCancel={props.handleClose}
            centered
            width={500}
            footer={
                <div className='modal-footer justify-content-end'>
                    <ButtonPair
                        positiveAction={() => props.onConfirm(props.idToDelete)}
                        positiveText='Delete'
                        negativeAction={props.handleClose}
                        negativeText='Cancel'
                        positiveIcon={'trash'}
                        positiveClassName={'btn-danger btn-sm'}
                        positiveLoading={props.deleting}
                        positiveDisabled={props.deleting}
                    />
                </div>
            }
        >
            <div className='py-lg-10'>
                <p>
                    Are you sure you want to delete this record for <strong>{props.recordName}</strong> ?
                </p>
            </div>
        </Modal>
    )
}

export {DeleteModal}
