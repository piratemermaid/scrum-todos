import React, { useState, useEffect, isValidElement } from "react";
import axios from "axios";
import { withRouter } from "react-router";

import Item from "../components/Item/Item";

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const { data } = await axios.get("/api/user");
                setBoards(data.boards);
                setIsLoading(false);
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

    if (isLoading) {
        return "loading...";
    }

    console.log(isLoading, boards);
    return (
        <div>
            <h1>Home</h1>
            <h2>Your Boards</h2>
            {boards.map(({ name, items }) => {
                return (
                    <div>
                        <h3>{name}</h3>
                        <ul>
                            {items.map((item) => {
                                const { name, tags } = item;
                                return (
                                    <Item key={item.name} item={item} />
                                    // <li>
                                    //     {name}
                                    //     {tags.length > 0 && (
                                    //         <span>
                                    //             {` (${tags.join(", ")})`}
                                    //         </span>
                                    //     )}
                                    // </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default withRouter(Home);
