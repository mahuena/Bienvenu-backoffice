import React from "react";
import {useFormik} from "formik";
import {ICulturalTipModel} from "../core/models.ts";
import TextInputField from "../../../../_metronic/helpers/components/TextInputField.tsx";
import SelectInputField from "../../../../_metronic/helpers/components/SelectInputField.tsx";

type Props = {
    formik: ReturnType<typeof useFormik<ICulturalTipModel>>;
};

const categoryOptionsEn = [
    {id: "Attire", name: "attire"},
    {id: "Family and Social Life", name: "family_social_life"},
    {id: "Religious and Spiritual Practices", name: "religious_spiritual_practices"},
    {id: "Festival", name: "festival"},
    {id: "Local Markets", name: "local_markets"},
    {id: "Greetings and Gesture", name: "greetings_gesture"},
    {id: "Respect of Environment", name: "respect_environment"},
];

const categoryOptionsFr = [
    {id: "Tenue vestimentaire", name: "attire"},
    {id: "Vie familiale et sociale", name: "family_social_life"},
    {id: "Pratiques religieuses et spirituelles", name: "religious_spiritual_practices"},
    {id: "Festival", name: "festival"},
    {id: "Marchés locaux", name: "local_markets"},
    {id: "Salutations et gestes", name: "greetings_gesture"},
    {id: "Respect de l'environnement", name: "respect_environment"},
];

export const CulturalTipsForm: React.FC<Props> = ({formik}) => {
    return (
        <form onSubmit={formik.handleSubmit} className="form">
            <h3 className="mb-4">Cultural Tip Details</h3>
            <div className="row mb-5">
                <TextInputField rowSize="12" formik={formik} label="Icon" name="icon" type="text"/>
            </div>
            <div className="row mb-5">
                <SelectInputField
                    rowSize="12"
                    formik={formik}
                    label="Category (EN)"
                    name="category.en"
                    options={categoryOptionsEn}
                />
            </div>
            <div className="row mb-5">
                <SelectInputField
                    rowSize="12"
                    formik={formik}
                    label="Category (FR)"
                    name="category.fr"
                    options={categoryOptionsFr}
                />
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
