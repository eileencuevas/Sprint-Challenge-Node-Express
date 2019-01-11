const initialState = {
    projects: [],
    actions: [],
    fetchingProjects: false,
    fetchingActions: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default reducer;