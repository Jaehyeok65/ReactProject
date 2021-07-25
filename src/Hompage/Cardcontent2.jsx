import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Button from 'react-bootstrap/Button';
import StarRate from '../Book/StarRate';
import Grid from '@material-ui/core/Grid';
import './Card.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField  from '@material-ui/core/TextField';






class Cardcontent2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webtoon_view : null,
            webtoon_name : '',
            webtoon_rate : null,
            dialog : false,
        };
    }

    onCall = () =>{
        const view = {
            webtoon_view : this.state.webtoon_view,
            webtoon_name : this.state.webtoon_name,
        };

        fetch("http://localhost:4000/webtoonview",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(view),
        }).then(alert("새로고침을 눌러주세요!"))
    }

   

    SubmitRate = () => {
      const rate = {
        webtoon_name : this.props.name,
        webtoon_rate : this.state.webtoon_rate,
      }
      fetch("http://localhost:4000/webtoonrate",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(rate),
        }).then(this.handleDialog)
    }

    handleDialog = () => {
      this.setState({ dialog : !this.state.dialog});
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value,
      });
    }

    componentDidUpdate(prevProps,prevState) {
      if(prevState.webtoon_view !== this.state.webtoon_view) {
        this.onCall();
      }
    }

   
    

      IncreaseView = () => {
          this.setState({
            webtoon_view : this.state.webtoon_view + 1,
            webtoon_name : this.props.name,
        });
      }




    render() {
        const img = this.props.img;
        const imgurl = "/webtoon/"+img+".jpg";
        console.log(this.state.webtoon_rate)

        return (
          <div>
            <Card border="dark" style={{ marginBottom : '20px', marginLeft : '30px', marginRight : '30px'}}>
               <Card.Header>{this.props.header}</Card.Header>
               <Card.Body>
               <Grid container>
                 <Grid item xs = {12} lg = {2}>
                  <img src = {imgurl} width = "180" alt = {img} onClick = {this.IncreaseView} />
                   <Card.Title>{this.props.name}</Card.Title>
                 </Grid>
                 <Grid item xs = {12} lg = {6}>
                    <Card.Text onClick = {this.IncreaseView}>
                      <p>조회수 : {this.props.view}</p>
                    </Card.Text>
                  </Grid>
                  <Grid item xs = {8} lg = {1}>
                    <Button variant="outline-primary" onClick = {this.handleDialog}>별점주기</Button>
                  </Grid>
                  <Grid item xs = {4} lg = {3}>
                     <StarRate rate = {this.props.rate} />
                  </Grid>
                   </Grid>
                    </Card.Body>
                           </Card>
                  <Dialog open = {this.state.dialog} onClose = { this.handleDialog}>
                    <DialogTitle>별점주기</DialogTitle>
                    <DialogContent>
                      <p>
                        <TextField label = "별점(1~5)" type = "number" name = "webtoon_rate" onChange = {this.handleChange}></TextField>
                      </p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "outline-success" onClick = {this.SubmitRate}>평가하기</Button>
                        <Button variant = "outline-dark"  onClick = {this.handleDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
       </div>
        )
    }


}


export default Cardcontent2;