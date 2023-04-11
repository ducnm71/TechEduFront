import axios from "axios";
import React, { useState } from "react";
import * as Components from './Components';
import {ToastContainer, toast } from "react-toastify";

import './style.css';
import { useEffect } from "react";

const Login = () => {
    
    const [signIn, toggle] = React.useState(true);
    const [user, setUser] = React.useState({
       email: '',
       password: '',
       role: ''
    });
    const setParams = (e) => {
       if(e.target.name === 'email') {
           setUser({...user, email: e.target.value });
       }
       if(e.target.name === 'password') {
           setUser({...user, password: e.target.value });
       }
       if(e.target.name === 'role'){
            setUser({...user, role: e.target.value})
       }
    }
    
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    })

    useEffect(() => {
        console.log(register);

    },[register])
    
    useEffect(()=> {
        console.log(user);
    },[user])

    

const submitFormLogin = async (e) => {
    e.preventDefault()
    await axios.post(`https://weak-pink-cockroach-sari.cyclic.app/${user.role}/login`,
    {
        email: user.email,
        password: user.password

    })
    .then(async (res) => {
        console.log(res.data);
        toast.success("Sign in successfully!");
        setTimeout(() =>{
            window.location.replace("https://tech-edu.vercel.app/")
        }, 1500)
        await localStorage.setItem("jwt", res.data.jwt)
        await localStorage.setItem("role", user.role)
        await localStorage.setItem('id', res.data.id)
        await localStorage.setItem("name", res.data.name)
    })
    .catch(error=> {
        toast.error(error.response.data)
    })
            
}

const submitFormRegist = async (e) =>{
    e.preventDefault()
    await axios.post(`https://weak-pink-cockroach-sari.cyclic.app/${register.role}/register`,
        {
        name: register.name,
        email: register.email,
        password: register.password
        })
        .then(async(res) =>{  
            toast.success("Sign up successfully!");
            await localStorage.setItem('class',JSON.stringify(res.data.class))
            await localStorage.setItem("jwt", res.data.jwt)
            await localStorage.setItem("role", register.role)
            setTimeout(() => {
                window.location.replace("https://tech-edu.vercel.app/")
            }, 1500)
        })
        .catch(error=> {
            toast.error(error.response.data.message)
        })
    
}

    return(
        <div className="login-body">
          <Components.Container >
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form 
                  onSubmit={submitFormRegist}
                  >
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input type='text' name="name" placeholder='Name' required onChange={(e) => {setRegister({...register,name: e.target.value})}} />
                      <Components.Input type='email' name="email" placeholder='Email' required onChange={(e) => { setRegister({...register,email: e.target.value})}} />
                      <Components.Input type='password' name="password" placeholder='Password' required onChange={(e) => { setRegister({...register,password: e.target.value})}} />
                      <div style={{'display': 'flex', 'justifyContent': 'space-around', 'width': '100%'}}>
                        <div>
                            <input type='radio' id="student" name="role" value='student' onChange={(e) => { setRegister({...register,role: e.target.value})}}/>
                            <label for='student' style={{'fontSize': '18px','fontWeight': 'bold','marginLeft':'5px'}}>Student</label>
                        </div>
                        <div>
                            <input type='radio' id="teacher" name="role" value='teacher'onChange={(e) => { setRegister({...register,role: e.target.value})}}/>
                            <label for='teacher' style={{'fontSize': '18px','fontWeight': 'bold', 'marginLeft':'5px'}}>Teacher</label>
                        </div>
                        
                      </div>
                      <Components.Button>Sign Up</Components.Button>
                      
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form 
                   onSubmit={submitFormLogin}
    
                   >
                       <Components.Title>Sign in</Components.Title>
                       <Components.Input type='email' name="email" placeholder='mail' onChange={setParams} />
                       <Components.Input type='password' name="password" placeholder='Password' onChange={setParams} />
                       <div style={{'display': 'flex', 'justifyContent': 'space-around', 'width': '100%'}}>
                        <div>
                            <input type='radio' id="student" name="role" value='student' onChange={setParams} required/>
                            <label for='student' style={{'fontSize': '18px','fontWeight': 'bold','marginLeft':'5px'}}>Student</label>
                        </div>
                        <div>
                            <input type='radio' id="teacher" name="role" value='teacher' onChange={setParams} required/>
                            <label for='teacher' style={{'fontSize': '18px','fontWeight': 'bold', 'marginLeft':'5px'}}>Teacher</label>
                        </div>
                        
                        </div>
                       <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                       <Components.Button 
                    //    onClick={notifyLogin} 
                       >Sigin In</Components.Button>
                      
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>
              
          </Components.Container>
          <ToastContainer style={{fontSize: '18px'}}/>
          </div>
      )
}

export default Login