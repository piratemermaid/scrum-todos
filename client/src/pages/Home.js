import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory } from "react-router";
import BoardsContext from "../context/BoardsContext";

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const boards = useContext(BoardsContext);

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
        <div>
            <h1>Home</h1>
            <h2 className="is-size-3">Your Boards</h2>
            {boards.map(({ name }) => {
                return (
                    <div
                        onClick={() => {
                            history.push(`/board/${name}`);
                        }}
                        key={name}
                    >
                        <h3 className="board-name is-size-4">{name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default withRouter(Home);
