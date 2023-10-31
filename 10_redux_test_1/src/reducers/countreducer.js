// Define the initial state
const initialState = {
  count: 0,
};

// Create the countReducer function
const countReducer = (state = initialState, action) => {
    console.log("countreducer,action",action)
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default countReducer;
