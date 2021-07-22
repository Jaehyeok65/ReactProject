import axios from 'axios';
import React from 'react';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectfile : null,
            Url : '하이',
        }
    }

    handleInputFile = (e) => {
        this.setState({selectfile : e.target.files[0]})
    }

    handlePost = () => {
        const formdata = new FormData();
        formdata.append("file",this.state.selectfile);
        axios.post("http://localhost:4000/uploaded",formdata)
        .then(res => {
            this.setUrl(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    setUrl = (data) => {
        this.setState({Url : data});
    }



    render() {
        
        return (
            <h2>
            <form>
            <input type="file" name="file" onChange={e => this.handleInputFile(e)}/>
            <button onClick = {this.handlePost}>제출</button>
            </form>
            {this.state.Url}
            </h2>
        );
    }
}


export default Header;