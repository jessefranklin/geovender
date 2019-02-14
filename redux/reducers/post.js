const intialState = {
    results: []
}

export default posts = (state = intialState, action) => {
    switch (action.type) {
        case 'POST_JOB': {
            return action.payload
        }
        case 'POST_IMAGES': {
            return { ...state, images: action.payload }
        }
        default:
            return state;
    }
    return state;
} 