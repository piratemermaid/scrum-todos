import React, { useState } from "react";
import { Card, Button, Form } from "react-bulma-components";
import InputField from "../Form/InputField";
const { Textarea, Field, Label, Control } = Form;

const initialValues = {
    name: "",
    notes: "",
    blocker: "",
    repeat: ""
};

const AddItemModal = (props) => {
    const [values, setValues] = useState(initialValues);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit", values);
    };

    const handleChange = (e) => {
        const id = e.target.getAttribute("id");
        let newValues = { ...values };
        newValues[id] = e.target.value;
        setValues(newValues);
    };

    return (
        <Card id="add-item-modal">
            <Card.Content>
                <p className="modal-card-title">Add New Item</p>
                <form onSubmit={onSubmit} id="add-item">
                    <InputField
                        id="name"
                        label="Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                    />
                    <Field>
                        <Label>Notes</Label>
                        <Control>
                            <Textarea
                                id="notes"
                                label="Notes"
                                type="textarea"
                                value={values.notes}
                                onChange={handleChange}
                            />
                        </Control>
                    </Field>
                    <InputField
                        id="blocker"
                        label="Blocker"
                        type="text"
                        value={values.blocker}
                        onChange={handleChange}
                    />
                    <InputField
                        id="repeat"
                        label="Repeat"
                        type="text"
                        value={values.repeat}
                        onChange={handleChange}
                    />
                    <Button onClick={onSubmit}>Add</Button>
                    <Button onClick={props.close}>Cancel</Button>
                </form>
            </Card.Content>
        </Card>
    );
};

export default AddItemModal;
