// Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language

import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import axios from 'axios'

import { CLEAR_ALERT, DISPLAY_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR } from "./actions";


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user:null,
    token:null,
    userLocation:'',
    jobLocation:'',
}

// declaring appContext as the global context
// In context of what?
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // called reducer function with state being the initialState

    const displayAlert = () => {
        dispatch({ 
            type: DISPLAY_ALERT
        })
        clearAlert();
    }

    const clearAlert=()=>{
        setTimeout(()=>{
            dispatch({type: CLEAR_ALERT})
        },3000)
    }

    const registerUser = async (currentUser) =>{
        dispatch({type:REGISTER_USER_BEGIN})
        try{
            const response = await axios.post('/api/v1/auth/register',currentUser) 
            console.log(response)
            const {user,token,location} = response.data
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload: {user,token,location},
            })
            // local storage later
        }
        catch(error){
            console.log(error.response);
            dispatch({type:REGISTER_USER_ERROR, payload : {msg:error.response.data.msg}} )
        }
        clearAlert()
    }

    return <AppContext.Provider value={{ ...state,displayAlert,registerUser }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, initialState, useAppContext }