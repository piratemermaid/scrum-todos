module.exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").unsigned().primary();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.string("sessionId");
    });
};

module.exports.down = async function (knex) {
    const tableOrder = ["users"];
    for (let i in tableOrder) {
        await knex.schema.dropTableIfExists(tableOrder[i]);
    }
};
