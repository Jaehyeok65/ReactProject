import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import StarRate2 from './StarRate2';
import Grid from '@material-ui/core/Grid';
import './Card.css';







class Cardcontent2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webtoon_view : null,
            webtoon_name : '',
            webtoon_rate : null,
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
        })
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
                    <Card.Text onClick = {this.IncreaseView}>
                      <p>조회수 : {this.props.view}</p>
                    </Card.Text>
                  </Grid>
                  <Grid item xs = {4} lg = {3}>
                     <StarRate2 rate = {this.props.rate} name = {this.props.name} />
                  </Grid>
                   </Grid>
                    </Card.Body>
                           </Card>
       </div>
        )
    }


}


export default Cardcontent2;