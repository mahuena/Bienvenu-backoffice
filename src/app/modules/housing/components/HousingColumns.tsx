import {ColumnsType} from "antd/es/table";
import {IHousingModel} from "../core/models.ts";
import {ButtonPair} from "../../../../_metronic/helpers/components/ButtonPair.tsx";

type columnProps = {
    onEdit: (data: IHousingModel) => void
    onDelete: (data: IHousingModel) => void
}

export const HousingColumns = (props: columnProps) => {
    const column: ColumnsType<IHousingModel> = [
        {
            title: 'Title (EN)',
            dataIndex: ['title', 'en'],
            render: (_text, record) => record.title.en,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
        },
        {
            title: 'Property Type',
            dataIndex: 'propertyType',
        },
        {
            title: 'Bedrooms',
            dataIndex: 'bedrooms',
        },
        {
            title: 'Bathrooms',
            dataIndex: 'bathrooms',
        },
        {
            title: 'Area',
            dataIndex: ['location', 'area'],
            render: (_text, record) => record.location.area,
        },
        {
            title: 'Address',
            dataIndex: ['location', 'address'],
            render: (_text, record) => record.location.address,
        },
        {
            title: 'Furnished',
            dataIndex: 'furnished',
            render: (furnished) => furnished ? 'Yes' : 'No',
        },
        {
            title: 'Landlord',
            dataIndex: ['landlord', 'name'],
            render: (_text, record) => record.landlord.name,
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            render: (_text, record: IHousingModel) => (
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
