
import React, { Component } from 'react'
import './App.css';

export default class App5 extends Component {
  state = {
    user_id : "",
    user_password : "",
    user_name : "",
    user_list : [],
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submitId = () => {
    const post ={
      user_id : this.state.user_id,
      user_password : this.state.user_password,
      user_name : this.state.user_name
    };
    fetch("http://localhost:4000/idplz", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    })
    .then(res => res.json)
    .then(data => this.setState({user_list : data}));
  };



  onCall = () =>{
    fetch("http://localhost:4000/callbody",{
      method:"post",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(),
    })
    .then((res)=>res.json())
    .then(data => this.setState({user_list : data}));
  };

  componentDidMount() {
    this.onCall();
  }


  render() {

    
    return (
      <div>
        <h2 className = "header">회원가입 페이지</h2>
        <input onChange = {this.handleChange} name ="user_id" placeholder ="아이디"/>
        <br/>
        <input onChange = {this.handleChange} name ='user_password' placeholder="비밀번호"/>
        <br/>
        <input onChange = {this.handleChange} name ='user_name' placeholder ="이름"/>
        <br/>
        <hr/>
        <button onClick = {this.submitId}>회원가입</button>
        <ul>
          {Object.keys(this.state.user_list).map(id => {
                    const user = this.state.user_list[id];
                    return(
                        <div key = {id}>
                            <li>이름 : {user.user_name} id : {user.user_id} 비밀번호 : {user.user_password}</li>
                        </div>
                    )
          })}
        </ul>
      </div>
    )
  }
}