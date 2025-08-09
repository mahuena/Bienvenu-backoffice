import * as Yup from 'yup';

export interface IHousingResponse {
    count: number;
    data: IHousingModel[];
    success: boolean;
}

export interface IHousingModel {
    id: string;
    title: {
        en: string;
        fr: string;
    };
    description: {
        en: string;
        fr: string;
    };
    price: number;
    currency: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    location: {
        area: string;
        address: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    landlord: {
        name: string;
        phone: string;
        whatsapp: string;
        email: string;
    };
    photos: string[];
    amenities: string[];
    furnished: boolean;
}

export const defaultHousingModel: IHousingModel = {
    id: '',
    title: {
        en: '',
        fr: '',
    },
    description: {
        en: '',
        fr: '',
    },
    price: 0,
    currency: 'USD',
    propertyType: '',
    bedrooms: 0,
    bathrooms: 0,
    location: {
        area: '',
        address: '',
        coordinates: {
            latitude: 0,
            longitude: 0,
        },
    },
    landlord: {
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
    },
    photos: [],
    amenities: [],
    furnished: false,
}

export const housingFormSchema = Yup.object().shape({
    title: Yup.object().shape({
        en: Yup.string()
            .min(5, 'Title in English must be at least 5 characters')
            .required('Title in English is required'),
        fr: Yup.string()
            .min(5, 'Title in French must be at least 5 characters')
            .required('Title in French is required'),
    }),
    description: Yup.object().shape({
        en: Yup.string()
            .min(10, 'Description in English must be at least 10 characters')
            .required('Description in English is required'),
        fr: Yup.string()
            .min(10, 'Description in French must be at least 10 characters')
            .required('Description in French is required'),
    }),
    price: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
    currency: Yup.string().required('Currency is required'),
    propertyType: Yup.string().required('Property type is required'),
    bedrooms: Yup.number().required('Number of bedrooms is required').min(0, 'Bedrooms must be a non-negative number'),
    bathrooms: Yup.number().required('Number of bathrooms is required').min(0, 'Bathrooms must be a non-negative number'),
    location: Yup.object().shape({
        area: Yup.string().required('Area is required'),
        address: Yup.string().required('Address is required'),
        coordinates: Yup.object().shape({
            latitude: Yup.number()
                .min(90, 'Latitude must be less than or equal to 90')
                .required('Latitude is required').min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
            longitude: Yup.number()
                .min(180, 'Longitude must be less than or equal to 180')
                .required('Longitude is required').min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
        }),
    }),
    landlord: Yup.object().shape({
        name: Yup.string().required('Landlord name is required'),
        phone: Yup.string()
            .matches(/^\+233\d{9}$/, 'Landlord phone number must be in the format +233XXXXXXXXX')
            .required('Landlord phone number is required'),
        whatsapp: Yup.string(),
        email: Yup.string().email('Invalid email format').required('Landlord email is required'),
    }),
    amenities: Yup.array().of(Yup.string()).optional(),
    furnished: Yup.boolean(),
    photos: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one photo is required')
        .required('Photos are required'),
});


