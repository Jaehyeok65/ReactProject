import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';


const databaseURL = "https://novel-1a9b3-default-rtdb.firebaseio.com/";

class Ranking extends React.Component {
    constructor() {
        super();
        this.state = {
            novels : {}
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

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.novels !== this.state.novels;
    }

    componentDidMount() {
        this._get();
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
            </div>
        );
    }
}

export default Ranking;