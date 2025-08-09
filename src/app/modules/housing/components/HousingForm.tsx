import React from "react";
import {useFormik} from "formik";
import {IHousingModel} from "../core/models.ts";
import TextInputField from "../../../../_metronic/helpers/components/TextInputField.tsx";
import SelectInputField from "../../../../_metronic/helpers/components/SelectInputField.tsx";

type Props = {
    formik: ReturnType<typeof useFormik<IHousingModel>>;
};

const propertyTypeOptions = [
    {id: "apartment", name: "Apartment"},
    {id: "house", name: "House"},
    {id: "studio", name: "Studio"},
];

const currencyOptions = [
    {id: "GHC", name: "GHC"},
    {id: "USD", name: "USD"},
];

export const HousingForm: React.FC<Props> = ({formik}) => (
    <form onSubmit={formik.handleSubmit} className="form">
        <h3 className="mb-4">House Details</h3>
        <div className="row mb-5">
            <TextInputField rowSize="6" formik={formik} label="Title (EN)" name="title.en" type="text"/>
            <TextInputField rowSize="6" formik={formik} label="Title (FR)" name="title.fr" type="text"/>
        </div>
        <div className="row mb-5">
            <TextInputField rowSize="6" formik={formik} label="Description (EN)" name="description.en" type="text"/>
            <TextInputField rowSize="6" formik={formik} label="Description (FR)" name="description.fr" type="text"/>
        </div>
        <div className="row mb-5">
            <TextInputField rowSize="4" formik={formik} label="Price" name="price" type="number"/>
            <SelectInputField rowSize="4" formik={formik} label="Currency" name="currency" options={currencyOptions}/>
            <SelectInputField rowSize="4" formik={formik} label="Property Type" name="propertyType"
                              options={propertyTypeOptions}/>
        </div>
        <div className="row mb-5">
            <TextInputField rowSize="4" formik={formik} label="Bedrooms" name="bedrooms" type="number"/>
            <TextInputField rowSize="4" formik={formik} label="Bathrooms" name="bathrooms" type="number"/>
            <SelectInputField
                rowSize="4"
                formik={formik}
                label="Furnished"
                name="furnished"
                options={[
                    {id: "true", name: "Yes"},
                    {id: "false", name: "No"},
                ]}
            />
        </div>
        <div className="row mb-5">
            <TextInputField rowSize="6" formik={formik} label="Area" name="location.area" type="text"/>
            <TextInputField rowSize="6" formik={formik} label="Address" name="location.address" type="text"/>
        </div>
        <div className="row mb-5">
            <TextInputField rowSize="6" formik={formik} label="Latitude" name="location.coordinates.latitude"
                            type="number"/>
            <TextInputField rowSize="6" formik={formik} label="Longitude" name="location.coordinates.longitude"
                            type="number"/>
        </div>
        <h3 className="mb-4">Landlord Details</h3>
        <div className="row mb-5">
            <TextInputField rowSize="3" formik={formik} label="Landlord Name" name="landlord.name" type="text"/>
            <TextInputField rowSize="3" formik={formik} label="Phone" name="landlord.phone" type="tel"/>
            <TextInputField rowSize="3" formik={formik} label="WhatsApp" name="landlord.whatsapp" type="tel"/>
            <TextInputField rowSize="3" formik={formik} label="Email" name="landlord.email" type="email"/>
        </div>
        <div className="row mb-5">
            <div className="col-6">
                <label className="form-label">Amenities</label>
                {Array.isArray(formik.values.amenities) &&
                    formik.values.amenities.map((amenity, idx) => (
                        <div key={idx} className="d-flex flex-column mb-2">
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={amenity}
                                    onChange={e => {
                                        const newAmenities = [...formik.values.amenities];
                                        newAmenities[idx] = e.target.value;
                                        formik.setFieldValue("amenities", newAmenities);
                                    }}
                                    onBlur={() => {
                                        if (Array.isArray(formik.touched.amenities)) {
                                            const touched = [...formik.touched.amenities];
                                            touched[idx] = true;
                                            formik.setFieldTouched("amenities", touched);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        const newAmenities = formik.values.amenities.filter((_, i) => i !== idx);
                                        formik.setFieldValue("amenities", newAmenities);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                            {formik.touched.amenities &&
                                Array.isArray(formik.touched.amenities) &&
                                formik.touched.amenities[idx] &&
                                formik.errors.amenities &&
                                Array.isArray(formik.errors.amenities) &&
                                formik.errors.amenities[idx] && (
                                    <div className="text-danger small">{formik.errors.amenities[idx]}</div>
                                )}
                        </div>
                    ))}
                {Array.isArray(formik.errors.amenities) === false &&
                    typeof formik.errors.amenities === "string" && (
                        <div className="text-danger small">{formik.errors.amenities}</div>
                    )}
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => formik.setFieldValue("amenities", [...(formik.values.amenities || []), ""])}
                >
                    Add Amenity
                </button>
            </div>
            <div className="col-6">
                <label className="form-label">Photo URLs</label>
                {Array.isArray(formik.values.photos) &&
                    formik.values.photos.map((url, idx) => (
                        <div key={idx} className="d-flex flex-column mb-2">
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={url}
                                    onChange={e => {
                                        const newPhotos = [...formik.values.photos];
                                        newPhotos[idx] = e.target.value;
                                        formik.setFieldValue("photos", newPhotos);
                                    }}
                                    onBlur={() => {
                                        if (Array.isArray(formik.touched.photos)) {
                                            const touched = [...formik.touched.photos];
                                            touched[idx] = true;
                                            formik.setFieldTouched("photos", touched);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        const newPhotos = formik.values.photos.filter((_, i) => i !== idx);
                                        formik.setFieldValue("photos", newPhotos);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                            {formik.touched.photos &&
                                Array.isArray(formik.touched.photos) &&
                                formik.touched.photos[idx] &&
                                formik.errors.photos &&
                                Array.isArray(formik.errors.photos) &&
                                formik.errors.photos[idx] && (
                                    <div className="text-danger small">{formik.errors.photos[idx]}</div>
                                )}
                        </div>
                    ))}
                {Array.isArray(formik.errors.photos) === false &&
                    typeof formik.errors.photos === "string" && (
                        <div className="text-danger small">{formik.errors.photos}</div>
                    )}
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => formik.setFieldValue("photos", [...(formik.values.photos || []), ""])}
                >
                    Add Photo
                </button>
            </div>
        </div>
    </form>
);
