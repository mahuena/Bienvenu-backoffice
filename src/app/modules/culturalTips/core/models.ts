import * as Yup from 'yup';

export interface ICulturalTipResponse {
    count: number;
    data: ICulturalTipModel[];
    success: boolean;
}

export interface ICulturalTipModel {
    id?: string;
    icon?: string;
    description: {
        en: string;
        fr: string;
    };
    category: {
        en: string;
        fr: string;
    };
}

export const defaultCulturalTipModel: ICulturalTipModel = {
    icon: '',
    description: {
        en: '',
        fr: '',
    },
    category: {
        en: '',
        fr: '',
    },
}

export const culturalTipFormSchema = Yup.object().shape({
    description: Yup.object().shape({
        en: Yup.string()
            .min(10, 'Description in English must be at least 10 characters')
            .required('Description in English is required'),
        fr: Yup.string()
            .min(10, 'Description in French must be at least 10 characters')
            .required('Description in French is required'),
    }),
    category: Yup.object().shape({
        en: Yup.string()
            .min(2, 'Category in English must be at least 2 characters')
            .required('Category in English is required'),
        fr: Yup.string()
            .min(2, 'Category in French must be at least 2 characters')
            .required('Category in French is required'),
    }),
});
