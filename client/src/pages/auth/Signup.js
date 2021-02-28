import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Container } from "react-bulma-components";
import { Columns } from "react-bulma-components";
import { Form } from "react-bulma-components";
import { Button } from "react-bulma-components";
const { Field, Control, Label, Input } = Form;

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            passwordMatch: "",
            errorMessage: null
        };
    }

    onSubmit(e) {
        e.preventDefault();

        const error = this.validateFields();

        if (error) {
            this.setState({ errorMessage: error });
        } else {
            const { username, password, passwordMatch, email } = this.state;
            axios({
                method: "post",
                url: "/api/account/signup",
                params: { username, password, passwordMatch, email }
            })
                .then((res) => {
                    if (res.data.signup === "success") {
                        this.props.authenticateUser(true);
                        this.props.history.push("/");
                    }
                })
                .catch((err) => {
                    this.setState({ errorMessage: err.response.data });
                });
        }
    }

    onInputChange(e, field) {
        this.setState({ errorMessage: null });
        this.setState({ [field]: e.target.value });
    }

    validateFields() {
        const { username, password, passwordMatch, email } = this.state;

        if (!username) {
            return "Please enter a username";
        }
        if (!email) {
            return "Please enter an email";
        }
        if (!password) {
            return "Please enter a password";
        }
        if (!passwordMatch) {
            return "Please enter a matching password";
        }

        if (username.length < 8) {
            return "Please enter a longer username";
        }
        if (password.length < 10) {
            return "Please enter a password of at least 10 characters";
        }
        if (passwordMatch !== password) {
            return "Please enter a matching password";
        }
        if (!validateEmail) {
            return "Invalid email";
        }
    }

    render() {
        const {
            username,
            email,
            password,
            passwordMatch,
            errorMessage
        } = this.state;
        return (
            <div>
                <h1>Sign Up</h1>
                <Container>
                    <Columns className="is-centered">
                        <Columns.Column className="is-one-quarter-desktop">
                            <form onSubmit={(e) => this.onSubmit(e)}>
                                <Field>
                                    <Label className="has-text-left">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            this.onInputChange(e, "username")
                                        }
                                    />
                                </Field>
                                <Field>
                                    <Label className="has-text-left">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            this.onInputChange(e, "email")
                                        }
                                    />
                                </Field>
                                <Field>
                                    <Label className="has-text-left">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            this.onInputChange(e, "password")
                                        }
                                    />
                                </Field>
                                <Field>
                                    <Label className="has-text-left">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="passwordMatch"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={passwordMatch}
                                        onChange={(e) =>
                                            this.onInputChange(
                                                e,
                                                "passwordMatch"
                                            )
                                        }
                                    />
                                </Field>
                                <div className="form-error">{errorMessage}</div>
                                <button
                                    type="button"
                                    onClick={(e) => this.onSubmit(e)}
                                >
                                    Sign Up
                                </button>
                            </form>
                            <div>
                                Already have an account?{" "}
                                <Link to="/login">Log In</Link>
                            </div>
                        </Columns.Column>
                    </Columns>
                </Container>
            </div>
        );
    }
}

function validateEmail(email) {
    //eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default withRouter(Signup);
