
import React, { Component } from 'react'
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField  from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root : {
      flexGrow : 1,
  },
  MenuButton : {
      right : '20px',
      top : '10px',
      position : 'fixed',
  }
}

class App4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : "",
      user_password : "",
      user_name : "",
      user_list : [],
      dialog : false,
    }
  }

  

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }


  checkId = () => {
    const post = {
      user_id : this.state.user_id,
    };
    fetch("http://localhost:4000/checklogin", {
      method : "post",
      headers : {
        "content-type" : "application/json",
        "Accept" : "application/json",
      },
      body : JSON.stringify(post),
    }).then(res => res.json())
    .then(result => {
      try {
        if(result[0].user_id !== null || result[0].user_id !== undefined) {
          alert('중복된 아이디가 있습니다.');
        }
      }
      catch (e) { //에러가 났다는 것은 undefinded라는 뜻 == 중복된 아이디가 없다.
        this.submitId();
      }
    })
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
        "Accept" : "application/json",
      },
      body : JSON.stringify(post),
    })
    .then(res => res.json())
    .then(data => {
      if(data !== null || undefined) {
        alert('가입이 완료되었어요!');
        this.handledialog();
      }
    });
  };

   handledialog = () => {
     this.setState({dialog : !this.state.dialog});
   }

   getLogin = (e) => {
     const user = {
       user_id : this.state.user_id,
       user_password : this.state.user_password,
       user_name : this.state.user_name
     };
     fetch("http://localhost:4000/islogin", {
       method : "post",
       headers : {
         "content-type" : "application/json",
       },
       body : JSON.stringify(user),
     }).then(res => res.json())
     .then(result => {
       try {
         if(result[0].user_id !== undefined) {
           if(this.state.user_id === result[0].user_id) {
             
            if(this.state.user_password === result[0].user_password) {
              alert('로그인이 완료되었어요!');
            }
            else if(this.state.user_password !== result[0].user_password) {
              alert('비밀번호가 틀렸어요');
            }
           }
           else {
             alert('아이디를 다시 확인해주세요');
           }
         }
       }
       catch (e) {
         console.log(e);
         alert('아이디가 존재하지않아요');
       }
     })
   }



  onCall = () =>{
    fetch("http://localhost:4000/callbody",{
      method:"post",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(),
    })
    .then((res)=>res.json())
    .then((data => this.setState({user_list : data})))
  };

  componentDidMount() {
    this.onCall();
  }


  render() {

    const list = this.state.user_list.map((item) => (
      <li>이름 : {item.user_name} id : {item.user_id} 비밀번호 : {item.user_password}</li>
    ));
    const { classes } = this.props;
    
    return (
      <div className = {classes.root}>
        <h2 className = "header">React Practice</h2>
      <TextField label = "아이디" type = "text" name = "user_id"  onChange = {this.handleChange}></TextField>
      <br/>
      <TextField label = "비밀번호" type = "text" name = "user_password"  onChange = {this.handleChange}></TextField>
      <br/>
        <Button className = {classes.MenuButton} variant = "contained" color ="primary" onClick = {this.handledialog}>회원가입</Button>
        <Button variant = "contained" color = "primary" onClick = {this.getLogin}>로그인</Button>
        <Dialog open = {this.state.dialog} onClose = { this.handledialog}>
                    <DialogTitle>회원가입</DialogTitle>
                    <DialogContent>
                        <TextField label = "이름" type = "text" name = "user_name"  onChange = {this.handleChange}></TextField>
                        <br/>
                        <TextField label = "아이디" type = "text" name = "user_id"  onChange = {this.handleChange}></TextField>
                        <br/>
                        <TextField label = "비밀번호" type = "text" name = "user_password"  onChange = {this.handleChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "contained" color = "primary" onClick = {this.checkId}>가입하기</Button>
                        <Button variant = "outlined" color = "primary" onClick = {this.handledialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(App4);