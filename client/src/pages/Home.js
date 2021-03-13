import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory } from "react-router";
import BoardsContext from "../context/BoardsContext";
import { Columns, Card } from "react-bulma-components";
import "../styles/home.scss";

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const { boards } = useContext(BoardsContext);

    const history = useHistory();

    useEffect(() => {
        if (boards) {
            setIsLoading(false);
        }
    }, [boards]);

    if (isLoading) {
        return "loading...";
    }

    return (
        <div id="home">
            <h1>Home</h1>
            <h2 className="is-size-3">Your Boards</h2>
            {boards.map(({ name, items }) => {
                return (
                    <Columns className="is-centered board-list">
                        <Columns.Column className="has-text-centered is-one-third">
                            <Card
                                className="board-card"
                                onClick={() => {
                                    history.push(`/board/${name}`);
                                }}
                                key={name}
                            >
                                <Card.Content>
                                    <h3 className="board-name is-size-4">
                                        {name}
                                    </h3>
                                    <p>{items.length} items</p>
                                </Card.Content>
                            </Card>
                        </Columns.Column>
                    </Columns>
                );
            })}
        </div>
    );
};

export default withRouter(Home);
