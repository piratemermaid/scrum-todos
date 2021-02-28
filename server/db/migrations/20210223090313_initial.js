const tableOrder = require("../tableOrder");

module.exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.string("sessionId");
    });

    await knex.schema.createTable("boards", (table) => {
        table.increments("id");
        table.string("name");
    });

    await knex.schema.createTable("users_boards", (table) => {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.integer("board_id").references("id").inTable("boards");
    });

    await knex.schema.createTable("items", (table) => {
        table.increments("id");
        table.string("label");
        table.string("desc");
        table.string("status");
    });

    await knex.schema.createTable("items_boards", (table) => {
        table.increments("id");
        table.integer("item_id").references("id").inTable("items");
        table.integer("board_id").references("id").inTable("boards");
    });
};

module.exports.down = async function (knex) {
    for (let i = tableOrder.length; i >= 0; i--) {
        await knex.schema.dropTableIfExists(tableOrder[i]);
    }
};
