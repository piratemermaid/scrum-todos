import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Card } from "react-bulma-components";

const Item = ({ item }) => {
    const { name, priority, status, tags, notes, blocker, repeat } = item;

    return (
        <Card>
            <Card.Header>
                <Card.Header.Title>{name}</Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <ul>
                    <li>Status: {status}</li>
                    <li>Priority: {priority}</li>
                    <li>Tags: {tags.join(", ")}</li>
                    {notes && <li>Notes: {notes}</li>}
                    {blocker && <li>Blocker: {blocker}</li>}
                    {repeat && <li>Repeat: {repeat}</li>}
                </ul>
            </Card.Content>
        </Card>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

export default Item;
