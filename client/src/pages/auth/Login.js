import React, { useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Container } from "react-bulma-components";
import { Columns } from "react-bulma-components";
import { Form } from "react-bulma-components";
import { Button } from "react-bulma-components";
const { Field, Control, Label, Input } = Form;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: "/api/account/login",
            params: { username, password }
        })
            .then((res) => {
                if (res.data.login === "success") {
                    alert("LOGIN");
                }
            })
            .catch((err) => {
                setFormError(err.response.data);
            });
    };

    const onInputChange = (e, field) => {
        setFormError(null);
        // this.setState({ [field]: e.target.value });
    };

    return (
        <div>
            <h1>Log In</h1>
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
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
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
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Control>
                            </Field>
                            <div className="form-error">{formError}</div>
                            <Button type="submit" onClick={onSubmit}>
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
};

export default withRouter(Login);
