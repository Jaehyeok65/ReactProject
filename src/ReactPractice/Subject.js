import React from 'react';


class Subject extends React.Component {



    render() {

        return (
            <div>
         <h2> <a href = "/" onClick = {function(e){
             e.preventDefault();
             this.props.onChangeMode();
         }.bind(this)}>{this.props.title}</a></h2>  
               {this.props.sub}
          </div>
          
        );
    }
}

export default Subject;