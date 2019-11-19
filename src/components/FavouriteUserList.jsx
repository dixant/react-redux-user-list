import React from 'react';
import {Link} from 'react-router-dom';

class FavouriteUserList extends React.Component{
    constructor(props){
        super(props);
        this.state= {};
    }
    render(){
        return(
            <div>
                <Link to="/">User List</Link>
            </div>
        )
    }
}
export default FavouriteUserList;