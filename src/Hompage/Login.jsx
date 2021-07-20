import React from 'react';
import Button from 'react-bootstrap/Button'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField  from '@material-ui/core/TextField';




const styles = {
    root : {
        flexGrow : 1,
    },
    MenuButton : {
        right : '20px',
        top : '10px',
        position : 'absolute',
    },
    LoginButton : {
        right : '120px',
        top : '10px',
        position : 'absolute'
    }
  }

  class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user_id : "",
          user_password : "",
          user_name : "",
          user_list : [],
          dialog : false,
          password_check : "",
          loginstate : false,
        }
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
                 this.handleLoginState();
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
            alert('아이디를 다시 확인해주세요');
          }
        })
      }

      handleLoginState = () => {
        this.setState({loginstate : !this.state.loginstate});
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value,
        });
      }

      render() {

        const { classes } = this.props;


        return (
            <div className = {classes.root}>
                <Dialog open = {this.state.loginstate} onClose = {this.handleLoginState}>
                 <DialogTitle>로그인</DialogTitle>
                  <DialogContent>
                <p>
                  <TextField label = "아이디" type = "text" name = "user_id"  onChange = {this.handleChange}></TextField>
                </p>
                <p>
                  <TextField label = "비밀번호" type = "text" name = "user_password"  onChange = {this.handleChange}></TextField>
                </p>
                  </DialogContent>
                   <DialogActions>
                      <Button variant = "outline-success" onClick = {this.getLogin}>로그인</Button>
                      <Button variant = "outline-dark" onClick = {this.handleLoginState}>닫기</Button>
                  </DialogActions>
                  </Dialog>
               <Button className = {classes.LoginButton} variant = "outline-secondary" onClick = {this.handleLoginState}>로그인</Button>
               </div>


        );
      }
    








  }


  export default withStyles(styles)(Login);