import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';





//usestate is a hook
//in this register.js we use jsx format and we use usesate hook the forward the data.

const Register=(props)=>{

    const alertContext=useContext(AlertContext);
  
    const authContext=useContext(AuthContext); //getting the register,login function from reducer via context and passing it from register.js to auth.state
  
    const{setAlert}=alertContext;
   
    const{register,error,clearErrors,isAuthenticated}=authContext;  //the reason im importing the error is to show that userexist in the ui.
       
    useEffect(()=>{

        if(isAuthenticated){
            props.history.push('/'); //if the user is registered he will be authenticated home using the jwt......
        }
        if(error==='User already exists'){
            setAlert(error,'danger');
            clearErrors(); //after sometime the error will get cleared...
        }
     //eslint-disable-next-line
    },[error,isAuthenticated,props.history]);  // we are passing this object.
    
    
    
    const[user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2}=user;

    const onChange=e=>setUser({...user,[e.target.name]:e.target.value}); //whenever we type in the register form it will change it dynamically..
   
   
    const onSubmit=e=>{
        e.preventDefault();

        if(name=== ''|| email ===''|| password ===''){
            setAlert('Please Enter all the fields','danger');

        }else if(password!==password2){
            setAlert('Password doesnt match','danger');
        }
        else{
           register({
               name,
               email,
               password
           });
        }
      
    };
    return(
        <div className="form-container">
            <h1>
                Account<span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} minLength='6' required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} minLength='6' required/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>


        </div>
    )
}



export default Register;




/*when a user is registered it will go to loaduser and get the data from the BE */