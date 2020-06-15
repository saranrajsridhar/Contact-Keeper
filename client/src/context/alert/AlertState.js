import React,{useReducer} from 'react';  
 import alertContext from  './alertContext';
import alertReducer from './alertReducer';
import {v4 as uuidv4} from 'uuid';
import {
SET_ALERT,
REMOVE_ALERT
} from '../types';


//we import context,reducer and type in the AUTHSTATE file.

//state where the data from the UI is gahter and working of add deletee ect is dobe.

const AlertState = props=>{
    const initialState=[];

     //state allows to access inside stat,dispatch the obj from reducer 
     const[state,dispatch]=useReducer(alertReducer,initialState);

//setAlert

const setAlert=(msg,type,timeout=5000)=>{

    const id=uuidv4();
    dispatch({
        type:SET_ALERT,
        payload:{msg,type,id}
    });
    setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),timeout)
}
   
   



//props.children is pass functions from parent to child components, whereas the child components make use of these functions and the functions may change the state in a parent component above.
    return (
        <alertContext.Provider
         value={{
             alerts:state,
             setAlert
            
         }}>
         {props.children}  
        </alertContext.Provider>
    );


};



export default AlertState;







/*OUr motive is to reduce the code so we keep on class 
where we define the state and get the data from there UI part */