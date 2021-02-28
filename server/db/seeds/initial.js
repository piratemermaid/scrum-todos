const tableOrder = require("../tableOrder");

exports.seed = async function (knex) {
    for (let i in tableOrder) {
        await resetTable(knex, tableOrder[i]);
    }
};

// delete table and reset to start at id 1
const resetTable = async (knex, tableName) => {
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
};
