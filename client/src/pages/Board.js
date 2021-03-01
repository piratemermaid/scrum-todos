import _ from "lodash";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Columns } from "react-bulma-components";
import Item from "../components/Item/Item";

const Board = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    const { name } = props.match.params;

    useEffect(() => {
        async function fetchItems() {
            const { data } = await axios.get("/api/user/board_items", {
                params: { name }
            });
            setItems(getItemsByStatus(data.items));
            setIsLoading(false);
        }
        fetchItems();
    }, []);

    if (isLoading) {
        return "loading...";
    }

    return (
        <Container>
            <h1>{name}</h1>
            <Columns>
                <Columns.Column>
                    <h2>To Do</h2>
                    {items.todo.map((item) => {
                        return <Item item={item} key={item.name} />;
                    })}
                </Columns.Column>
                <Columns.Column>
                    <h2>In Progress</h2>
                    {items.inprogress.map((item) => {
                        return <Item item={item} key={item.name} />;
                    })}
                </Columns.Column>
                <Columns.Column>
                    <h2>Done</h2>
                    {items.done.map((item) => {
                        return <Item item={item} key={item.name} />;
                    })}
                </Columns.Column>
            </Columns>
        </Container>
    );
};

/**
 * Order items first by status and then by priority
 */
const getItemsByStatus = (items) => {
    let itemsInOrder = {
        todo: sortItems(_.filter(items, { status: "todo" })),
        inprogress: sortItems(_.filter(items, { status: "inprogress" })),
        done: sortItems(_.filter(items, { status: "done" }))
    };

    return itemsInOrder;
};

const sortItems = (items) => {
    return _.sortBy(items, "priority");
};

export default Board;
