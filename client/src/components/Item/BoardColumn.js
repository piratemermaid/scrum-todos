import React, { useState } from "react";
import { Columns } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import AddItemCard from "./AddItemCard";

const BoardColumn = ({ title, items, board }) => {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <Columns.Column>
            <h2 className="is-size-4">
                {title}{" "}
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="is-size-6"
                    onClick={() => setIsAdding(true)}
                />
            </h2>
            {isAdding && (
                <AddItemCard
                    status={title}
                    board={board}
                    stopAdding={() => setIsAdding(false)}
                />
            )}
            {items && items.length > 0
                ? items.map((item) => {
                      return <Item item={item} key={item.name} board={board} />;
                  })
                : "No items"}
        </Columns.Column>
    );
};

export default BoardColumn;
