import React, { useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Container } from "react-bulma-components";
import { Columns } from "react-bulma-components";
import { Form } from "react-bulma-components";
import { Button } from "react-bulma-components";
const { Field, Control, Label, Input } = Form;

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState("");
    const [formError, setFormError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        const error = validateFields();

        if (error) {
            setFormError(error);
        } else {
            try {
                const { data } = await axios({
                    method: "post",
                    url: "/api/account/signup",
                    params: { username, password, passwordMatch, email }
                });
                if (data.signup === "success") {
                    alert("SIGNUP");
                }
            } catch (err) {
                setFormError(err.response.data);
            }
        }
    };

    // const onInputChange = (e, field) => {
    //     setFormError(null);
    //     // this.setState({ [field]: e.target.value });
    // };

    const validateFields = () => {
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
        if (!validateEmail(email)) {
            return "Invalid email";
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <Container>
                <Columns className="is-centered">
                    <Columns.Column className="is-one-quarter-desktop">
                        <form onSubmit={onSubmit}>
                            <Field>
                                <Label className="has-text-left">
                                    Username
                                </Label>
                                <Control>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label className="has-text-left">Email</Label>
                                <Control>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
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
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Control>
                            </Field>
                            <Field>
                                <Label className="has-text-left">
                                    Confirm Password
                                </Label>
                                <Control>
                                    <Input
                                        id="passwordMatch"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={passwordMatch}
                                        onChange={(e) =>
                                            setPasswordMatch(e.target.value)
                                        }
                                    />
                                </Control>
                            </Field>
                            <div className="form-error">{formError}</div>
                            <Button type="submit" onClick={onSubmit}>
                                Sign Up
                            </Button>
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
};

function validateEmail(email) {
    //eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default withRouter(Signup);
