import React from 'react';
import { connect } from "react-redux";
import { fetchFavouriteUsers, addToFavorite } from "../store/actions/index";
import FavouriteToggle from './FavouriteToggle';
import { Container, Row, Col } from 'react-bootstrap';

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
                <Container>
                    <div className="cards">
                        {favUsers && favUsers.length > 0 ? favUsers.map((data, index) => (
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
