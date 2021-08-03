import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import StarRate1 from './StarRate1';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField  from '@material-ui/core/TextField';
import './Card.css';

const styles = theme => ({
  fab : {
      position : 'fixed',
      bottom : '20px',
      right : '20px'
  },
  fab1 : {
      position : 'fixed',
      bottom : '20px',
      right : '250px',
  },
  fab2 : {
      position : 'fixed',
      bottom : '20px',
      right : '100px'
  }
});






class Cardcontent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            novel_name : '',
            novel_view : 0,
            novel_rate : 0,
            novel_img : null,
            novel_link : null,
            dialog : false,
            remove : false,
        }
    }








    onCall = () =>{
        const view = {
            novel_view : this.state.novel_view,
            novel_name : this.state.novel_name,
        };

        fetch("http://localhost:4000/novelview",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(view),
        })
    }

    remove = () => {
      const name = {
        novel_name : this.props.name
      };

      fetch("http://localhost:4000/noveldelete",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(name),
        }).then(alert("삭제가 완료되었습니다."))
        .then(this.handleRemove());
    }

    add = () => {
      const novel = {
        novel_name : this.state.novel_name,
        novel_view : this.state.novel_view,
        novel_rate : this.state.novel_rate,
        novel_link : this.state.novel_link,
      };

      fetch("http://localhost:4000/noveladd",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(novel),
        }).then(alert('성공적으로 추가되었습니다.'))
        .then(this.handleDialog());
    }
    

      IncreaseView = () => {
          this.setState({
            novel_view : this.state.novel_view + 1,
            novel_name : this.props.name,
        });
      }

      

      componentDidUpdate(prevProps,prevState) {
        if(prevState.novel_view !== this.state.novel_view) {
          this.onCall();
        }
      }


      handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value,
        });
      }

      handleDialog = () => {
        this.setState({dialog : !this.state.dialog});
      }

      handleRemove = () => {
        this.setState({remove : !this.state.remove});
      }

      


    render() {
        const img = this.props.img;
        const imgurl = "/novel/"+img+".jpg";
        const { classes } = this.props;


        return (
          <div>
            <Card border="dark" style={{ marginBottom : '20px', marginLeft : '30px', marginRight : '30px'}}>
              <Card.Header>{this.props.header}</Card.Header>
                <Card.Body>
                  <Grid container>
                  <Grid item xs = {12} lg = {2}>
                    <a href = {this.props.link}>
                      <img src = {imgurl} width = "180" alt = {img} onClick = {this.IncreaseView} />
                      </a>
                <Card.Title>{this.props.name}</Card.Title>
                    </Grid>
               <Grid item xs = {12} lg = {6}>
                <Card.Text>
                        <p>조회수 : {this.props.view}</p>
                       </Card.Text>
                       </Grid>
                  <Grid item xs = {4} lg = {2}>
                    <StarRate1 rate = {this.props.rate} name = {this.props.name} />
                    </Grid>
                    <Grid item xs = {4} lg = {1}>
                    <Button variant = "outline-primary" onClick = {this.handleRemove}>삭제</Button>
                    </Grid>
                     </Grid>
                      </Card.Body>
                      </Card>
                      <Fab color = "primary" className = { classes.fab } onClick = {this.handleDialog}>
                        <AddIcon />
                </Fab>
                <Dialog open = {this.state.dialog} onClose = {this.handleDialog}>
                  <DialogTitle>무협 추가</DialogTitle>
                  <DialogContent>
                    <p>
                    <TextField label = "이름" type = "text" name = "novel_name" onChange = {this.handleChange} ></TextField>
                    </p>
                    <p>
                    <TextField label = "링크" type = "text" name = "novel_link" onChange = {this.handleChange} ></TextField>
                    </p>
                  </DialogContent>
                  <DialogActions>
                    <Button variant = "outline-primary" onClick = {this.add}>추가</Button>
                    <Button variant = "outline-secondary" onClick = {this.handleDialog}>닫기</Button>
                  </DialogActions>
                </Dialog>
                <Dialog open = {this.state.remove} onClose = {this.handleRemove}>
                  <DialogTitle>삭제하시겠습니까?</DialogTitle>
                  <DialogActions>
                    <Button variant = "outline-primary" onClick = {this.remove}>예</Button>
                    <Button variant = "outline-secondary" onClick = {this.handleRemove}>아니오</Button>
                  </DialogActions>
                </Dialog>
       </div>
        )
    }


}


export default withStyles(styles)(Cardcontent);