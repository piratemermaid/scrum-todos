import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Card } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";
import "./item.scss";

const Item = ({ item, board }) => {
    const { name, priority, status, tags, notes, blocker, repeat } = item;

    const [addingTag, setAddingTag] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [newTagError, setNewTagError] = useState(null);

    const removeTagAdd = () => {
        setAddingTag(false);
        setNewTag("");
        setNewTagError(null);
        const newTagEl = document.getElementById(`${name}-new-tag`);
        if (newTagEl) {
            newTagEl.focus();
        }
    };

    const addTag = async (e) => {
        e.preventDefault();

        if (newTag === "") {
            removeTagAdd();
            return;
        }

        try {
            await axios.post("/api/user/add_tag", {
                name,
                board,
                newTag
            });
            setNewTag("");
            setNewTagError(null);
        } catch (err) {
            const { message } = err.response.data;
            setNewTagError(message);
        }
    };

    return (
        <Card className="item">
            <Card.Content className="has-text-left">
                <div className="name is-size-5">{name}</div>
                <ul className="is-size-6">
                    {notes && <li>Notes: {notes}</li>}
                    {blocker && <li>Blocker: {blocker}</li>}
                    {repeat && <li>Repeat: {repeat}</li>}
                </ul>
                <div className="tags is-size-7">
                    <p>Tags:</p>
                    {tags.length > 0 &&
                        tags.map((name) => {
                            return <Tag name={name} key={name} />;
                        })}
                    {!addingTag ? (
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            onClick={() => setAddingTag(true)}
                        />
                    ) : (
                        <form onSubmit={addTag}>
                            <input
                                id={`${name}-new-tag`}
                                className="tag"
                                type="text"
                                placeholder="New Tag"
                                onChange={(e) => {
                                    setNewTag(e.target.value);
                                    setNewTagError(null);
                                }}
                                value={newTag}
                            />
                            <FontAwesomeIcon
                                icon={faMinusCircle}
                                onClick={removeTagAdd}
                            />
                        </form>
                    )}
                    {newTagError && (
                        <span className="is-danger">{newTagError}</span>
                    )}
                </div>
            </Card.Content>
        </Card>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

export default Item;
