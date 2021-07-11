import React from 'react';


class TOC extends React.Component {

    render() {
        var data = this.props.data;
        var lists = [];
        var i = 0;
        while(i < data.length) {
            lists.push(<li key = {data[i].id}>
                <a
                 href = {"/contents/"+data[i].id}
                 data-id = {data[i].id}
                 onClick = {function(e){
                     e.preventDefault();
                     this.props.onChangePage(e.target.dataset.id);
                 }.bind(this)}
                 >{data[i].title}</a></li>)
            i = i + 1;
        }

        return(

            <nav>
                {lists}
            </nav>
        );
    }
}

export default TOC;