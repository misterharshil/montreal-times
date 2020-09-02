import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from './includes/Header'

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userList : undefined
        }
    }


    componentDidMount() {
        fetch('https://backend-newz.herokuapp.com/api/user/users',{
//            fetch('http://localhost:2260/admin/users',{

            method:'get',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
          //  body:JSON.stringify({token:sessionStorage.getItem('token')})
        }).then(response => this.renderUserList(response))

    }

    renderUserList= (response)=>
    {
        if(response.statusCode == 401)
        {
            sessionStorage.removeItem('token')
            window.location.reload(true)
        }else{
            response.json().then(json => {

                const users = json.map((_value,_key)=>{
                    return(<tr key={"homrTable"+_value.id}><td>{_value.first_name}</td><td>{_value.last_name}</td><td>{_value.email_id}</td><td><a href={"/"}>Edit User </a></td></tr>)
                })
                this.setState({userList:users})
            })
        }
    }

    render(){
        return(
            <>
            <Header>
            </Header>
                <h1 className="page-title">Users</h1>
                <div className={"table-container"}>
                    <table className={"data-table"}>

                        <thead>
                        <tr key="homeTable1"><td>First Name</td><td>Last Name</td><td>Email</td><td>Action</td></tr></thead>
                        <tbody>
                        {this.state.userList !== undefined && this.state.userList}
                        </tbody>
                    </table>
                </div>
                </>
        )
    }
}
