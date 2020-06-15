import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';




//usestate is a hook
//in this login.js we use jsx format and we use usesate hook the forward the data.

const Login=(props)=>{
    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);

    const{setAlert}=alertContext;
    const{login,error,clearErrors,isAuthenticated}=authContext;


    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/'); //if the user is registered he will be authenticated home using the jwt......
        }
        if(error==='Invalid Credentials'){
            setAlert(error,'danger');
            clearErrors(); //after sometime the error will get cleared...
        }
     //eslint-disable-next-line
    },[error,isAuthenticated,props.history]);  // we are passing this object.
    
    const[user,setUser]=useState({
    
        email:'',
        password:''
    });

    const {email,password}=user;

    const onChange=e=>setUser({...user,[e.target.name]:e.target.value}); //whenever we type in the register form it will change it dynamically..
   
   
    const onSubmit=e=>{
        e.preventDefault();
        if(email ===''|| password ===''){
            setAlert('Please Enter all the fields','danger');

        }
        else{
         login({
             email,
             password
         });
        }
      
        
    }
    return(
        <div className="form-container">
            <h1>
                Account<span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>

               
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
               
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>


        </div>
    )
}



export default Login;