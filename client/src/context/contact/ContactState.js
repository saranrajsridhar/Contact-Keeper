import React,{useReducer} from 'react';  //userreducer is like a redux which is used to go to previous state or next state.
  //At first we are trying to hardcode using static data so we need a uuid whiich is given by react,. 
import contactContext from  './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';

import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,

    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

//state where the data from the UI is gahter and working of add deletee ect is dobe.

const ContactState = props=>{
    const initialState={
        contacts:null,
        current:null,
        filtered:null,
        error:null
    };
    //state allows to access inside stat,dispatch the obj to reducer 
    const[state,dispatch]=useReducer(contactReducer,initialState);

    //GET CONTACT
    const getContacts=async contact=>{
        try {
            const res=await axios.get('/api/contacts');
            dispatch({
                type:GET_CONTACTS,
                payload:res.data});
            
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.res.msg});
            
        }
        

    };


   

    //ADD Contact
    const addContact=async contact=>{
        const config={
            headers:{
                'Content-Type':'application/json'  //setting the header format
            }
        }
        try {
            const res=await axios.post('/api/contacts',contact,config);
            dispatch({
                type:ADD_CONTACT,
                payload:res.data});
            
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.res.msg});
            
        }
        

    };

       //Update Contact
       const updateContact=async contact=>{
        const config={
            headers:{
                'Content-Type':'application/json'  //setting the header format
            }
        }
        try {
            const res=await axios.put(`/api/contacts/${contact._id}`,contact,config);
            dispatch({type:UPDATE_CONTACT,payload:res.data});
            
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg});
            
        }
        
       

    };


    //Clear Contact
    const clearContacts=()=>{
        dispatch({type:CLEAR_CONTACTS});

    };


    //Delete Contact
    const deleteContact=async id=>{
        try {
            await axios.delete(`/api/contacts/${id}`);
          
        dispatch({type:DELETE_CONTACT,payload:id});

            
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.res.msg});
            
        }
        
      
      

    };

    //Set Current Contact
    const setCurrent=contact=>{
        
        dispatch({type:SET_CURRENT,payload:contact});

    };

    //Clear Current Contact
    const clearCurrent=()=>{
        dispatch({type:CLEAR_CURRENT});

    };



 

    //Filter Contacts

    const filterContacts=text=>{
        
        dispatch({type:FILTER_CONTACTS,payload:text});

    };



    //Clear Filter
    const clearFilter=()=>{
        dispatch({type:CLEAR_FILTER});

    };


//props.children is pass functions from parent to child components, whereas the child components make use of these functions and the functions may change the state in a parent component above.
    return (
        <contactContext.Provider
         value={{
             contacts:state.contacts,
             current:state.current,
             filtered:state.filtered,
             error:state.error,
             addContact,
             deleteContact,
             setCurrent,
             clearCurrent,
             clearFilter,
             filterContacts,
             updateContact,
             getContacts,
             clearContacts
         }}>
         {props.children}  
        </contactContext.Provider>
    );


};



export default ContactState;