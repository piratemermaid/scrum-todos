const { Router } = require("express");
const { knex } = require("../models/config");
const bcrypt = require("bcrypt");
const {
    getAccount,
    getAccountByEmail,
    hash,
    Session,
    setSession
} = require("../helpers/account");

const router = new Router();

router.post("/signup", async (req, res, next) => {
    const { username, email, password, passwordMatch } = req.query;

    if (password !== passwordMatch) {
        res.status(401).send("Passwords do not match");
        return;
    }

    const accountExists = await getAccount(username);
    if (accountExists) {
        res.status(401).send("Username or email taken");
        return;
    }

    const emailExists = await getAccountByEmail(email);
    if (emailExists) {
        res.status(401).send("Username or email taken");
        return;
    }

    try {
        await knex("users").insert({
            username,
            email,
            password: hash(password)
        });
        res.send({ signup: "success" });
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.query;

    let account = await getAccount(username);
    if (!account) {
        account = await getAccountByEmail(username);
    }

    if (!account) {
        res.status(401).send("Incorrect username/password");
        return;
    } else {
        if (await bcrypt.compare(password, account.password)) {
            setSession({
                username,
                res,
                sessionId: account.sessionId
            }).then(() => {
                res.send({ login: "success" });
            });
        } else {
            res.status(401).send("Incorrect username/password");
        }
    }
});

router.get("/logout", async (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    await knex("users")
        .where({ username })
        .update({ sessionId: null })
        .then(() => {
            res.clearCookie("sessionString");

            res.send({ logout: "success" });
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/authenticated", async (req, res) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        res.send({ authenticated: false });
    } else {
        const { username, id } = Session.parse(sessionString);
        const account = await getAccount(username);

        let authenticated = false;
        if (account) {
            authenticated = account.sessionId === id;
        }

        if (authenticated) {
            res.send({ authenticated: true });
        } else {
            res.send({ authenticated: false });
        }
    }
});

module.exports = router;
