import React from "react";
import clsx from "clsx";

type TextInputFieldProps = {
    label: string;
    name: string;
    formik: any;
    type?: string;
    min?: number | string;
    readOnly?: boolean;
    rowSize?: string;
};

const TextInputField: React.FC<TextInputFieldProps> = ({
                                                           label,
                                                           name,
                                                           formik,
                                                           type = "text",
                                                           readOnly = false,
                                                           rowSize = "4",
                                                           min,
                                                       }) => (
    <div className={`col-${rowSize} mb-4`}>
        <label className="form-label">{label}</label>
        {type === "textarea" ? (
            <>
        <textarea
            {...formik.getFieldProps(name)}
            rows={1}
            className={clsx(
                `form-control ${readOnly ? "form-control-solid" : ""}`,
                {
                    "is-invalid":
                        formik.touched[name] && formik.errors[name] && !readOnly,
                    "is-valid":
                        formik.touched[name] && !formik.errors[name] && !readOnly,
                }
            )}
        />
                {formik.touched[name] && formik.errors[name] ? (
                    <div className="invalid-feedback">{formik.errors[name]}</div>
                ) : null}
            </>
        ) : (
            <>
                <input
                    type={type}
                    min={min}
                    readOnly={readOnly}
                    {...formik.getFieldProps(name)}
                    className={clsx(
                        `form-control ${readOnly ? "form-control-solid" : ""}`,
                        {
                            "is-invalid":
                                formik.touched[name] && formik.errors[name] && !readOnly,
                            "is-valid":
                                formik.touched[name] && !formik.errors[name] && !readOnly,
                        }
                    )}
                />
                {formik.touched[name] && formik.errors[name] ? (
                    <div className="invalid-feedback">{formik.errors[name]}</div>
                ) : null}
            </>
        )}
    </div>
);

export default TextInputField;
