import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField  from '@material-ui/core/TextField';
import StarRate from './StarRate';

const styles = theme => ({
    fab : {
        position : 'fixed',
        bottom : '20px',
        right : '20px'
    },
    fab1 : {
        position : 'fixed',
        bottom : '20px',
        right : '250px',
    },
    fab2 : {
        position : 'fixed',
        bottom : '20px',
        right : '100px'
    }
});

  const databaseURL = "https://webtoon-8763b-default-rtdb.firebaseio.com/";




class Webtoon extends Component {
    constructor() {
        super();
        this.state = {
            webtoons : {},
            dialog : false,
            webtoon : '',
            views : '',
            list : [],
            mode : false,
            default : 1,
            starRate : [{id : 1, rate : 5}],
            selectd_rate_id : 1,
        };
    }

    _post(webtoon) {
        return fetch(`${databaseURL}/webtoons.json`, {
            method : 'POST',
            body : JSON.stringify(webtoon)
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.webtoons;
            nextState[data.name] = webtoon;
            this.setState({webtoons : nextState});
        })

    }
    compareby_Desc(key) {
        return function(a,b) {
            var x = parseInt(a[key]);
            var y = parseInt(b[key]);

            if(x<y) return 1;
            if(x>y) return -1;
            return 0;
        };
    }
    sortby_Desc(key) {
        this.state.list.sort(this.compareby_Desc(key));
    }
    modeChange = () => this.setState({
        mode : !this.state.mode,
        default : this.state.default + 1
    });

    _delete(id) {
        return fetch(`${databaseURL}/webtoons/${id}.json`, {
            method : 'DELETE',
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.webtoons;
            delete nextState[id];
            this.setState({webtoons : nextState});
        })
    }

    _get() {
        fetch(`${databaseURL}/webtoons.json`).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(webtoons => this.setState({webtoons : webtoons}));
    }

    componentDidMount() {
        this._get();
    }

    handleDialogToggle = () => this.setState({
        dialog : !this.state.dialog
    });

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    handleSubmit = () => {
        const webtoon = {
            webtoon : this.state.webtoon,
            views : this.state.views
        }
        this.handleDialogToggle();
        if(!webtoon.webtoon && !webtoon.views) {
            return;
        }
        this._post(webtoon);
    }

    handleDelete = (id) => {
        this._delete(id);
    }



    render() {
        console.log(this.state.selectd_rate_id);
        const { classes } = this.props;
        if(this.state.mode === false){
        return (
            <div>
                {Object.keys(this.state.webtoons).map(id => {
                    const webtoon = this.state.webtoons[id];
                    if(this.state.default === 1) {
                        this.state.list.push(webtoon);
                        }
                    return (
                        <div key = {id}>
                            <Card>
                    <CardContent>
                        <Typography color = "textSecondary" gutterBottom>
                            조회수 : {webtoon.views}
                        </Typography>
                        <Grid container>
                            <Grid item xs = {6}>
                        <Typography variant = "h5" component = "h2">
                        <a href = "/" data-id = {id} onClick = { function(e){
                            e.preventDefault();
                            this.setState({
                                selectd_rate_id : id
                            })
                        }.bind(this)}>
                        {webtoon.webtoon}
                        </a>
                        </Typography>
                        </Grid>
                        <Grid item xs = {6}>
                            <Button variant = "contained" color ="primary" onClick = {() => this.handleDelete(id)}>삭제</Button>
                            </Grid>
                        </Grid>
                        <StarRate data = {this.state.starRate} />
                    </CardContent>
                </Card>
                        </div>
                    )
                })}
                <Fab color = "primary" className = { classes.fab } onClick = {this.handleDialogToggle}>
                    <AddIcon />
                </Fab>
                <Button variant = "contained" className = { classes.fab2 } color = "primary" onClick = {this.sortby_Desc('views')} >조회순 정렬</Button>
                <Button variant = "contained" className = { classes.fab2 } color = "primary" onClick = {this.modeChange} >조회수 높은 순</Button>
                <Dialog open = {this.state.dialog} onClose = { this.handleDialogToggle}>
                    <DialogTitle>웹툰 추가</DialogTitle>
                    <DialogContent>
                        <TextField label = "웹툰" type = "text" name = "webtoon"  onChange = {this.handleValueChange}></TextField>
                        <TextField label = "조회수" type = "text" name = "views"  onChange = {this.handleValueChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "contained" color = "primary" onClick = {this.handleSubmit}>추가</Button>
                        <Button variant = "outlined" color = "primary" onClick = {this.handleDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
             </div>
        );
        }
        else if(this.state.mode === true) {
            return (
                <div>
                    {Object.keys(this.state.list).map(id => {
                        const webtoon = this.state.list[id];
                        return (
                            <div key = {id}>
                                <Card>
                        <CardContent>
                            <Typography color = "textSecondary" gutterBottom>
                                조회수 : {webtoon.views}
                            </Typography>
                            <Grid container>
                                <Grid item xs = {6}>
                            <Typography variant = "h5" component = "h2">
                                {webtoon.webtoon}
                            </Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Button variant = "contained" color ="primary" onClick = {() => this.handleDelete(id)}>삭제</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                            </div>
                        )
                    })}
                    <Fab color = "primary" className = { classes.fab } onClick = {this.handleDialogToggle}>
                        <AddIcon />
                    </Fab>
                    <Button variant = "contained" className = { classes.fab2 } color = "primary" onClick = {this.modeChange} >원래대로</Button>
                    <Dialog open = {this.state.dialog} onClose = { this.handleDialogToggle}>
                        <DialogTitle>웹툰 추가</DialogTitle>
                        <DialogContent>
                            <TextField label = "웹툰" type = "text" name = "webtoon"  onChange = {this.handleValueChange}></TextField>
                            <TextField label = "조회수" type = "text" name = "views"  onChange = {this.handleValueChange}></TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button variant = "contained" color = "primary" onClick = {this.handleSubmit}>추가</Button>
                            <Button variant = "outlined" color = "primary" onClick = {this.handleDialogToggle}>닫기</Button>
                        </DialogActions>
                    </Dialog>
                 </div>
            );

        }
    }
}

export default withStyles(styles)(Webtoon);