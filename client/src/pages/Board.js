import _ from "lodash";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Container, Columns, Modal } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Item from "../components/Item/Item";
import AddItemModal from "../components/Item/AddItemModal";
import BoardsContext from "../context/BoardsContext";
import "../styles/board.scss";

const Board = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const boards = useContext(BoardsContext);

    const { name } = props.match.params;

    useEffect(() => {
        if (boards) {
            const board = _.find(boards, { name });
            setItems(getItemsByStatus(board.items));
            setIsLoading(false);
        }
    }, [boards]);

    if (isLoading) {
        return "loading...";
    }

    const open = () => setShowModal(true);
    const close = () => setShowModal(false);

    return (
        <Container id="board">
            <h1 className="is-size-3">{name}</h1>
            <div className="show-modal" onClick={open}>
                New Item <FontAwesomeIcon icon={faPlusCircle} />
                <Modal show={showModal} onClose={close}>
                    <AddItemModal close={close} {...props.modal} />
                </Modal>
            </div>
            <Columns>
                <Columns.Column>
                    <h2 className="is-size-4">To Do</h2>
                    {items.todo.map((item) => {
                        return (
                            <Item item={item} key={item.name} board={name} />
                        );
                    })}
                </Columns.Column>
                <Columns.Column>
                    <h2 className="is-size-4">In Progress</h2>
                    {items.inprogress.map((item) => {
                        return (
                            <Item item={item} key={item.name} board={name} />
                        );
                    })}
                </Columns.Column>
                <Columns.Column>
                    <h2 className="is-size-4">Done</h2>
                    {items.done.map((item) => {
                        return (
                            <Item item={item} key={item.name} board={name} />
                        );
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
