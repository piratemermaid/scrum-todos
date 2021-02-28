const { hash } = require("../../api/helpers/account");

module.exports = {
    tags: ["Todos", "Daily", "Workout", "Stardew"],
    items: [
        {
            name: "Pay excise tax",
            notes: "",
            status: "todo",
            tags: ["Todos"]
        },
        {
            name: "Take out trash",
            notes: "",
            status: "todo",
            tags: ["Todos"],
            repeat: "weekly"
        },
        {
            name: "Set up new bank account",
            notes: "",
            status: "inprogress",
            tags: ["Todos"],
            blocker: "Awaiting customer service response"
        },
        {
            name: "Pullups",
            notes: "",
            status: "todo",
            repeat: "daily",
            tags: ["Todos", "Daily", "Workout"]
        },
        {
            name: "Yoga or Stretch",
            notes: "",
            status: "done",
            repeat: "daily",
            tags: ["Todos", "Daily", "Workout"]
        },
        {
            name: "Upgrade watering can",
            notes: "",
            status: "todo",
            tags: ["Stardew"]
        },
        {
            name: "Fill barn with animals",
            notes: "2 pigs, 2 sheep (max animals 12)",
            status: "inprogress",
            tags: ["Stardew"]
        }
        // {
        //     name: "",
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
