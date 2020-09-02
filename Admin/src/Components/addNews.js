import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from './includes/Header'
import { Editor } from '@tinymce/tinymce-react';

export default class AddNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            title_description: undefined,
            description: undefined,
            categoryList:undefined,
            selectedCategory:undefined,
            fileInputState: undefined,
            previewSource:undefined,
            selectedFile: undefined
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
                    return (<option key={"categoryTable" + _value.id} value={_value.id}>{_value.name}</option>)
                })

                this.setState({categoryList: categories})
            })
        }
    }

    handleCategory = (e) =>{
        this.setState({selectedCategory:e.target.value})
    }
    handleEditorChange = (content, editor) => {
        this.setState({description:content})
    }

    handleShortDescription = (e)=>{
        const value = e.target.value.toString()
        this.setState({title_description:value})
    }

    handleTitle = (e)=>{
        const value = e.target.value.toString()
        this.setState({title:value})
    }


    handlefile = (e) => {
        const file = e.target.files[0];
        this.previewFile(file);
        this.setState({selectedFile: file,fileInputState: e.target.value})
    };

     previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({previewSource: reader.result})
        };
    };
    saveNews = (e)=>{
        if(this.state.title === undefined || this.state.title === "")
        {
            alert("title is missing")
        }else if(this.state.title_description === undefined || this.state.title_description === "")
        {
            alert("short description is missing")
        }else if(this.state.description === undefined || this.state.description === "")
        {
            alert('description is missing')
        }else  if(this.state.selectedCategory == 0 || this.state.selectedCategory === undefined){
            alert('Select Category')
        }
            else
        {


            ////
            if (this.state.selectedFile === undefined){
                alert('no file Selected')
            }else{
                //trying upload image
                const reader = new FileReader();
                reader.readAsDataURL(this.state.selectedFile);
                reader.onloadend = () => {
                    this.uploadImage(reader.result);
                };
                reader.onerror = () => {
                    console.error('AHHHHHHHH!!');
                    alert('something went wrong! try again');
                };
            }           ////
        }
    }

    uploadImage = async (base64EncodedImage)=>{
        try {
            await fetch('http://backend-newz.herokuapp.com/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            }).then(response => this.finishNewsSubmission(response.json()))
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
    }

    finishNewsSubmission = (response) =>{
        response.then(json =>{
            const form_data = new FormData()


            form_data.append('newsImg',json.imgUrl)
            form_data.append('title',this.state.title)
            form_data.append('category_id',this.state.selectedCategory)
            form_data.append('description',this.state.description)
            form_data.append('title_desc',this.state.title_description)
            const data = {
                newsImg:json.imgUrl,
                title:this.state.title,
                category_id: this.state.selectedCategory,
                description: this.state.description,
                title_desc: this.state.title_description
            }

            fetch('http://backend-newz.herokuapp.com/api/admin/postNews',{
                method: 'POST',
                mode:'cors',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }).then(responseNew => responseNew.json())
                .then(json => this.newsSuccess(json))
        })
    }

    newsSuccess = (json)=>{
        window.location.href = "/news";
    }
    render() {
        return (
            <>
                <Header>
                </Header>
                <h1 className="page-title">Create News</h1>
                <div className={"form-group"}>
                    <div className={"data-form"}>
                        <div className={"form-element"}>
                            <label htmlFor={"title"}>Title</label>
                            <input onChange={this.handleTitle} type={"text"} id={"title"} placeholder={"Title"} />
                        </div>
                        <div className={"form-element"}>
                            <label htmlFor={"shortdescription"}>Short Description</label>
                            <textarea onChange={this.handleShortDescription} name="shortDescription" id={"shortdescription"} placeholder={"Title"}></textarea>
                        </div>
                        <div className={"form-element"}>
                            <label htmlFor={"category"}>Category</label>
                            <select onChange={this.handleCategory} id={"category"}>
                                <option value={"0"} >Select Category</option>
                                {this.state.categoryList != undefined?this.state.categoryList:null}
                            </select>
                        </div>
                        <div className={"form-element"}>
                            <label htmlFor={"fileSelect"}>Image</label>
                            <input type={"file"} onChange={this.handlefile}  id={"fileselect"} placeholder={"select Image"} accep={"image/*"}></input>
                        </div>
                        { this.state.previewSource!= undefined?
                        <div className={"imgPreviewDiv"}>
                            <img src={this.state.previewSource} />
                        </div>:""
                        }
                        <div className={"form-editor"}>
                            <Editor
                                initialValue=""
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | image | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                            />
                        </div>

                    </div>
                    <button onClick={this.saveNews}>Submit</button>
                </div>

            </>
        )
    }
}

