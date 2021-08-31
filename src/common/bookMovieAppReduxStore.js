import {createStore} from "redux";


const initialState={
    "storeValues":[]
}

const bookMovieAppReducer= (state=initialState,action)=>{
    switch (action.type){
        case "REGISTER_USER":
            return {...state,"storeValues":action.payload}
        default:
            return state;
    }
}

export default createStore(bookMovieAppReducer);