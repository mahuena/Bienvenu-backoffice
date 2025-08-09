import {ColumnsType} from "antd/es/table";
import {ICulturalTipModel} from "../core/models.ts";
import {ButtonPair} from "../../../../_metronic/helpers/components/ButtonPair.tsx";

type columnProps = {
    onEdit: (data: ICulturalTipModel) => void
    onDelete: (data: ICulturalTipModel) => void
}

export const CulturalTipsColumns = (props: columnProps) => {
    const column: ColumnsType<ICulturalTipModel> = [
        {
            title: 'Description (EN)',
            dataIndex: ['description', 'en'],
            render: (_text, record) => record.description.en,
        },
        {
            title: 'Description (FR)',
            dataIndex: ['description', 'fr'],
            render: (_text, record) => record.description.fr,
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            render: (_text, record: ICulturalTipModel) => (
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
