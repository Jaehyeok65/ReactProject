import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import StarRate1 from './StarRate1';
import Grid from '@material-ui/core/Grid';
import './Card.css';






class Cardcontent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            novel_name : '',
            novel_view : 0,
            novel_rate : null,
            dialog : false,
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
      


    render() {
        const img = this.props.img;
        const imgurl = "/novel/"+img+".jpg";

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
                  <Grid item xs = {4} lg = {3}>
                    <StarRate1 rate = {this.props.rate} name = {this.props.name} />
                    </Grid>
                     </Grid>
                      </Card.Body>
                      </Card>
       </div>
        )
    }


}


export default Cardcontent;