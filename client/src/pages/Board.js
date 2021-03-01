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
            setItems(data.items);
            setIsLoading(false);
        }
        fetchItems();
    }, []);

    if (isLoading) {
        return "loading...";
    }

    return (
        <Container>
            <Columns>
                <h1>{name}</h1>
                {items.map((item) => {
                    return <Item item={item} key={item.name} />;
                })}
            </Columns>
        </Container>
    );
};

export default Board;
