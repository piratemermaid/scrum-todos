import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import "react-bulma-components/dist/react-bulma-components.min.css";

import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { authenticated: false };

        this.authenticateUser = this.authenticateUser.bind(this);
    }

    authenticateUser(bool) {
        this.setState({ authenticated: bool });
    }

    logOut = () => {
        axios({
            method: "get",
            url: "/api/account/logout"
        })
            .then((res) => {
                if (res.data.logout === "success") {
                    this.authenticateUser(false);
                    this.props.history.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
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
    }

    render() {
        const { authenticated } = this.state;

        const AuthHome = RequireAuth(Home);
        const AuthBoard = RequireAuth(Board);

        return (
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
        );
    }
}

export default App;
