import React from 'react';
import {Link} from 'redux-little-router';

export default class ContactsListComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            search: '',
            contacts: []
        };
    }

    componentDidMount() {
        this.updateContacts(this.props);
    }

    componentWillReceiveProps(props) {
        this.updateContacts(props);
    }

    updateContacts(props) {
        let searchTerm = props.location.query.search;

        if (searchTerm) {
            this.setStateForSearch(searchTerm);
        } else {
            this.setState({
                contacts: props.contacts
            });
        }

        this.searchInput.focus();
    }

    setStateForSearch(searchTerm) {
        this.setState({
            search: searchTerm,
            contacts: this.props.contacts.filter(contact => contact.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        });
    }

    search(event) {
        this.setStateForSearch(event.target.value);
        
        let query = {
            search: event.target.value
        };

        if (event.target.value === '') {
            query = {};
        }

        this.props.onSearch({
            pathname: this.props.location.pathname,
            query
        });
    }
    
    render () {
        return (
            <div className="contacts-list" id="search-contacts">
                <div className="input-group">
                    <div className="input-group-addon"><span className="glyphicon glyphicon-search"></span></div>
                    <input 
                        ref={(input) => { this.searchInput = input; }}
                        value={this.state.search} 
                        onChange={(event) => this.search(event)} 
                        type="text" className="form-control" placeholder="Search" />
                </div>

                <ul className="list-group app-list">
                    {
                        this.state.contacts.map((contact) => {
                                return <Link 
                                    key={`${contact.id} - ${contact.group_id}`} 
                                    className={'list-group-item' + (this.props.selectedContact.id == contact.id ? ' active' : '')} 
                                    href={`/groups/${contact.group_id}/${contact.id}`}>
                                    {`${contact.firstName} ${contact.lastName}`}
                                </Link>

                        })
                    }
                </ul>
            </div>
        )
    }
};