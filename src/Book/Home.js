import React from 'react';
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

const styles = theme => ({
    fab : {
        position : 'fixed',
        bottom : '20px',
        right : '20px'
    }
});

  const databaseURL = "https://novel-1a9b3-default-rtdb.firebaseio.com/";




class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            novels : {},
            dialog : false,
            novel : '',
            views : ''
        };
    }

    _post(novel) {
        return fetch(`${databaseURL}/novels.json`, {
            method : 'POST',
            body : JSON.stringify(novel)
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.novels;
            nextState[data.name] = novel;
            this.setState({novels : nextState});
        })

    }

    _delete(id) {
        return fetch(`${databaseURL}/novels/${id}.json`, {
            method : 'DELETE',
        }).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.novels;
            delete nextState[id];
            this.setState({novels : nextState});
        })
    }

    _get() {
        fetch(`${databaseURL}/novels.json`).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(novels => this.setState({novels : novels}));
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
        const novel = {
            novel : this.state.novel,
            views : this.state.views
        }
        this.handleDialogToggle();
        if(!novel.novel && !novel.views) {
            return;
        }
        this._post(novel);
    }

    handleDelete = (id) => {
        this._delete(id);
    }


    render() {
        const { classes } = this.props;

        return (
            <div>
                {Object.keys(this.state.novels).map(id => {
                    const novel = this.state.novels[id];
                    return (
                        <div key = {id}>
                            <Card>
                    <CardContent>
                        <Typography color = "textSecondary" gutterBottom>
                            조회수 : {novel.views}
                        </Typography>
                        <Grid container>
                            <Grid item xs = {6}>
                        <Typography variant = "h5" component = "h2">
                            { novel.novel }
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
                <Dialog open = {this.state.dialog} onClose = { this.handleDialogToggle}>
                    <DialogTitle>무협지 추가</DialogTitle>
                    <DialogContent>
                        <TextField label = "소설" type = "text" name = "novel"  onChange = {this.handleValueChange}></TextField>
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

export default withStyles(styles)(Home);