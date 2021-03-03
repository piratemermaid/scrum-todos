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
    constructor() {
        super();

        this.state = { authenticated: false, boards: null };

        this.authenticateUser = this.authenticateUser.bind(this);
    }

    authenticateUser(bool) {
        this.setState({ authenticated: bool });
    }

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

        return (
            <BoardsContext.Provider value={this.state.boards}>
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
                                        authenticateUser={this.authenticateUser}
                                    />
                                )}
                            />
                            <Route
                                path="/board/:name"
                                render={() => (
                                    <AuthBoard
                                        authenticated={authenticated}
                                        authenticateUser={this.authenticateUser}
                                    />
                                )}
                            />
                            <Route
                                path="/login"
                                render={() => (
                                    <Login
                                        authenticateUser={this.authenticateUser}
                                    />
                                )}
                            />
                            <Route
                                path="/signup"
                                render={() => (
                                    <Signup
                                        authenticateUser={this.authenticateUser}
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
