const intialState = {
    results: []
}

export default posts = (state = intialState, action) => {
    switch (action.type) {
        case 'GEO_POSTS': {
            return action.payload
        }
        default:
            return state;
    }
    return state;
} 