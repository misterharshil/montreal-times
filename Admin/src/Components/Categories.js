import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from './includes/Header'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: undefined,
            categories_JSON: undefined
        }
    }

    componentDidMount() {
        fetch('https://backend-newz.herokuapp.com/api/user/categories', {


            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            //  body:JSON.stringify({token:sessionStorage.getItem('token')})
        }).then(response => this.renderCategoryList(response))

    }

    renderCategoryList = (response) => {
        if (response.statusCode == 401) {
            sessionStorage.removeItem('token')
            window.location.reload(true)
        } else {
            response.json().then(json => {

                const categories = json.map((_value, _key) => {
                    return (<tr key={"categoryTable" + _value.id}>
                        <td>{_value.id}</td>
                        <td>{_value.name}</td>
                        <td><a href={"/"}>Edit Category </a></td>
                    </tr>)
                })

                this.setState({categoryList: categories, categories_JSON: json})
            })
        }
    }

    addCategory = (e) => {
        let cat_name = prompt("Category Name:")


        if (cat_name === "") {
            alert("error! invalid input")
            this.addCategory(e)
        } else {
            let cat_Exists = this.categoryExists(cat_name)
            if (cat_Exists) {
                alert("category already exists")
            } else {
                this.finishAddCategory(cat_name)
            }
        }
    }

    categoryExists = (cat_name) => {
        let allCategories = this.state.categories_JSON
        let categoryExists = false
        allCategories.forEach(category => {

            if (category.name.toString().toLowerCase() === cat_name.toString().toLowerCase()) {
                categoryExists = true
            }

        })

        return categoryExists
    }

    finishAddCategory = (cat_name)=>{
        fetch('https://backend-newz.herokuapp.com/api/admin/addCategory', {


            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({category_name:cat_name})
        }).then(response => {
            if(response.ok)
            {
                this.componentDidMount()
            }
        })

    }

    render() {
        return (
            <>
                <Header>
                </Header>
                <h1 className="page-title">Categories</h1>
                <div className={"table-container"}>
                    <table className={"data-table"}>

                        <thead>
                        <tr key="homeTable1">
                            <td>Category ID</td>
                            <td>Category</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.categoryList !== undefined && this.state.categoryList}
                        </tbody>
                    </table>
                    <Link to={"#"} onClick={this.addCategory} className={"addnew"}>Add Category</Link>
                </div>
            </>
        )
    }
}
