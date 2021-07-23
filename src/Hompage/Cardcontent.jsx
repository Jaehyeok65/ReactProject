import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Button from 'react-bootstrap/Button';
import StarRate from '../Book/StarRate';
import Grid from '@material-ui/core/Grid';
import './Card.css';





class Cardcontent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            novel_name : '',
            novel_view : null,
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
    

      IncreaseView = () => {
          this.setState({
            novel_view : this.state.novel_view + 1,
            novel_name : this.props.name,
            ratestate : false,
        });
      }

      componentDidUpdate() {
        this.onCall();
      }


    render() {
        const img = this.props.img;
        const imgurl = "/assets/"+img+".jpg";

        return (
          <div>
            <Card border="dark" style={{ marginBottom : '20px', marginLeft : '30px', marginRight : '30px'}}>
  <Card.Header>{this.props.header}</Card.Header>
  <Card.Body>
  <Grid container>
    <Grid item xs = {12} lg = {2}>
    <img src = {imgurl} width = "130" alt = {img} onClick = {this.IncreaseView} />
    <Card.Title>{this.props.name}</Card.Title>
    </Grid>
    <Grid item xs = {12} lg = {6}>
    <Card.Text>
     조회수 : {this.props.view}
    </Card.Text>
    </Grid>
    <Grid item xs = {8} lg = {1}>
    <Button variant="outline-primary">별점 주기</Button>
    </Grid>
    <Grid item xs = {4} lg = {3}>
    <StarRate rate = {this.props.rate} />
    </Grid>
    </Grid>
       </Card.Body>
       </Card>
       </div>
        )
    }


}


export default Cardcontent;