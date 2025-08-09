import React from "react";
import {useFormik} from "formik";
import {KeyPhrases} from "../core/models.ts";
import TextInputField from "../../../../_metronic/helpers/components/TextInputField.tsx";

type Props = {
    formik: ReturnType<typeof useFormik<KeyPhrases>>;
};

export const KeyPhrasesForm: React.FC<Props> = ({formik}) => {
    return (
        <form onSubmit={formik.handleSubmit} className="form">
            <h3 className="mb-4">Key Phrase Details</h3>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Phrase (EN)" name="en" type="text"/>
            </div>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Phrase (FR)" name="fr" type="text"/>
            </div>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Phrase (TW)" name="tw" type="text"/>
            </div>
        </form>
    );
};
