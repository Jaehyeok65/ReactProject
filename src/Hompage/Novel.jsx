import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cardcontent from './Cardcontent';





class Novel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            novel_list : [],
            novel_name : '',
            novel_view : ''
        }
    }



    onCall = () =>{
        fetch("http://localhost:4000/callnovel",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(),
        })
        .then((res)=>res.json())
        .then(data => this.setState({novel_list : data}))
    }
    
      componentDidMount() {
        this.onCall();
      }


    render() {

        const list = this.state.novel_list.map( (lists) => {
            return (
            <div>
            <Cardcontent header ="무협" name = {lists.novel_name} view = {lists.novel_view} rate = {lists.novel_rate}
            img = {lists.novel_img} />
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

export default Novel;