import {Component} from "react"
import Table from "../Table"
import "./index.css"
import axios from 'axios';
import { FaCheck } from "react-icons/fa";


class Dashboard extends Component{
    obj = {
        get:"GET",
        post:"POST",
        comment:"GET COMMENT"
    }
    state = {idError:false,titleError:false,descError:false,userList:[],userId:"",title:"",desc:"",recentPost:"",showcomments:false,commentList:"",p:false};

    getUsersList = async()=>{
        let api="https://jsonplaceholder.typicode.com/users";
        let response = await fetch(api);
        if(response.ok === true){
            response = await response.json();
            this.setState({userList:response,req:this.obj.get});
        }
        else{
            console.log("Some error occured");
        }
    }
    klrahul = async()=>{
        
            let {userId,title,desc} = this.state;
            console.log(userId,title,desc);
            let content = {
                title:title,
                body:desc,
                userId:userId
            }
            let body = {
                method: "POST",
                headers: {
                "Content-Type": "application/json", // Correct header for JSON
                },
                body: JSON.stringify(content), // Stringify the content
            }
            try {
                let response = await fetch("https://jsonplaceholder.typicode.com/posts", body);
                let data = await response.json(); // Parse the JSON response
                console.log(data);
                this.setState({recentPost:data});
            } catch (error) {
                console.error("Error:", error);
            }

    }
    
    post = async (event)=>{
        event.preventDefault();
        if(this.state.userId==="" || this.state.title==="" || this.state.desc==="" || isNaN(this.state.userId)){
           this.setState({p:true}); 
        }
        else{
            this.setState({p:false},this.klrahul);
        }
    }
    
    changedescription = (event)=>{
        this.setState({desc:event.target.value});
    }
    changeTitle = (event)=>{
        this.setState({title:event.target.value});
    }
    changeuserId = (event)=>{
        this.setState({userId:event.target.value});
    }
    change = (id)=>{
        this.setState({userId:id});
    }

    changeuserIds = (event)=>{
        this.setState(x=>({recentPost:{...x,id:event.target.value}}))
    }
    getComments = async()=>{
        let api = `https://jsonplaceholder.typicode.com/comments?postId=${this.state.recentPost.id}`;
        try{
            let response = await fetch(api);
            response = await response.json();
            console.log(response);
            this.setState({commentList:response,showcomments:true});
        }
        catch{
            console.log("error");
        }
    }
    d = (x)=>{
        return(<li>
            <div>
               <p className="text-0.75"><span>Name:</span>{x.name}</p>
               <p className="text-0.75"><span>Body:</span>{x.body}</p> 
               <hr className="border-4 border-dotted border-grey-1000 mt-2 mb-3"/>
            </div>
        </li>)
    }
    call = ()=>{
        let commentlist = this.state.commentList;
        console.log(commentlist,"dfjk");
        if(commentlist.length===0){
            return <h1>No Comments created</h1>
        }
        else{
          return (<ul className="overflow-y-auto">
            {
                this.state.commentList.map(x=>(this.d(x)))
            }
          </ul> )
        }
    }

    show = ()=>{
        if(this.state.recentPost === ""){
            return <p className="text-4xl text-center" style={{ color: '#d7dfe9' }}>Firstly create a post</p>
        }
        else{
            return(
                <>
                  <label className="input-label" htmlFor="idl">Enter PostId</label>
                  <input type="text" onChange={this.changeuserIds} value={this.state.recentPost.id} id="idl" className="input"/>
                  {this.state.showcomments && this.call()}
                </> 
            )
        } 
    }

    userblur = (event)=>{
        if(this.state.userId ===""){
            this.setState({idError:true});
        }
        else{
            this.setState({idError:false});
        }
    }
    titleblur = (event)=>{
        if(this.state.title === ""){
            this.setState({titleError:true});
        }
        else{
            this.setState({titleError:false});
        }
    }
    descblur = (event)=>{
        if(this.state.desc ===""){
            this.setState({descError:true});
        }
        else{
            this.setState({descError:false});
        }
    }
    render(){
        return(
            <div className="dashboard">

                <div className="header-container">
                    <h1 className="heading">Hi, Sankeerth</h1>
                    <p className="header-content">
                        Welcome back to your
                        <span className="money-manager-text"> Devzery</span>
                    </p>
                </div>
                
                <div className="background">
                    <div className="container">
                        <button className="b-container" onClick={this.getUsersList}>
                            Get All Users
                        </button>
                        <div>
                            <Table list={this.state.userList} changeid={this.change}/>
                        </div>
                    </div>
                    <div className="details">
                        <button className="c-container">
                            Create a Post
                        </button>
                        <form className="form" onSubmit={this.post}>
                            <label className="input-label" htmlFor="id">Enter UserId</label>
                            <input type="text" onChange={this.changeuserId} value={this.state.userId} id="id" className="input" onBlur={this.userblur}/>
                            {this.state.idError?<p className="text-red-500">Enter Valid Id</p>:null}
                            <label className="input-label" htmlFor="a">Enter Title</label>
                            <input type="text" onChange={this.changeTitle} value={this.state.title} id="a" className="input" onBlur={this.titleblur}/>
                            {this.state.titleError?<p className="text-red-500">Enter title</p>:null}
                            <label className="input-label" htmlFor="select">
                            Enter description
                            </label>
                            <textarea onChange={this.changedescription} value={this.state.desc} id="select" className="input" onBlur={this.descblur}/>
                            {this.state.descError?<p className="text-red-500">Enter description</p>:null}
                            <button className="b-container" type="submit">
                                post
                            </button>
                            {
                                this.state.p?<p className="text-red-500">Enter valid data</p>:null
                            }
                            {this.state.recentPost !== "" ?(<div className="f"> <FaCheck className="text-green-500 mr-3 mt-1"/><p>Posted Successfully</p></div>
                           
                            ):null}
                        </form>
                       

                    </div>

                 
                    <div className="detail">
                        <button onClick={this.getComments} className="d-container">Get Comments</button>
                        <div className="formi">
                        {
                            this.show()
                        }
                        </div>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Dashboard