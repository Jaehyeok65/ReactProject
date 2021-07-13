import React from 'react';
import Card from '@material-ui/core/Card';
import Typography  from '@material-ui/core/Typography';
import CardContent  from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const databaseURL = "https://novel-1a9b3-default-rtdb.firebaseio.com"




class Pra1 extends React.Component {
    constructor() {
        super();
        this.state = {
            novels : []
        };
        this.compareby_Asc();
        this.sortby_Asc();

    }
    _get() {
        fetch(`${databaseURL}/novels.json`).then(res => {
            if(res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(novels => this.setState({novels : novels}));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.novels !== this.state.novels;
    }

    componentDidMount() {
        this._get();
    }

    compareby_Asc(key) {
        return function(a,b) {
            var x = parseInt(a[key]);
            var y = parseInt(b[key]);

            if(x<y) return -1;
            if(x>y) return 1;
            return 0;
        };
    }

    sortby_Asc(key) {
        let lists = [];
        let arrayCopy = lists.concat(this.state.novels);
        arrayCopy.sort(this.compareby_Asc(key));
        this.setState({novels : arrayCopy});
    }



    render() {

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
                        <Typography variant = "h5" component = "h2">
                            { novel.novel }
                        </Typography>
                    </CardContent>
                </Card>
                        </div>
                    )
                })}
                <Button color = "secondary" onClick = {() => this.sortby_Asc('views')}>조회수 정렬</Button>
            </div>
        )
    }
}

export default Pra1;