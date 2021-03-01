const { keyBy } = require("lodash");
const tableOrder = require("../tableOrder");
const seedData = require("../data/seedData");
const { users, boards, tags, items } = seedData;

exports.seed = async function (knex) {
    for (let i = tableOrder.length - 1; i >= 0; i--) {
        await resetTable(knex, tableOrder[i]);
    }

    await knex("users").insert(users).returning("*");

    const boardsByName = keyBy(
        await knex("boards")
            .insert(
                boards.map((name) => {
                    return { name };
                })
            )
            .returning("*"),
        "name"
    );

    await knex("users_boards").insert(
        boards.map((name) => {
            return { user_id: 1, board_id: boardsByName[name].id };
        })
    );

    const itemsByName = keyBy(
        await knex("items")
            .insert(
                items.map(({ name, notes, status, blocker, repeat }, i) => {
                    return {
                        priority: i,
                        name,
                        notes: notes || "",
                        status: status || "todo",
                        blocker: blocker || null,
                        repeat: repeat || null
                    };
                })
            )
            .returning("*"),
        "name"
    );

    await knex("boards_items").insert(
        items.map(({ name, board }) => {
            return {
                board_id: boardsByName[board].id,
                item_id: itemsByName[name].id
            };
        })
    );

    const tagsByName = keyBy(
        await knex("tags")
            .insert(
                tags.map((tag) => {
                    return { name: tag };
                })
            )
            .returning("*"),
        "name"
    );

    let itemsTags = [];
    items.map(({ name, tags }) => {
        tags.map((tag) => {
            itemsTags.push({
                item_id: itemsByName[name].id,
                tag_id: tagsByName[tag].id
            });
        });
    });

    await knex("items_tags").insert(itemsTags);
};

// delete table and reset to start at id 1
const resetTable = async (knex, tableName) => {
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
};
