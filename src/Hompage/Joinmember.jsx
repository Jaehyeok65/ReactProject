import React from 'react';
import Button from 'react-bootstrap/Button';
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
        position : 'fixed',
    },
    LoginButton : {
        right : '120px',
        top : '10px',
        position : 'fixed',
    }
  }

  class Joinmember extends React.Component {
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

      handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value,
        });
      }

      checkId = () => {
        const post = {
          user_id : this.state.user_id,
        };
        if(!this.state.user_name) {
          alert('이름을 입력해주세요');
          return;
        }
    
        if(!this.state.user_id) {
          alert('아이디를 입력해주세요');
          return;
        }
        if(!this.state.user_password) {
          alert('비밀번호를 입력해주세요');
          return;
        }
        if(!this.state.password_check) {
          alert('비밀번호 재확인을 입력해주세요');
          return;
        }
          
        if(this.state.user_password !== this.state.password_check) {
          alert('비밀번호를 재확인해주세요');
          return;
        }
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

      render() {

        const { classes } = this.props;

        return(
            <div className = {classes.root}>
        <Button className = {classes.MenuButton} variant = "outline-secondary" onClick = {this.handledialog}>회원가입</Button>
        <Dialog open = {this.state.dialog} onClose = { this.handledialog}>
                    <DialogTitle>회원가입</DialogTitle>
                    <DialogContent>
                      <p>
                        <TextField label = "이름" type = "text" name = "user_name"  onChange = {this.handleChange}></TextField>
                      </p>
                      <p>
                        <TextField label = "아이디" type = "text" name = "user_id"  onChange = {this.handleChange}></TextField>
                      </p>
                      <p>
                        <TextField label = "비밀번호" type = "text" name = "user_password"  onChange = {this.handleChange}></TextField>
                      </p>
                      <p>
                       <TextField label = "비밀번호 확인" type = "text" name = "password_check"  onChange = {this.handleChange}></TextField>
                      </p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "outline-success" onClick = {this.checkId}>가입하기</Button>
                        <Button variant = "outline-dark"  onClick = {this.handledialog}>닫기</Button>
                    </DialogActions>
                </Dialog>



            </div>

        );



      }




  }


  export default withStyles(styles)(Joinmember);