const initialState = {
    todoList: [
        {id: '1', status: "incomplete", time: "12/13/2022, 8:39:55 PM", title: "test"}
    ]
};

const todoReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        default:
            return state;
    }

};

export default todoReducer;