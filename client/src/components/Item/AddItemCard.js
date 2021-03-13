import React, { useState, useContext } from "react";
import axios from "axios";
import BoardsContext from "../../context/BoardsContext";
import { Card, Form, Button } from "react-bulma-components";
const { Field, Input, Control } = Form;

const AddItemCard = ({ status, board, stopAdding }) => {
    const initialValues = {
        name: "",
        status,
        notes: "",
        blocker: "",
        repeat: ""
    };
    const [values, setValues] = useState(initialValues);
    const [addItemError, setAddItemError] = useState(null);

    const boardContext = useContext(BoardsContext);

    const handleChange = (e) => {
        const id = e.target.getAttribute("id");
        let newValues = { ...values };
        newValues[id] = e.target.value;
        setValues(newValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!values.name) {
            stopAdding();
            return;
        }

        try {
            const { data } = await axios.post("/api/user/add_item", {
                item: { ...values, status: getStatusText(values.status) },
                board
            });
            boardContext.addItem(data, board);
        } catch (err) {
            const { message } = err.response.data;
            setAddItemError(message);
        }
    };

    return (
        <Card className="item add-item-card">
            <Card.Content className="has-text-left">
                <form onSubmit={handleSubmit} id="add-item">
                    <Field>
                        <Control>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </Control>
                    </Field>
                    {addItemError && (
                        <p className="is-danger">{addItemError}</p>
                    )}
                </form>
                <div className="cancel">
                    <Button onClick={stopAdding}>Cancel</Button>
                </div>
            </Card.Content>
        </Card>
    );
};

const getStatusText = (status) => {
    switch (status) {
        case "To Do":
            return "todo";
        case "In Progress":
            return "inprogress";
        default:
            return "done";
    }
};

export default AddItemCard;
