import React, { useState } from "react";
import { Form } from "react-bulma-components";
const { Field, Control, Label, Input } = Form;

const InputField = ({ id, label, type, ...otherProps }) => {
    return (
        <Field>
            {otherProps.customLabel ? (
                otherProps.customLabel
            ) : (
                <Label className="has-text-left">{label}</Label>
            )}
            <Control>
                <Input
                    id={id}
                    type={type}
                    placeholder={label}
                    {...otherProps}
                />
            </Control>
        </Field>
    );
};

export default InputField;
