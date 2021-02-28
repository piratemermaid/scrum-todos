const { keyBy } = require("lodash");
const tableOrder = require("../tableOrder");
const seedData = require("../data/seedData");
const { users, tags, items } = seedData;

exports.seed = async function (knex) {
    for (let i = tableOrder.length - 1; i >= 0; i--) {
        await resetTable(knex, tableOrder[i]);
    }

    await knex("users").insert(users).returning("*");

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

    await knex("users_items").insert(
        items.map(({ name }) => {
            return { item_id: itemsByName[name].id, user_id: 1 };
        })
    );
};

// delete table and reset to start at id 1
const resetTable = async (knex, tableName) => {
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
};
