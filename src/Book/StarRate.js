import React  from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import './App4.css';


class StarRate extends React.Component {

    render() {
        var data = this.props.data;
        var i = 0;
        var list = [];
        while(i < data[0].rate) {
            list.push(<StarRateIcon />);
            i = i + 1;
        }

        return(
            <div>
                { list }
            </div>
        );
    }
}


export default StarRate;