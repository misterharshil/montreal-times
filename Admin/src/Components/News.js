import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from './includes/Header'

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: undefined,
            news_JSON: undefined
        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page')!= undefined? urlParams.get('page'): urlParams.get('page')>=1? parseInt(urlParams.get('page'))+parseInt(10):0;
        fetch('https://backend-newz.herokuapp.com/api/admin/newsListByCategory', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            // body:JSON.stringify({calimtegory_idit:10,offset:page})
        }).then(response => this.renderNewsList(response))

    }

    renderNewsList = (response) => {
        if (response.statusCode == 401) {
            sessionStorage.removeItem('token')
            window.location.reload(true)
        } else {
            response.json().then(json => {
                const news = json.map((_value, _key) => {
                    return (<tr key={"newsTable" + _value.id}>
                        <td>{_value.id}</td>
                        <td><img className={"newsImagePreviewTable"} src={_value.img} alt={"news image alt"}/></td>
                        <td>{_value.title}</td>
                        <td>{_value.title_desc}</td>

                        <td>{_value.category_name}</td>
                        <td><a href={"/"}>Edit News </a></td>
                    </tr>)
                })

                this.setState({newsList: news, news_JSON: json})
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
                <h1 className="page-title">News</h1>
                <div className={"table-container"}>
                    <table className={"data-table"}>

                        <thead>
                        <tr key="homeTable1">
                            <td>News ID</td>
                            <td>Image</td>
                            <td>Title</td>

                            <td>Title Description</td>
                            <td>Category</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.newsList !== undefined && this.state.newsList}
                        </tbody>
                    </table>
                    <Link to={"/addNews"}  className={"addnew"}>Add News</Link>
                </div>
            </>
        )
    }
}
