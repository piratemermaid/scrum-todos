const tableOrder = require("../tableOrder");

module.exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.string("sessionId");
    });

    await knex.schema.createTable("items", (table) => {
        table.increments("id");
        table.integer("priority");
        table.string("name");
        table.string("notes");
        table.string("status");
        table.string("blocker");
        table.string("repeat");
    });

    await knex.schema.createTable("tags", (table) => {
        table.increments("id");
        table.string("name");
    });

    await knex.schema.createTable("users_items", (table) => {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.integer("item_id").references("id").inTable("items");
    });

    await knex.schema.createTable("items_tags", (table) => {
        table.increments("id");
        table.integer("item_id").references("id").inTable("items");
        table.integer("tag_id").references("id").inTable("tags");
    });
};

module.exports.down = async function (knex) {
    for (let i = tableOrder.length; i >= 0; i--) {
        await knex.schema.dropTableIfExists(tableOrder[i]);
    }
};
