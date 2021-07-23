
import React from 'react';
import CarouselContent from './CarouselContent';
import CarouselContent2 from './CarouselContent2';
import './Card.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            novellist : [{novel_name : '', novel_img : '', novel_view : '', novel_rate : ''},
            {novel_name : '', novel_img : '', novel_view : '', novel_rate : ''},
            {novel_name : '', novel_img : '', novel_view : '', novel_rate : ''}],
            webtoonlist : [{webtoon_name : '', webtoon_img : '', webtoon_view : '', webtoon_rate : ''},
            {webtoon_name : '', webtoon_img : '', webtoon_view : '', webtoon_rate : ''},
            {webtoon_name : '', webtoon_img : '', webtoon_view : '', webtoon_rate : ''}],
        }
    }





    RankNovel = () =>{
        fetch("http://localhost:4000/ranknovel",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(),
        })
        .then((res)=>res.json())
        .then(data => this.setState({ novellist : data}));
    }


    RankWebtoon = () =>{
        fetch("http://localhost:4000/rankwebtoon",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(),
        })
        .then((res)=>res.json())
        .then(data => this.setState({webtoonlist : data}));
    }

    componentDidMount() {
        this.RankNovel();
        this.RankWebtoon();
    }



    render() {
        
        return (
            <div>
            <h2 className = "head">
                인기 무협
            </h2>
                <div>
 <CarouselContent name1 = {this.state.novellist[0].novel_name} name2 = {this.state.novellist[1].novel_name} name3 = {this.state.novellist[2].novel_name}
  img1 = {this.state.novellist[0].novel_img} img2 = {this.state.novellist[1].novel_img} img3 = {this.state.novellist[2].novel_img} />
   </div>
   <h2 className = "head">
       인기 웹툰
   </h2>
   <div>
   <CarouselContent2 name1 = {this.state.webtoonlist[0].webtoon_name} name2 = {this.state.webtoonlist[1].webtoon_name} name3 = {this.state.webtoonlist[2].webtoon_name}
  img1 = {this.state.webtoonlist[0].webtoon_img} img2 = {this.state.webtoonlist[1].webtoon_img} img3 = {this.state.webtoonlist[2].webtoon_img} />
   </div>
            </div>
        );
    }
}


export default Home;