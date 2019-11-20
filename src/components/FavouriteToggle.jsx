import React from 'react';

export default class FavouriteToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: this.props.isFavourite || false,

        };
        this.handleFavourite = this.handleFavourite.bind(this);
    }
    handleFavourite(e) {
        this.setState({ isFavourite: !this.state.isFavourite });
    }
    render() {
        return (
            <label className="switch">
                <input type="checkbox" checked={this.state.isFavourite} onChange={this.handleFavourite} />
                <span className="slider"></span>
            </label>
        )
    }

}
