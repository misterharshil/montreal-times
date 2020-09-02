import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../css/style.css'

export default class Header extends Component{
    render(){
        return(
            <div className="header">
                <ul className="navbar">
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/categories'>Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/news'>News</Link>
                    </li>
                </ul>


            </div>
        )
    }
}
