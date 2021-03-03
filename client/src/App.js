import _ from "lodash";
import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import RequireAuth from "./components/RequireAuth";
import BoardsContext from "./context/BoardsContext";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./styles/main.scss";

class App extends Component {
    state = { authenticated: false, boards: null };

    authenticateUser(bool) {
        this.setState({ authenticated: bool });
    }

    addItem = (item, board) => {
        const { boards } = this.state;
        let newBoards = boards;
        const boardIndex = _.findIndex(boards, { name: board });
        let newItems = boards[boardIndex].items;
        newItems.push({ ...item });
        newBoards[boardIndex].items = newItems;
        this.setState({ boards: newBoards });
    };

    logOut = async () => {
        await axios({
            method: "get",
            url: "/api/account/logout"
        });
    };

    async componentDidMount() {
        await axios({
            method: "get",
            url: "/api/account/authenticated"
        })
            .then((res) => {
                this.setState({ authenticated: res.data.authenticated });
            })
            .catch((err) => {
                console.log(err);
            });

        try {
            const { data } = await axios.get("/api/user");
            this.setState({ boards: data.boards });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { authenticated } = this.state;

        const AuthHome = RequireAuth(Home);
        const AuthBoard = RequireAuth(Board);

        const value = { boards: this.state.boards, addItem: this.addItem };

        return (
            <BoardsContext.Provider value={value}>
                <div className="App">
                    <BrowserRouter>
                        <header>
                            {authenticated ? (
                                <nav>
                                    <Link to="/">Home</Link>
                                    <Link to="/login" onClick={this.logOut}>
                                        Log Out
                                    </Link>
                                </nav>
                            ) : null}
                        </header>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <AuthHome
                                        authenticated={authenticated}
                                        authenticateUser={this.authenticateUser.bind(
                                            this
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path="/board/:name"
                                render={() => (
                                    <AuthBoard
                                        authenticated={authenticated}
                                        authenticateUser={this.authenticateUser.bind(
                                            this
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path="/login"
                                render={() => (
                                    <Login
                                        authenticateUser={this.authenticateUser.bind(
                                            this
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path="/signup"
                                render={() => (
                                    <Signup
                                        authenticateUser={this.authenticateUser.bind(
                                            this
                                        )}
                                    />
                                )}
                            />
                        </Switch>
                    </BrowserRouter>
                </div>
            </BoardsContext.Provider>
        );
    }
}

export default App;
