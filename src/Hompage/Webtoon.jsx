import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cardcontent2 from './Cardcontent2';





class Webtoon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webtoon_list : [],
            webtoon_name : '',
            webtoon_view : ''
        }
    }

      onCall = () => {
      fetch("http://localhost:4000/callwebtoon",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(),
        })
        .then((res)=>res.json())
        .then(data => this.setState({webtoon_list : data}))
    }
      
    
      componentDidMount() {
        this.onCall();
      }


    render() {

        const list = this.state.webtoon_list.map( (lists) => {
            return (
            <div>
            <Cardcontent2 header = "웹툰" name = {lists.webtoon_name} view = {lists.webtoon_view} rate = {lists.webtoon_rate}
            img = {lists.webtoon_img} link = {lists.webtoon_link} />
            </div>
            );
        })


            return (
                <div>
                    {list}
                </div>
            );
        }
        


    }

export default Webtoon;