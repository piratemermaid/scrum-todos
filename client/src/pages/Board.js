import _ from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { Container, Columns } from "react-bulma-components";
import BoardColumn from "../components/Item/BoardColumn";
import "../styles/board.scss";
import BoardContext from "../context/BoardsContext";

const Board = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    const { boards } = useContext(BoardContext);

    const { name } = props.match.params;

    useEffect(() => {
        if (boards) {
            const board = _.find(boards, { name });
            setItems(getItemsByStatus(board.items));
            if (isLoading) {
                setIsLoading(false);
            }
        }
    }, [boards]);

    if (isLoading) {
        return "loading...";
    }

    return (
        <Container id="board">
            <h1 className="is-size-3">{name}</h1>
            <Columns>
                <BoardColumn title="To Do" items={items.todo} board={name} />
                <BoardColumn
                    title="In Progress"
                    items={items.inprogress}
                    board={name}
                />
                <BoardColumn title="Done" items={items.done} board={name} />
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
