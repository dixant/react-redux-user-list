import React from 'react';
import {addToFavorite} from '../store/actions/index';

export default class FavouriteToggle extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     user: this.props.userData,

        // };
        this.handleFavourite = this.handleFavourite.bind(this);
    }
    handleFavourite = (e) => {
        console.log(e);
        let {userData} = this.props,
            isFavourite = !userData.isFavourite;
       

        //addToFavorite(userData.id, Object.assign({}, userData, {isFavourite}));
        
        //this.setState({ isFavourite: !this.state.isFavourite });
        //this.props.dispatch(fetchUsers(parseInt(this.props.userId) + 1));
    }
    render() {
        return (
            <label className="switch">
                <input type="checkbox" checked={this.props.userData.isFavourite} onChange={this.handleFavourite} />
                <span className="slider"></span>
            </label>
        )
    }

}
