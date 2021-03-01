import React, { useState, useEffect, isValidElement } from "react";
import axios from "axios";
import { withRouter, useHistory } from "react-router";

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [boards, setBoards] = useState([]);

    const history = useHistory();

    useEffect(() => {
        async function fetchUserBoards() {
            try {
                const { data } = await axios.get("/api/user/boards");
                setBoards(data.boards);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserBoards();
    }, []);

    const logOut = () => {
        axios({
            method: "get",
            url: "/api/account/logout"
        })
            .then((res) => {
                if (res.data.logout === "success") {
                    props.authenticateUser(false);
                    props.history.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (isLoading) {
        return "loading...";
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Your Boards</h2>
            {boards.map(({ name }) => {
                return (
                    <div
                        onClick={() => {
                            history.push(`/board/${name}`);
                        }}
                    >
                        <h3>{name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default withRouter(Home);
