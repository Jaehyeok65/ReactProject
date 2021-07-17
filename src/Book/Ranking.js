import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'

const styles = theme => ({
    fab : {
        position : 'fixed',
        bottom : '20px',
        right : '20px'
    },
    fab1 : {
        position : 'fixed',
        bottom : '20px',
        right : '180px'
    }
});

const databaseURL = "https://novel-1a9b3-default-rtdb.firebaseio.com/";

class Ranking extends React.Component {
    constructor() {
        super();
        this.state = {
            novels : {},
            list : [],
            mode : false,
            default : 1,
        };
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


    render() {
        const {classes } = this.props;
        console.log(this.state.default);
        if(this.state.mode === false) {
        return (
            <div>
                { Object.keys(this.state.novels).map(id => {
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
                    <Typography variant = "h5" component = "h2">
                        <Link component = {RouterLink} to ='/bookinformation'>
                        { novel.novel }
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
                    </div>
                )
            })}
            <Button variant = "contained" className = { classes.fab } color = "primary" onClick = {this.sortby_Desc('views')} >조회순 정렬</Button>
            <Button variant = "contained" className = { classes.fab1 } color = "primary" onClick = {this.modeChange} >조회수 높은 순으로 보기</Button>
            </div>
        );
    }
    else if(this.state.mode === true) {
        return (
            <div>
                { Object.keys(this.state.list).map(id => {
                const novel = this.state.list[id];
                return (
                    <div key = {id}>
                        <Card>
                <CardContent>
                    <Typography color = "textSecondary" gutterBottom>
                        조회수 : {novel.views}
                    </Typography>
                    <Typography variant = "h5" component = "h2">
                        { novel.novel }
                    </Typography>
                </CardContent>
            </Card>
                    </div>
                )
            })}
            <Button variant = "contained" className = { classes.fab } color = "primary" onClick = {this.modeChange} >원래대로</Button>
            </div>
        );

    }
    }
}

export default withStyles(styles)(Ranking);