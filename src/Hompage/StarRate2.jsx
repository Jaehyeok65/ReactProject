import React  from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import './App4.css';


class StarRate2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating : null,
            hover : null,
        }
    }


    setRating = (rate) => {
        this.setState({ rating : rate })
    }

    setHover = (hove) => {
        this.setState({ hover : hove})
    }

    SubmitRate = () => {
        alert(this.state.rating + '점 별점을 등록하시겠습니까?');
        const rate = {
          webtoon_name : this.props.name,
          webtoon_rate : this.state.rating,
        }
        fetch("http://localhost:4000/webtoonrate",{
            method:"post",
            headers : {
              "content-type" : "application/json",
            },
            body : JSON.stringify(rate),
          })
      }

      
      componentDidUpdate(prevProps,prevState) {
          if(prevState.rating !== this.state.rating) {
              this.SubmitRate();
          }
      }


    render() {
        var rate = this.props.rate;
    

        return(
            <div>
            {[...Array(5)].map((star,i) => {
              const ratingValue = i + 1;
      
      
              return (
                <label>
                  <input type = "radio"
                  name = "rating"
                  value = {ratingValue}
                  onClick = {() => this.setRating(ratingValue)} />
                  <StarRateIcon color = {ratingValue <= (this.state.hover || rate) ? "primary" : "action" }
                  onMouseEnter = {() => this.setHover(ratingValue)} onMouseLeave = {() => this.setHover(null)}
                  />
                </label>
              )
            })}
          </div>
        );
    }
}


export default StarRate2;