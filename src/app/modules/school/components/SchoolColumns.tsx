import {ColumnsType} from "antd/es/table";
import {ISchoolModel} from "../core/models.ts";
import {ButtonPair} from "../../../../_metronic/helpers/components/ButtonPair.tsx";

type columnProps = {
    onEdit: (data: ISchoolModel) => void
    onDelete: (data: ISchoolModel) => void
}

export const SchoolColumns = (props: columnProps) => {
    const column: ColumnsType<ISchoolModel> = [
        {
            title: 'Name (EN)',
            dataIndex: ['name', 'en'],
            render: (_text, record) => record.name.en,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Area',
            dataIndex: ['address', 'area'],
            render: (_text, record) => record.address.area,
        },
        {
            title: 'Website',
            dataIndex: 'website',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: ['address', 'address'],
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            render: (_text, record: ISchoolModel) => (
                <ButtonPair
                    positiveText={''}
                    positiveAction={() => props.onEdit(record)}
                    positiveIcon='pencil'
                    negativeText={''}
                    negativeAction={() => props.onDelete(record)}
                    negativeIcon='trash'
                    negativeClassName={'btn btn-sm btn-light-danger'}
                    positiveClassName='btn btn-sm btn-light-warning me-3'
                    className={'d-flex flex-row align-items-center'}
                />
            ),
        },
    ]
    return column;
}
