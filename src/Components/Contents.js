import React from 'react';

class Contents extends React.Component {

    render() {

        return (
            <article>
                <h2>{this.props.title}</h2>
                {this.props.desc}
            </article>
        );
    }
}

export default Contents;