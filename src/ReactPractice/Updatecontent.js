import React from 'react';


class UpdateContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.data.id,
            title : this.props.data.title,
            desc : this.props.data.desc
        }
        this.InputFormHanlder = this.InputFormHanlder.bind(this);
    }

    InputFormHanlder(e) {
        this.setState({[e.target.name] : e.target.value});
    }


    render() {
        console.log(this.props.data);


        return (
            <div>
                <h2>Update</h2>
                <form action = "/create_process" method = "post"
                 onSubmit = {function(e){
                     e.preventDefault();
                     this.props.onChangeToc(this.state.id, this.state.title,this.state.desc);
                 }.bind(this)}
                >
                <input type ="hidden" name = "id" value = {this.state.id}></input>
                <p><input
                type = "text" name = "title" placeholder = "title" value = {this.state.title}
                onChange = {this.InputFormHanlder}
                ></input></p>
                <p>
                <textarea name = "desc" placeholder = "description" value = {this.state.desc}
                onChange = {this.InputFormHanlder}
                ></textarea>
                </p>
                <p>
                <input type = "submit"></input>
                </p>
                </form>
            </div>
        )


    }



}


export default UpdateContent;