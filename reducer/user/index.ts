import { userTypes } from "./types";
import { initUser } from "../init";

const userReducer = (state = initUser, action: any)=>{

    switch (action.type){
        case userTypes.UNAUTHENTICATED:
        return {
            authToken: "",
            isLoading: false,
            error: null,
            asGuest: true
        };
        case userTypes.AUTH:
        return {
            authToken: "",
            isLoading: true,
            error: null,
            asGuest: true
        };
        case userTypes.AUTH_SUCCESS:
        return {
            authToken: action.payload.token,
            isLoading:false,
            userData: action.payload.user,
            asGuest: false,
            error:null
        };
        case userTypes.AUTH_FAILURE:
        return{
            asGuest: true,
            authToken: "",
            isLoading: false,
            error: action.payload
        };
        default:
        return state;
    }
}

export default userReducer