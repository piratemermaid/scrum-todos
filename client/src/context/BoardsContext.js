import React from "react";

const BoardContext = React.createContext({
    boards: [],
    addItem: () => {}
});

export default BoardContext;
