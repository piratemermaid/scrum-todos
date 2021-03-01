const _ = require("lodash");
const { Router } = require("express");
const models = require("../models/bookshelf_models");
const { Session } = require("../helpers/account");

const router = new Router();

router.get("/", async (req, res) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userData = await new models.User({ username }).fetch({
            withRelated: ["boards.items.tags"]
        });

        res.send({
            boards: userData.toJSON().boards.map(({ name, items }) => {
                return {
                    name,
                    items: items.map(
                        ({
                            name,
                            priority,
                            notes,
                            status,
                            blocker,
                            repeat,
                            tags
                        }) => {
                            return {
                                name,
                                priority,
                                notes,
                                status,
                                blocker,
                                repeat,
                                tags: tags.map(({ name }) => {
                                    return name;
                                })
                            };
                        }
                    )
                };
            })
        });
    }
});

router.get("/boards", async (req, res) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userData = await new models.User({ username }).fetch({
            withRelated: ["boards"]
        });

        res.send({
            boards: userData.toJSON().boards.map(({ name }) => {
                return { name };
            })
        });
    }
});

router.get("/board_items", async (req, res) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const { name } = req.query;

        const userData = await new models.User({ username }).fetch({
            withRelated: ["boards.items.tags"]
        });

        const board = _.find(userData.toJSON().boards, { name });

        res.send({
            items: board.items.map(
                ({ name, priority, notes, status, blocker, repeat, tags }) => {
                    return {
                        name,
                        priority,
                        notes,
                        status,
                        blocker,
                        repeat,
                        tags: tags.map(({ name }) => {
                            return name;
                        })
                    };
                }
            )
        });
    }
});

module.exports = router;
