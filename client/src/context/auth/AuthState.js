import React,{useReducer} from 'react'; 
import axios from 'axios';   //we are using for sending request.. 
 import authContext from  './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';


//we import context,reducer and type in the AUTHSTATE file.

//state where the data from the UI is gahter and working of add deletee ect is dobe.

const AuthState = props=>{
    const initialState={

        //token we generate in the nodejs side will be stored in temporary storage.

        token:localStorage.getItem('token'),
        isAuthenticated:null, //check whether he is authenticated or not
        loading:true, //loading is like working on backend.
        user:null,
        error:null
        
    };

     //state allows to access inside stat,dispatch the obj from reducer 
     const[state,dispatch]=useReducer(authReducer,initialState);

    //load user
    const loadUser=async ()=>{
       
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

        try {
            const res=await axios.get('/api/auth'); //check the auth path whether the token is valid one.
            
            dispatch({type:USER_LOADED,payload:res.data});
        } catch (error) {
            dispatch({type:AUTH_ERROR});
            
        }
    };

    //reg user
    //async keyword is used to keep promises and uses await syntax... and it is also making ab request to a backend.
    const register =async formData=>{
      const config={
    headers:{
        'Content-Type':'application/json'  //setting the header format
    }
}
//formData is one which stores key and value...
try {
    const res=await axios.post('/api/users',formData,config);

    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    });
    loadUser(); 
    //after successful register we call the token of the user.
    
} catch (error) {
    dispatch({
        type:REGISTER_FAIL,
        payload:error.response.data.msg  
    });
    
}
    }

    //login user
    const login=async formData=>{
        const config={
      headers:{
          'Content-Type':'application/json'  //setting the header format
      }
  }
  //formData is one which stores key and value...
  try {
      const res=await axios.post('/api/auth',formData,config);
  
      dispatch({
          type:LOGIN_SUCCESS,
          payload:res.data
      });
      loadUser(); 
      //after successful register we call the token of the user.
      
  } catch (error) {
      dispatch({
          type:LOGIN_FAIL,
          payload:error.response.data.msg  
      });
      
  }
      }
  

    //logout user
    const logout=()=>dispatch({type:LOGOUT});

    //clearErrors
    const clearErrors=()=>dispatch({type:CLEAR_ERRORS});
   
   



//props.children is pass functions from parent to child components, whereas the child components make use of these functions and the functions may change the state in a parent component above.
    return (
        <authContext.Provider
         value={{
             token:state.token,
             isAuthenticated:state.isAuthenticated,
             loading:state.loading,
             user:state.user,
             error:state.error,
             register,
             loadUser,
             login,
             logout,
             clearErrors
            
         }}>
         {props.children}  
        </authContext.Provider>
    );


};



export default AuthState;







/*OUr motive is to reduce the code so we keep on class 
where we define the state and get the data from there UI part */