import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Container } from "react-bulma-components";
import { Columns } from "react-bulma-components";
import { Form } from "react-bulma-components";
import { Button } from "react-bulma-components";
const { Field, Control, Label, Input } = Form;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: null
        };
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        axios({
            method: "post",
            url: "/api/account/login",
            params: { username, password }
        })
            .then((res) => {
                if (res.data.login === "success") {
                    this.props.authenticateUser(true);
                    if (this.props.playthrough) {
                        this.props.history.push("/");
                    } else {
                        this.props.history.push("/new_playthrough");
                    }
                }
            })
            .catch((err) => {
                this.setState({ errorMessage: err.response.data });
            });
    }

    onInputChange(e, field) {
        this.setState({ errorMessage: null });
        this.setState({ [field]: e.target.value });
    }

    render() {
        const { username, password, errorMessage } = this.state;
        return (
            <div>
                <h1>Log In</h1>
                <Container>
                    <Columns className="is-centered">
                        <Columns.Column className="is-one-quarter-desktop">
                            <form onSubmit={(e) => this.onSubmit(e)}>
                                <Field>
                                    <Label className="has-text-left">
                                        Username
                                    </Label>
                                    <Control>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="username"
                                            value={username}
                                            onChange={(e) =>
                                                this.onInputChange(
                                                    e,
                                                    "username"
                                                )
                                            }
                                        />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label className="has-text-left">
                                        Password
                                    </Label>
                                    <Control>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) =>
                                                this.onInputChange(
                                                    e,
                                                    "password"
                                                )
                                            }
                                        />
                                    </Control>
                                </Field>
                                <div className="form-error">{errorMessage}</div>
                                <Button
                                    type="submit"
                                    onClick={(e) => this.onSubmit(e)}
                                >
                                    Log In
                                </Button>
                                <div>
                                    Don't have an account yet?{" "}
                                    <Link to="/signup">Sign Up</Link>
                                </div>
                            </form>
                        </Columns.Column>
                    </Columns>
                </Container>
            </div>
        );
    }
}

export default withRouter(Login);
