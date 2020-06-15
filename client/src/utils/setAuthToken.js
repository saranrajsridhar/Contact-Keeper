import axios from 'axios';


const setAuthToken=token=>{
      //if the token is present we add the header or else we delete it.
    if(token){
        axios.defaults.headers.common['x-auth-token']=token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}


export default setAuthToken;