import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Home = (props) => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const { data } = await axios.get("/api/user");
                setBoards(data.boards);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserData();
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

    return (
        <div>
            <h1>Home</h1>
            <h2>Your Boards</h2>
            {boards.map(({ name, items }) => {
                return (
                    <div>
                        <h3>{name}</h3>
                        <ul>
                            {items.map(
                                ({
                                    name,
                                    priority,
                                    notes,
                                    status,
                                    blocker,
                                    repeat,
                                    tags
                                }) => {
                                    return (
                                        <li>
                                            {name}
                                            {tags.length > 0 && (
                                                <span>
                                                    {` (${tags.join(", ")})`}
                                                </span>
                                            )}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default withRouter(Home);
