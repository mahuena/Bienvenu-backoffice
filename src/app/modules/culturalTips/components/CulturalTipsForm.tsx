import React from "react";
import {useFormik} from "formik";
import {ICulturalTipModel} from "../core/models.ts";
import TextInputField from "../../../../_metronic/helpers/components/TextInputField.tsx";

type Props = {
    formik: ReturnType<typeof useFormik<ICulturalTipModel>>;
};

export const CulturalTipsForm: React.FC<Props> = ({formik}) => {
    return (
        <form onSubmit={formik.handleSubmit} className="form">
            <h3 className="mb-4">Cultural Tip Details</h3>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Icon" name="icon" type="text"/>
            </div>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Description (EN)" name="description.en"
                                type="text"/>
            </div>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Description (FR)" name="description.fr"
                                type="text"/>
            </div>
        </form>
    );
};
