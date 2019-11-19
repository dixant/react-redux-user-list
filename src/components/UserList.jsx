import React from 'react';
import { Link } from 'react-router-dom';
import FavouriteToggle from './FavouriteToggle';
import { throttle } from 'lodash';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            userId: 1,
            isLoading: false,
            users: []
        };
    }
    loadUsers = (userId) => {
        this.setState({ isLoading: true }, () => {
            setTimeout(() => {
                fetch(`http://localhost:3000/posts?userId=${userId}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            const nextUser = result.map(data => ({
                                userId: data.userId,
                                id: data.id,
                                isFavourite: data.isFavourite,
                                title: data.title,
                                body: data.body,
                            }));
                            if (nextUser.length > 0) {
                                this.setState({
                                    hasMore: (this.state.userId < 11),
                                    isLoading: false,
                                    userId: parseInt(nextUser[0].userId) + 1,
                                    users: [...this.state.users, ...nextUser],
                                });
                            }
                            else {
                                this.setState({
                                    isLoading: false
                                })
                            }

                        },
                        (error) => { this.setState({ isLoading: false, error: true }) }
                    )
            }, 2000);
        })
    }

    componentDidMount() {
        if (this.state.userId == 1) { this.loadUsers(this.state.userId) }
        this.refs.userScroll.addEventListener("scroll", this.onScrollCall);
    }
    componentWillUnmount() {
        this.refs.userScroll.removeEventListener("scroll", throttle(this.onScrollCall, 1000));
    }
    onScrollCall = () => {
        if (this.refs.userScroll.scrollTop + this.refs.userScroll.clientHeight >= this.refs.userScroll.scrollHeight && this.state.hasMore) {
            this.loadUsers(this.state.userId);
        }
    }
    handleFavourite(e) {
        console.log(e.target);
    }
    render() {
        const { error, hasMore, isLoading, users } = this.state;
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
                                <td><FavouriteToggle isFavourite={data.isFavourite} /></td>
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
export default UserList;