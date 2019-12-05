import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchFavouriteUsers, addToFavorite } from "../store/actions/index";
import FavouriteToggle from './FavouriteToggle';

class FavouriteUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFavourite = this.handleFavourite.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchFavouriteUsers());
    }
    handleFavourite(id, user) {
        this.props.dispatch(addToFavorite(id, user));
    }
    render() {
        const { error, isLoading, favUsers } = this.props;
        return (
            <div>
                <table className="user-list">
                    {favUsers.length > 0 ? <caption>Favourite User List</caption> : null}
                    {favUsers && favUsers.length > 0 ? <thead><tr><th>Id</th><th>UId</th><th>Title</th><th>Body</th><th>Favourite</th></tr></thead> : null}
                    {favUsers && favUsers.length > 0 ? favUsers.map((data, index) => (
                        <tbody key={index} id={data.id} className="user-list-item">
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.userId}</td>
                                <td>{data.title}</td>
                                <td>{data.body}</td>
                                <td><FavouriteToggle onChange={this.handleFavourite} userData={data} /></td>
                            </tr>
                        </tbody>
                    )) : null}
                </table>
                {error && <div style={{ color: '#900' }}>{error}</div>}
                {isLoading && <div className="loading-container">
                    <img alt="loading" src={require('../images/loadMore.gif')}></img>
                </div>}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return ({
        favUsers: state.favUsers.favUsers || [],
        isLoading: state.favUsers.isLoading,
        error: state.favUsers.error
    });
}
export default connect(mapStateToProps)(FavouriteUserList);
