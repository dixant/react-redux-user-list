import React from 'react';
import { Link } from 'react-router-dom';
import { throttle } from 'lodash';

import { connect } from "react-redux";
import { fetchUsers, addToFavorite } from "../store/actions/index";

import FavouriteToggle from './FavouriteToggle';


class UserList extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.handleFavourite = this.handleFavourite.bind(this);
    }
    componentDidMount() {
        if (this.props.users.length < 1) {
            this.props.dispatch(fetchUsers());
        }
        this.refs.userScroll.addEventListener("scroll", this.onScrollCall);

    }
    componentWillUnmount() {
        this.refs.userScroll.removeEventListener("scroll", throttle(this.onScrollCall, 1000));
    }
    onScrollCall = () => {
        if (this.refs.userScroll.scrollTop + this.refs.userScroll.clientHeight >= this.refs.userScroll.scrollHeight && this.props.hasMore && !this.props.isLoading) {
            this.props.dispatch(fetchUsers(parseInt(this.props.userId) + 1));
        }
    }
    handleFavourite(id, user, changeState) {
        this.props.dispatch(addToFavorite(id, user))
            .then((dataDispatched) => {
                if (dataDispatched === true) {
                    changeState();
                }
            });
    }
    render() {
        const { error, hasMore, isLoading, users } = this.props;
        return (
            <div id="user-scroll-view" ref="userScroll">
                <Link to="/favourites">Favourites User List</Link>
                <table className="user-list">
                    {users.length > 0 ? <thead><tr><th>Id</th><th>UId</th><th>Title</th><th>Body</th><th>Favourite</th></tr></thead> : null}
                    {users.length > 0 ? users.map((data, index) => (
                        <tbody key={index} id={data.id} className="user-list-item">
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.userId}</td>
                                <td>{data.title}</td>
                                <td>{data.body}</td>
                                <td><FavouriteToggle userList="true" onChange={this.handleFavourite} userData={data} /></td>
                            </tr>
                        </tbody>
                    )) : null}
                </table>
                {error && <div style={{ color: '#900' }}>{error}</div>}
                {isLoading && <div className="loading-container">
                    <img alt="loading" src={require('../images/loadMore.gif')}></img>
                </div>}
                {!hasMore && <div>You did it! You reached the end!</div>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return ({
        users: state.users.users || [],
        isLoading: state.users.isLoading,
        error: state.users.error,
        hasMore: state.users.hasMore,
        userId: state.users.userId
    });
}

export default connect(mapStateToProps)(UserList);

