const { bookshelf } = require("./config");

const User = bookshelf.model("User", {
    tableName: "users",
    boards() {
        return this.belongsToMany("Board", "users_boards");
    }
});

const Board = bookshelf.model("Board", {
    tableName: "boards",
    items() {
        return this.belongsToMany("Item", "boards_items");
    }
});

const Item = bookshelf.model("Item", {
    tableName: "items",
    tags() {
        return this.belongsToMany("Tag", "items_tags");
    }
});

const Tag = bookshelf.model("Tag", {
    tableName: "tags"
});

module.exports = { User };
