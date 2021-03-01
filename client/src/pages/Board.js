import axios from "axios";
import React, { useState, useEffect } from "react";

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

    return <h1>{name}</h1>;
};

export default Board;
