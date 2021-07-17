import React from 'react';


class TOC extends React.Component {

    shouldComponentUpdate(newProps, newState) {
        if(this.props.data === newProps.data) { //프롭스와 스테이트 둘 다 데이터 변경이 없으면
            return false;
        }
        return true;
    }


    render() {
        console.log("Toc render");
        var data = this.props.data;
        var i = 0;
        var list = [];
        while(i < data.length) {
            list.push(<li key = {data[i].id}><a
                 href = {"/contents"+data[i].id}
                 data-id = {data[i].id}
                  onClick = {function(e){
                      e.preventDefault();
                      this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}>
            {data[i].title}</a>
            </li>)
            i = i + 1;
        }

        return (
            <nav>
                <ul>
                { list }
                </ul>
            </nav>
        );
    }


}



export default TOC;