const { hash } = require("../../api/helpers/account");

module.exports = {
    boards: ["Todos", "Stardew"],
    tags: ["daily", "workout"],
    items: [
        {
            name: "Pay excise tax",
            board: "Todos",
            tags: [],
            notes: "",
            status: "todo"
        },
        {
            name: "Take out trash",
            board: "Todos",
            tags: [],
            notes: "",
            status: "todo",
            repeat: "weekly"
        },
        {
            name: "Set up new bank account",
            board: "Todos",
            tags: [],
            notes: "",
            status: "inprogress",
            blocker: "Awaiting customer service response"
        },
        {
            name: "Pullups",
            board: "Todos",
            tags: ["daily", "workout"],
            notes: "",
            status: "todo",
            repeat: "daily"
        },
        {
            name: "Yoga or Stretch",
            board: "Todos",
            tags: ["daily", "workout"],
            notes: "",
            status: "done",
            repeat: "daily"
        },
        {
            name: "Upgrade watering can",
            board: "Stardew",
            tags: [],
            notes: "",
            status: "todo"
        },
        {
            name: "Fill barn with animals",
            board: "Stardew",
            tags: [],
            notes: "2 pigs, 2 sheep (max animals 12)",
            status: "inprogress"
        }
        // {
        //     name: "",board:"Todos",
        //     notes: "",
        //     status: "",
        //     repeat: "",
        //     blocker: "",
        //     tags: [""]
        // },
    ],
    users: [
        {
            username: "testaccount",
            password: hash("1234"),
            email: "a@a.com"
        }
    ]
};
