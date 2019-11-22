import React from 'react';

class FavouriteToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavourite: this.props.userData.isFavourite
        };
        this.handleFavourite = this.handleFavourite.bind(this);
    }

    handleFavourite = (e) => {
        let { userData } = this.props,
            isFavourite = !userData.isFavourite,
            changeState = () => { this.setState({ isFavourite: !this.state.isFavourite }) };

        this.props.onChange(userData.id, Object.assign({}, userData, { isFavourite }), changeState);

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

export default FavouriteToggle; 