const intialState = {
    results: []
}

export default posts = (state = intialState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS': {
            return action.payload
        }
        default:
            return state;
    }
    return state;
} 