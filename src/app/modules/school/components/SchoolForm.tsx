import React from "react";
import {useFormik} from "formik";
import {ISchoolModel} from "../core/models.ts";
import TextInputField from "../../../../_metronic/helpers/components/TextInputField.tsx";
import SelectInputField from "../../../../_metronic/helpers/components/SelectInputField.tsx";

type Props = {
    formik: ReturnType<typeof useFormik<ISchoolModel>>;
};

const typeOptions = [
    {id: "university", name: "university"},
    {id: "english school", name: "english school"},
    {id: "institute", name: "institute"},
];

export const SchoolForm: React.FC<Props> = ({formik}) => {
    return (
        <form onSubmit={formik.handleSubmit} className="form">
            <h3 className="mb-4">School Details</h3>
            <div className="row mb-5">
                <TextInputField rowSize="6" formik={formik} label="Name (EN)" name="name.en" type="text"/>
                <TextInputField rowSize="6" formik={formik} label="Name (FR)" name="name.fr" type="text"/>
            </div>
            <div className="row mb-5">
                <TextInputField rowSize="6" formik={formik} label="Description (EN)" name="description.en" type="text"/>
                <TextInputField rowSize="6" formik={formik} label="Description (FR)" name="description.fr" type="text"/>
            </div>
            <div className="row mb-5">
                <SelectInputField rowSize="4" formik={formik} label="Type" name="type" options={typeOptions}/>
                <TextInputField rowSize="4" formik={formik} label="Logo URL" name="logo" type="text"/>
                <TextInputField rowSize="4" formik={formik} label="Website" name="website" type="text"/>
            </div>
            <div className="row mb-5">
                <TextInputField rowSize="6" formik={formik} label="Area" name="address.area" type="text"/>
                <TextInputField rowSize="6" formik={formik} label="Address" name="address.address" type="text"/>
            </div>
            <h3 className="mb-4">Contact Details</h3>
            <div className="row mb-5">
                <TextInputField rowSize="4" formik={formik} label="Phone" name="contact.phone" type="tel"/>
                <TextInputField rowSize="4" formik={formik} label="WhatsApp" name="contact.whatsapp" type="tel"/>
                <TextInputField rowSize="4" formik={formik} label="Email" name="contact.email" type="email"/>
            </div>

            {/* Programs Section */}
            <div className="mb-5">
                <label className="form-label">Programs</label>
                {Array.isArray(formik.values.programs) && formik.values.programs.map((program, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            value={program}
                            onChange={e => {
                                const newPrograms = [...formik.values.programs];
                                newPrograms[idx] = e.target.value;
                                formik.setFieldValue("programs", newPrograms);
                            }}
                            onBlur={() => {
                                if (Array.isArray(formik.touched.programs)) {
                                    const touched = [...formik.touched.programs];
                                    touched[idx] = true;
                                    formik.setFieldTouched(`programs.${idx}`, true);
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                const newPrograms = formik.values.programs.filter((_, i) => i !== idx);
                                formik.setFieldValue("programs", newPrograms);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                {Array.isArray(formik.errors.programs) === false && typeof formik.errors.programs === "string" && (
                    <div className="text-danger small">{formik.errors.programs}</div>
                )}
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => formik.setFieldValue("programs", [...(formik.values.programs || []), ""])}
                >
                    Add Program
                </button>
            </div>

            {/* Amenities Section */}
            <div className="mb-5">
                <label className="form-label">Amenities</label>
                {Array.isArray(formik.values.amenities) && formik.values.amenities.map((amenity, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-2">
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
                                    formik.setFieldTouched(`amenities.${idx}`, true);
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
                ))}
                {Array.isArray(formik.errors.amenities) === false && typeof formik.errors.amenities === "string" && (
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

            {/* Photos Section */}
            <div className="mb-5">
                <label className="form-label">Photo URLs</label>
                {Array.isArray(formik.values.photos) && formik.values.photos.map((url, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-2">
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
                                    formik.setFieldTouched(`photos.${idx}`, true);
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
                ))}
                {Array.isArray(formik.errors.photos) === false && typeof formik.errors.photos === "string" && (
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
        </form>
    );
};
