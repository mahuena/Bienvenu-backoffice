import * as Yup from 'yup';

export interface ISchoolResponse {
    count: number;
    data: ISchoolModel[];
    success: boolean;
}

export interface ISchoolModel {
    id: string;
    name: {
        en: string;
        fr: string;
    };
    description: {
        en: string;
        fr: string;
    };
    type: string;
    logo: string;
    website: string;
    address: {
        area: string;
        address: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    contact: {
        phone: string;
        email: string;
        whatsapp: string;
    };
    programs: string[];
    amenities: string[];
    photos: string[];
    createdAt?: string;
    updatedAt?: string;
}

export const defaultSchoolModel: ISchoolModel = {
    id: '',
    name: {
        en: '',
        fr: '',
    },
    description: {
        en: '',
        fr: '',
    },
    type: 'university',
    logo: '',
    website: '',
    address: {
        area: '',
        address: '',
    },
    contact: {
        phone: '',
        email: '',
        whatsapp: '',
    },
    programs: [],
    amenities: [],
    photos: [],
}

export const schoolFormSchema = Yup.object().shape({
    name: Yup.object().shape({
        en: Yup.string().min(2).required('Name in English is required'),
        fr: Yup.string().min(2).required('Name in French is required'),
    }),
    description: Yup.object().shape({
        en: Yup.string().min(5).required('Description in English is required'),
        fr: Yup.string().min(5).required('Description in French is required'),
    }),
    type: Yup.string().required('Type is required'),
    logo: Yup.string().url('Logo must be a valid URL').required('Logo is required'),
    website: Yup.string().url('Website must be a valid URL').required('Website is required'),
    address: Yup.object().shape({
        area: Yup.string().required('Area is required'),
        address: Yup.string().required('Address is required'),
        coordinates: Yup.object().shape({
            latitude: Yup.number().min(-90).max(90).required('Latitude is required'),
            longitude: Yup.number().min(-180).max(180).required('Longitude is required'),
        }),
    }),
    contact: Yup.object().shape({
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        whatsapp: Yup.string(),
    }),
    programs: Yup.array().of(Yup.string()).optional(),
    amenities: Yup.array().of(Yup.string()).optional(),
    photos: Yup.array().of(Yup.string()).optional(),
});
