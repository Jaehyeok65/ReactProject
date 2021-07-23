import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import  'bootstrap/dist/css/bootstrap.min.css' ;



class CarouselContent2 extends React.Component {



    render() {


        const img1 = this.props.img1;
        const imgurl1 = "/imgfile/"+img1+".jpg";
        const img2 = this.props.img2;
        const imgurl2 = "/imgfile/"+img2+".jpg";
        const img3 = this.props.img3;
        const imgurl3 = "/imgfile/"+img3+".jpg";


        return (
            <div>
     <Carousel style={{ width : '400px', marginTop : '20px', marginLeft : '30px', marginRight : '30px'}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={imgurl1}
      alt="Rank 1"
    />
    <Carousel.Caption>
      <h3>1위</h3>
      <p>{this.props.name1}</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={imgurl2}
      alt="Rank 2"
    />

    <Carousel.Caption>
      <h3>2위</h3>
      <p>{this.props.name2}</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={imgurl3}
      alt="Rank 3"
    />

    <Carousel.Caption>
      <h3>3위</h3>
      <p>{this.props.name3}</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            </div>
        );
    }
}

export default CarouselContent2;