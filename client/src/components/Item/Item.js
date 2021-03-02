import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";
import "./item.scss";

const Item = ({ item }) => {
    const { name, priority, status, tags, notes, blocker, repeat } = item;

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
                    <FontAwesomeIcon icon={faPlusCircle} />{" "}
                </div>
            </Card.Content>
        </Card>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

export default Item;
