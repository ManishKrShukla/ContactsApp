import React from 'react';
import {Link} from 'redux-little-router';
import { Fragment } from 'redux-little-router';

export default class ContactDetailsComponent extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.setFocusOnTextBox;
        this.componentDidUpdate = this.setFocusOnTextBox;
    }

    componentWillMount() {
        this.setState({});
        this.updateState(this.props);            
    }

    componentWillReceiveProps(props) {
        this.updateState(props);
    }

    updateState(props) {
        this.setState({
            contact: props.contact
        });
    }

    setFocusOnTextBox() {
        if (this.props.isEditMode) {
            this.firstName.focus();
        }
    }

    handleChange(event) {
        let contact = this.state.contact;
        contact[event.target.dataset['key']] = event.target.value;
        this.updateState({
            contact
        });
    }

    render () {
        return (
            <div className="contacts-details">
                {/* <Fragment forRoute='/groups/:group/:contact'> */}
                    {this.state.contact !== -1 && 
                    <div>
                        <div className="contact-header-details-container">
                            <div className="contact-image-container img-circle">
                                <span className="name-initials">FL</span>
                            </div>

                            <div className="contact-name-container form-inline">
                                <h3 className="company-name">
                                    {
                                        !this.props.isEditMode ? this.state.contact.firstName : 
                                        <input type="text" className="form-control" 
                                            data-key="firstName" 
                                            ref={(input) => { this.firstName = input; }}
                                            onChange={this.handleChange} value={this.state.contact.firstName} />
                                    } 

                                    {
                                        !this.props.isEditMode ? ' ' +  this.state.contact.lastName : 
                                        <input type="text" className="form-control txt-last-name"
                                            data-key="lastName"
                                            onChange={this.handleChange} value={this.state.contact.lastName} />
                                    } 
                                </h3>
                            </div>
                        </div>


                        <div className="action-containers">
                            <a href="#" className="glyphicon glyphicon-envelope" aria-hidden="true"></a>
                            <a href="#" className="glyphicon glyphicon-facetime-video" aria-hidden="true"></a>
                            <a href="#" className="glyphicon glyphicon-phone" aria-hidden="true"></a>
                            <a href="#" className="glyphicon glyphicon-floppy-saved" aria-hidden="true"></a>
                        </div>

                        <hr />

                        <div className="contact-details-container">
                        
                            <div className="container-row">
                                {
                                    this.state.contact.phone && this.state.contact.phone.map((phoneType, index) => {
                                    return <div key={index} className="row">
                                            
                                            <div className="col-xs-2 text-right text-muted bold">
                                                <span>{phoneType.type}</span>
                                            </div>

                                            <div className="col-xs-10">
                                                {phoneType.value}
                                            </div>
                                        </div>

                                    })

                                }

                            </div>

                            <hr />

                            <div className="container-row">
                                {
                                    this.state.contact.email && this.state.contact.email.map((emailType, index) => {
                                    return <div key={index} className="row">
                                            
                                            <div className="col-xs-2 text-right text-muted bold">
                                                <span>{emailType.type}</span>
                                            </div>

                                            <div className="col-xs-10">
                                                {emailType.value}
                                            </div>
                                        </div>

                                    })

                                }

                            </div>

                            <hr />

                            <div className="container-row">
                                {
                                    this.state.contact.website && this.state.contact.website.map((siteType, index) => {
                                    return <div key={index} className="row">
                                            
                                            <div className="col-xs-2 text-right text-muted bold">
                                                <span>{siteType.type}</span>
                                            </div>

                                            <div className="col-xs-10">
                                                {siteType.value}
                                            </div>
                                        </div>

                                    })

                                }

                            </div>

                            <div className="actions">

                                {
                                    this.props.isEditMode ?  
                                        <button className="btn btn-sm btn-default pull-right" onClick={this.props.updateContact(this.contact)}> Done </button> : 
                                        
                                        <Link 
                                            key={`${this.state.contact.id} - ${this.state.contact.group_id}`} 
                                            className='btn btn-sm btn-default pull-right' 
                                            href={`/groups/${this.state.contact.group_id}/${this.state.contact.id}/edit`}>
                                            Edit
                                        </Link>
                                }

                            </div>

                        </div>
                    </div>
                    }
                {/* </Fragment> */}
            </div>
                
        )
    }
};