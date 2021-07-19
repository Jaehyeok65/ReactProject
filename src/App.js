import React, { Component } from 'react';
import './App.css';
import Subject from './Components/Subject';
import TOC from './Components/TOC';
import ReadContents from './Components/ReadContents';
import Control from './Components/Control';
import CreateContents from './Components/CreateContent';
import UpdateContents from './Components/UpdateContent';

class App extends Component {

  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode : 'welcome',
      selected_content_id : 1,
      subject : {title : 'Web', sub : 'World Wide Web!'},
      welcome : {title : 'Welcome', desc : 'Hello! React!'},
      contents : [
        {id : 1, title : 'HTML', desc : 'HTML is for information'},
        {id : 2, title : 'CSS', desc : 'CSS is for design '},
        {id : 3, title : 'JavaScript', desc : 'JavaScript is for interactive'}
      ]
    };
  }

  getReadContent() {
    var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title = {_title} desc = {_desc} />
    }
    else if(this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContents title = {_content.title} desc = {_content.desc} />
    }

    else if(this.state.mode === 'create') {
      _article = <CreateContents onSubmit = {function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = Array.from(this.state.contents);
        _contents.push({id : this.max_content_id, title : _title, desc : _desc});
          this.setState({
            contents : _contents,
            mode : 'read',
            selected_content_id : this.max_content_id
          });
      }.bind(this)}/>
    }

    else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContents data = { _content } onSubmit = {
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id : _id, title : _title, desc : _desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents : _contents,
            mode : 'read'
          });
      }.bind(this)}/>
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject title = {this.state.subject.title} sub = {this.state.subject.sub}
        onChangePage = {function(){
          this.setState({ mode : 'welcome'});
        }.bind(this)}
        />
        <TOC onChangePage = {function(id){
          this.setState({
            mode : 'read',
            selected_content_id : Number(id)
          });
        }.bind(this)}data = {this.state.contents} />
        <Control onChangeMode = {function(_mode){
          if(_mode === 'delete') {
            if(window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                contents : _contents,
                mode : 'welcome'
              });
              alert('삭제가 완료되었어요!');
            }
          }
          else {
            this.setState({
              mode : _mode
            });
          }
        }.bind(this)} />
        {this.getContent()}
      </div>
    );
  }
}


export default App;
