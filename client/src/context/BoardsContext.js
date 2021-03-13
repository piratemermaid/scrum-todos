import React from "react";

const BoardContext = React.createContext({
    boards: [],
    addItem: () => {},
    addItemErr: null
});

export default BoardContext;
