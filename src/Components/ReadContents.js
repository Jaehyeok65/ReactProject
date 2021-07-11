import React from 'react';

class ReadContents extends React.Component {

    render() {

        return (
            <article>
                <h2>{this.props.title}</h2>
                {this.props.desc}
            </article>
        );
    }
}

export default ReadContents;