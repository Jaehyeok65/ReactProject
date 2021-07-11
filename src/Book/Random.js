import React from 'react';
import Card from '@material-ui/core/Card';
import  CardContent  from '@material-ui/core/CardContent';


class Random extends React.Component {

    render() {

        return (
            <Card>
                <CardContent>
                    랜덤으로 추천받기
                </CardContent>
            </Card>
        );
    }
}

export default Random;