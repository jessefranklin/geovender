const intialState = {
    draft: [],
    published: []
}

export default posts = (state = intialState, action) => {
    switch (action.type) {
        case 'PROFILE_POSTS': {
            return { draft: action.draft, published: action.published }
        }
        default:
            return state;
    }
    return state;
} 