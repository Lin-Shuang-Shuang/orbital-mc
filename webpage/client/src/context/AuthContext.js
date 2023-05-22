import React from 'react';
import {useState, useEffect, useContext, useReducer} from 'react';

export const authContext = React.createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return { user: action.payload };
      case 'logout':
        return { user: null };
      default:
        return state;
    }
}
  
export default function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null
      })

      useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {
          dispatch({ type: 'login', payload: user }) 
        }
      }, [])
    return(
        <authContext.Provider value = {{...state, dispatch}}>
            {children}
        </authContext.Provider>
    )
}
