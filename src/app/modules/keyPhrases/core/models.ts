import * as Yup from 'yup';

export type KeyPhrasesModel = {
    id?: string;
    en: string;
    fr: string;
    tw?: string;
    ga?: string;
    createdAt?: Date;
    updatedAt?: Date;

};

export interface IKeyPhrasesResponse {
    count: number;
    data: KeyPhrasesModel[];
    success: boolean;
}

export const defaultKeyPhrase: KeyPhrasesModel = {
    en: '',
    fr: '',
    tw: '',
    ga: '',
};

export const keyPhraseFormSchema = Yup.object().shape({
    en: Yup.string()
        .min(2, 'English phrase must be at least 2 characters')
        .required('English phrase is required'),
    fr: Yup.string()
        .min(2, 'French phrase must be at least 2 characters')
        .required('French phrase is required'),
    tw: Yup.string(),
    ga: Yup.string(),
});
