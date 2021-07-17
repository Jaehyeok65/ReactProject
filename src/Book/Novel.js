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
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import StarRateIcon from '@material-ui/icons/StarRate';

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

  const databaseURL = "https://novel-1a9b3-default-rtdb.firebaseio.com/";




class Novel extends React.Component {
    constructor() {
        super();
        this.state = {
            novels : {},
            dialog : false,
            modal : false,
            novel : '',
            views : '',
            list : [],
            mode : false,
            default : 1,
            starRate : [5],
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

    getStarRate() {
        var i = 0;
        var iconlist = [];
        while(i < 5) {
            iconlist.push(<StarRateIcon />)
            i = i + 1
        }
        
        return iconlist;
    }


    modeChange = () => this.setState({
        mode : !this.state.mode,
        default : this.state.default + 1
    });

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

    handleOpenModal = () => this.setState({
        modal : true
    });
    
    handleCloseModal = () => this.setState({
        modal : false
    })

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
        if(this.state.mode === false){
        return (
            <div>
                {Object.keys(this.state.novels).map(id => {
                    const novel = this.state.novels[id];
                    if(this.state.default === 1) {
                        this.state.list.push(novel);
                        }
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
                        <Link component = {RouterLink} to ='/bookinformation'>
                        { novel.novel }
                        </Link>
                        </Typography>
                        </Grid>
                        <Grid item xs = {6}>
                            <Button variant = "contained" color ="primary" onClick = {() => this.handleDelete(id)}>삭제</Button>
                            </Grid>
                            <Grid item xs = {8}>
                                <Button variant = "contained" color ="primary" onClick = {this.handleOpenModal}>별점 주기</Button>
                                </Grid>
                                <Dialog open = {this.state.modal} onClose = {this.handleCloseModal}>
                                    <DialogTitle>별점 평가</DialogTitle>
                                    <DialogContent>
                                <TextField label = "별점" type = "Integer" name = "starRate"  onChange = {this.handleValueChange}></TextField>
                                     </DialogContent>
                                     <DialogActions>
                                       <Button variant = "contained" color = "primary" onClick = {this.handleCloseModal}>평가</Button>
                                       <Button variant = "outlined" color = "primary" onClick = {this.handleCloseModal}>닫기</Button>
                                     </DialogActions>
                                </Dialog>
                                { this.getStarRate() }
                        </Grid>
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
        else if(this.state.mode === true) {
            return (
                <div>
                    {Object.keys(this.state.list).map(id => {
                        const novel = this.state.list[id];
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
                            <Link component = {RouterLink} to ='/bookinformation'>
                                { novel.novel }
                            </Link>
                            </Typography>
                            </Grid>
                            <Grid item xs = {6}>
                                <Button variant = "contained" color ="primary" onClick = {() => this.handleDelete(id)}>삭제</Button>
                                </Grid>
                                <Grid item xs = {8}>                                <Button variant = "contained" color ="primary" onClick = {this.handleOpenModal}>별점 주기</Button>
                                </Grid>
                                <Dialog open = {this.state.modal} onClose = {this.handleCloseModal}>
                                    <DialogTitle>별점 평가</DialogTitle>
                                    <DialogContent>
                                <TextField label = "별점" type = "Integer" name = "starRate"  onChange = {this.handleValueChange}></TextField>
                                     </DialogContent>
                                     <DialogActions>
                                       <Button variant = "contained" color = "primary" onClick = {this.handleCloseModal}>평가</Button>
                                       <Button variant = "outlined" color = "primary" onClick = {this.handleCloseModal}>닫기</Button>
                                     </DialogActions>
                                </Dialog>
                                { this.getStarRate()  }
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
}

export default withStyles(styles)(Novel);