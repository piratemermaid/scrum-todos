import React, { useState } from "react";
import { Card, Button, Form } from "react-bulma-components";
import InputField from "../Form/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
const { Textarea, Field, Label, Control } = Form;

const initialValues = {
    name: "",
    notes: "",
    blocker: "",
    repeat: ""
};
const initialShown = {
    notes: false,
    blocker: false,
    repeat: false
};

const AddItemModal = (props) => {
    const [values, setValues] = useState(initialValues);
    const [shown, setShown] = useState(initialShown);

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

    const toggleShown = (label) => {
        let newShown = { ...shown };
        newShown[label] = !shown[label];
        setShown(newShown);
    };

    const renderShowToggle = (label) => {
        return (
            <label
                onClick={() => toggleShown(label)}
                className="item-property show-toggle"
            >
                Add {label} <FontAwesomeIcon icon={faPlusCircle} />
            </label>
        );
    };

    return (
        <Card id="add-item-modal">
            <Card.Content>
                <p className="modal-card-title">Add New Item</p>
                <form onSubmit={onSubmit} id="add-item">
                    <InputField
                        className="item-property"
                        id="name"
                        label="Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {shown.notes ? (
                        <Field className="item-property">
                            <Label>
                                Notes{" "}
                                <FontAwesomeIcon
                                    icon={faMinusCircle}
                                    onClick={() => toggleShown("notes")}
                                />
                            </Label>
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
                    ) : (
                        renderShowToggle("notes")
                    )}
                    {shown.blocker ? (
                        <InputField
                            className="item-property"
                            id="blocker"
                            label="Blocker"
                            customLabel={
                                <Label className="has-text-left">
                                    Blocker{" "}
                                    <FontAwesomeIcon
                                        icon={faMinusCircle}
                                        onClick={() => toggleShown("blocker")}
                                    />
                                </Label>
                            }
                            type="text"
                            value={values.blocker}
                            onChange={handleChange}
                        />
                    ) : (
                        renderShowToggle("blocker")
                    )}
                    {shown.repeat ? (
                        <InputField
                            className="item-property"
                            id="repeat"
                            label="Repeat"
                            customLabel={
                                <Label className="has-text-left">
                                    Repeat{" "}
                                    <FontAwesomeIcon
                                        icon={faMinusCircle}
                                        onClick={() => toggleShown("repeat")}
                                    />
                                </Label>
                            }
                            type="text"
                            value={values.repeat}
                            onChange={handleChange}
                        />
                    ) : (
                        renderShowToggle("repeat")
                    )}
                    <Button onClick={onSubmit}>Add</Button>
                    <Button onClick={props.close}>Cancel</Button>
                </form>
            </Card.Content>
        </Card>
    );
};

export default AddItemModal;
