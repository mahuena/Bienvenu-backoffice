import {ColumnsType} from "antd/es/table";
import {KeyPhrasesModel} from "../core/models.ts";
import {ButtonPair} from "../../../../_metronic/helpers/components/ButtonPair.tsx";

type columnProps = {
    onEdit: (data: KeyPhrasesModel) => void;
    onDelete: (data: KeyPhrasesModel) => void;
};

export const KeyPhrasesColumns = (props: columnProps) => {
    const column: ColumnsType<KeyPhrasesModel> = [
        {
            title: 'Phrase (EN)',
            dataIndex: 'en',
        },
        {
            title: 'Phrase (FR)',
            dataIndex: 'fr',
        },
        {
            title: 'Phrase (TW)',
            dataIndex: 'tw',
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            render: (_text, record: KeyPhrasesModel) => (
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
    ];
    return column;
};
