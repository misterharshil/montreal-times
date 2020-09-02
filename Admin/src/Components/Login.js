import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../src/css/loginStyle.css'

import jwt_decode from 'jwt-decode'
import {BrowserRouter as Router, Route,Redirect} from 'react-router-dom'

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }

    changeHandler=(e)=> {
           this.setState({
               [e.target.name] : e.target.value
           })
        console.log(this.state.username,this.state.password)
    }

    performLogin=(e)=>
    {
        const userName = this.state.username
        const pwd = this.state.password

        fetch('http://localhost:2260/admin/Login',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username:userName,password:pwd})
        }).then(response => this.manageLoginResponse(response))


    }

    manageLoginResponse = (response)=>{
        if(!response.ok){
            alert("Invalid credentials/User not authorised")
        }else{
        response.json().then((json) =>{
                sessionStorage.setItem('token', json.token)
            window.location.reload(true)
                })
        }
}

    render(){
        return(
            <div className="login-page-body">
            <div className="login-page">
                <div className="form">
                    <div className="login-form">
                        <input name="username" onChange={this.handler} type="text" placeholder="username" onChange={this.changeHandler}/>
                        <input type="password" name="password" placeholder="password" onChange={this.changeHandler} />
                        <a id="loginBtn" onClick={this.performLogin}>Login</a>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}
