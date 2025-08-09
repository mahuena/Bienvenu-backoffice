import React from 'react';
import clsx from 'clsx';
import Select, {MultiValue, SingleValue} from "react-select";

type OptionType = {
    id: number | string;
    name?: string;
    firstName?: string;
    surname?: string;
    reference?: string;
}

type SelectInputFieldProps<T extends OptionType> = {
    label: string;
    labelStyle?: string;
    name: string;
    formik: any;
    options: T[] | undefined;
    rowSize?: string;
    isMulti?: boolean;
};

const SelectInputField = <T extends OptionType>({
                                                    label,
                                                    labelStyle,
                                                    name,
                                                    formik,
                                                    options,
                                                    rowSize = '4',
                                                    isMulti = false
                                                }: SelectInputFieldProps<T>) => {
    const selectOptions = options?.map(option => ({
        value: option.id,
        label: option.name
            ? option.name
            : option.reference
                ? option.reference
                : `${option.firstName ?? ''} ${option.surname ?? ''}`,
    })) || [];

    const value = isMulti
        ? selectOptions.filter(opt =>
            Array.isArray(formik.values[name])
                ? formik.values[name].includes(opt.value)
                : false
        )
        : selectOptions.find(opt => String(opt.value) === String(formik.values[name])) || null;


    return (
        <div className={`col-${rowSize} mb-4`}>
            <label className={`form-label ${labelStyle}`}>{label}</label>
            <Select
                isSearchable
                isMulti={isMulti}
                className={clsx('react-select', {
                    'is-invalid': formik.touched[name] && formik.errors[name],
                    'is-valid': formik.touched[name] && !formik.errors[name],
                })}
                classNamePrefix='react-select'
                name={name}
                options={selectOptions}
                value={value}
                onChange={selectedOptions => {
                    if (isMulti) {
                        formik.setFieldValue(
                            name,
                            (selectedOptions as MultiValue<{
                                value: string | number;
                                label: string
                            }> | null)?.map(opt => opt.value) || []
                        );
                    } else {
                        formik.setFieldValue(
                            name,
                            (selectedOptions as SingleValue<{
                                value: string | number;
                                label: string
                            }> | null)?.value || ''
                        );
                    }
                }}
                onBlur={() => formik.setFieldTouched(name, true)}
            />
            {formik.touched[name] && formik.errors[name] ? (
                <div className="invalid-feedback">{formik.errors[name]}</div>
            ) : null}
        </div>
    );
}
export default SelectInputField;