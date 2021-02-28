const { keyBy } = require("lodash");
const tableOrder = require("../tableOrder");
const seedData = require("../data/seedData");
const { tags, items } = seedData;

exports.seed = async function (knex) {

    for (let i = tableOrder.length - 1; i >= 0; i--) {
        await resetTable(knex, tableOrder[i]);
    }

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

    // TODO: users_items - create testuser
};

// delete table and reset to start at id 1
const resetTable = async (knex, tableName) => {
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
};
