import React from 'react';
import {Link} from 'redux-little-router';

export default class ContactGroupsComponent extends React.Component {
    // componentWillReceiveProps(nextProps, nextState) {
    //     console.log(nextProps);
    //     console.log(nextState);
    // }
    
    render () {
        return (
            <div className="contacts-group">
                <h5 className="h5-heading"> On This Mac </h5>
                <ul className="list-contacts app-list">

                    <Link className={'list-group-item' + (this.props.selectedGroup == -1 ? ' active' : '')} href='/groups'>
                        All Contacts
                    </Link>

                    {
                        this.props.groups.map((group) => {
                            return <Link key={group.id} className={'list-group-item' + (this.props.selectedGroup == group.id ? ' active' : '')} href={'/groups/' + group.id}>
                                {group.name}
                            </Link>
                        })
                    }

                </ul>
            </div>
        )
    }
};