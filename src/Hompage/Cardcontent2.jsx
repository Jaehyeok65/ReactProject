import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Button from 'react-bootstrap/Button';
import StarRate from '../Book/StarRate';
import Grid from '@material-ui/core/Grid';
import './Card.css';





class Cardcontent2 extends React.Component {


    render() {
        const img = this.props.img;
        const imgurl = "/imgfile/"+img+".jpg";

        return (
            <Card border="dark" style={{ marginBottom : '20px', marginLeft : '30px', marginRight : '30px'}}>
  <Card.Header>{this.props.header}</Card.Header>
  <Card.Body>
  <Grid container>
    <Grid item xs = {12} lg = {2}>
    <img src = {imgurl} width = "200" alt = {img} />
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
        )
    }


}


export default Cardcontent2;