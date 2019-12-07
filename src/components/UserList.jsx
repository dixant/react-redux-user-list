import React from 'react';
import { connect } from "react-redux";
import { fetchUsers, addToFavorite } from "../store/actions/index";
import FavouriteToggle from './FavouriteToggle';
import { Container, Row, Col } from 'react-bootstrap';

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
        this.refs.userScroll.removeEventListener("scroll", this.onScrollCall);
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
                <Container>
                    <div className="cards">
                        {users.length > 0 ? users.map((data, index) => (
                            <div className="card" key={index}>
                                <Container className="card-title">
                                    <Row>
                                        <Col>
                                            <span className="lineh30">ID: {data.id}</span>
                                            {/* <span>UID: 1</span> */}
                                        </Col>
                                        <Col className="text-right">
                                            <FavouriteToggle userList="true" onChange={this.handleFavourite} userData={data} />
                                        </Col>
                                    </Row>
                                </Container>
                                <p className="card-header">Title: {data.title}</p>
                                <span className="card-summary">Body: {data.body}</span>
                                <span className="card-meta">
                                    ID: {data.id}, User ID: {data.userId}
                                </span>
                            </div>
                        )) : null}

                    </div>
                </Container>
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

