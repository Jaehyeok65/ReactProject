import './App2.css';
import React, { Component } from 'react';
import Subject from './ReactPractice/Subject'
import TOC from './ReactPractice/TOC';
import ReadContent from './ReactPractice/ReadContent';
import CreateContent from './ReactPractice/CreateContent';
import Control from './ReactPractice/Control';
import UpdateContent from './ReactPractice/Updatecontent';


class App3 extends Component {
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state = {
            subject : {title : 'Web', sub : 'World Wide Web'},
            welcome : {title : 'Welcome', sub : 'Hello! React!'},
            mode : 'welcome',
            content : [
                {id : 1, title : 'HTML', desc : 'HTML is for information'},
                {id : 2, title : 'CSS', desc : 'CSS is for design'},
                {id : 3, title : 'JavaScript', desc : 'JavaScript is for interactive'}
            ],
            selected_id : 1,
        };
    }


    render() {
        var _title, _desc, _article = null;
        if(this.state.mode === 'read') {
            var i = 0;
            while(i < this.state.content.length) {
                if(this.state.content[i].id === this.state.selected_id) {
                    _title = this.state.content[i].title;
                    _desc = this.state.content[i].desc;
                    break;
                }
                i = i + 1;
            }
            _article = <ReadContent title = {_title} desc = {_desc} />
        }
        else if(this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.sub;
            _article = <ReadContent title = {_title} desc = {_desc} />
        }
        else if(this.state.mode === 'create') {
            _article = <CreateContent onChangeToc = {function(create_title, create_desc){
                this.max_content_id = this.max_content_id + 1 ;
                var Toclist = Array.from(this.state.content);
                Toclist.push({id : this.max_content_id, title : create_title, desc : create_desc});
                this.setState(
                    {content : Toclist,
                     mode : 'read',
                     selected_id : this.max_content_id
                    });
            }.bind(this)}/>
        }
        else if(this.state.mode === 'update') {
            var j = 0;
            while(j < this.state.content.length) {
                var data = this.state.content[j];
                if(data.id === this.state.selected_id) {
                    break;
                }
                j = j + 1;
            }
            _article = <UpdateContent data = {data} onChangeToc = {function(update_id, update_title, update_desc){
                var Toclist = Array.from(this.state.content);
                var t = 0;
                while(t < Toclist.length) {
                    if(Toclist[t].id === update_id) {
                        Toclist[t] = {id : update_id, title : update_title, desc : update_desc};
                        break;
                    }
                    t = t + 1;
                }
                this.setState({
                    content : Toclist,
                    mode : 'read',
                    });
            }.bind(this)}/>
        }
        return (
            <div>
                <Subject title = {this.state.subject.title} sub = {this.state.subject.sub} onChangeMode = {function(e){
                    this.setState({mode : 'welcome'});
                }.bind(this)} />
                <br/>
                <TOC onChangePage = {function(id){
                     this.setState({
                         mode : 'read',
                         selected_id : Number(id)
                       });}.bind(this)}
                    data = {this.state.content} />
                <Control onChangeMode = {function(_mode){
                    if(_mode === 'delete') {
                     if(window.confirm('really?')) {
                        var _contents = Array.from(this.state.content);
                        var i = 0;
                        while(i < _contents.length) {
                            console.log('hi4');
                        if(_contents[i].id === this.state.selected_id) {
                            _contents.splice(i,1);
                         break;
                          }
                         i = i + 1;
                        }
                        this.setState({
                            content : _contents,
                            mode : 'welcome'
                        })
              alert('삭제가 완료되었어요!');
            }
          }
          else {
            this.setState({
              mode : _mode
            });
          }
        }.bind(this)} />
                    {_article}
            </div>
        );
    }
}

export default App3;