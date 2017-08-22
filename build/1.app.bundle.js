webpackJsonp([1],{71:/*!***************************************************!*\
  !*** ./js/components/ContactDetailsComponent.jsx ***!
  \***************************************************/
function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(/*! react */11),r=n(i),u=a(/*! redux-little-router */18),d=function(e){function t(){l(this,t);var e=c(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleChange=e.handleChange.bind(e),e.componentDidMount=e.setFocusOnTextBox,e.componentDidUpdate=e.setFocusOnTextBox,e}return s(t,e),o(t,[{key:"componentWillMount",value:function(){this.setState({}),this.updateState(this.props)}},{key:"componentWillReceiveProps",value:function(e){this.updateState(e)}},{key:"updateState",value:function(e){this.setState({contact:e.contact})}},{key:"setFocusOnTextBox",value:function(){this.props.isEditMode&&this.firstName.focus()}},{key:"handleChange",value:function(e){var t=this.state.contact;t[e.target.dataset.key]=e.target.value,this.updateState({contact:t})}},{key:"render",value:function(){var e=this;return r.default.createElement("div",{className:"contacts-details"},this.state.contact!==-1&&r.default.createElement("div",null,r.default.createElement("div",{className:"contact-header-details-container"},r.default.createElement("div",{className:"contact-image-container img-circle"},r.default.createElement("span",{className:"name-initials"},"FL")),r.default.createElement("div",{className:"contact-name-container form-inline"},r.default.createElement("h3",{className:"company-name"},this.props.isEditMode?r.default.createElement("input",{type:"text",className:"form-control","data-key":"firstName",ref:function(t){e.firstName=t},onChange:this.handleChange,value:this.state.contact.firstName}):this.state.contact.firstName,this.props.isEditMode?r.default.createElement("input",{type:"text",className:"form-control txt-last-name","data-key":"lastName",onChange:this.handleChange,value:this.state.contact.lastName}):" "+this.state.contact.lastName))),r.default.createElement("div",{className:"action-containers"},r.default.createElement("a",{href:"#",className:"glyphicon glyphicon-envelope","aria-hidden":"true"}),r.default.createElement("a",{href:"#",className:"glyphicon glyphicon-facetime-video","aria-hidden":"true"}),r.default.createElement("a",{href:"#",className:"glyphicon glyphicon-phone","aria-hidden":"true"}),r.default.createElement("a",{href:"#",className:"glyphicon glyphicon-floppy-saved","aria-hidden":"true"})),r.default.createElement("hr",null),r.default.createElement("div",{className:"contact-details-container"},r.default.createElement("div",{className:"container-row"},this.state.contact.phone&&this.state.contact.phone.map(function(e,t){return r.default.createElement("div",{key:t,className:"row"},r.default.createElement("div",{className:"col-xs-2 text-right text-muted bold"},r.default.createElement("span",null,e.type)),r.default.createElement("div",{className:"col-xs-10"},e.value))})),r.default.createElement("hr",null),r.default.createElement("div",{className:"container-row"},this.state.contact.email&&this.state.contact.email.map(function(e,t){return r.default.createElement("div",{key:t,className:"row"},r.default.createElement("div",{className:"col-xs-2 text-right text-muted bold"},r.default.createElement("span",null,e.type)),r.default.createElement("div",{className:"col-xs-10"},e.value))})),r.default.createElement("hr",null),r.default.createElement("div",{className:"container-row"},this.state.contact.website&&this.state.contact.website.map(function(e,t){return r.default.createElement("div",{key:t,className:"row"},r.default.createElement("div",{className:"col-xs-2 text-right text-muted bold"},r.default.createElement("span",null,e.type)),r.default.createElement("div",{className:"col-xs-10"},e.value))})),r.default.createElement("div",{className:"actions"},this.props.isEditMode?r.default.createElement("button",{className:"btn btn-sm btn-default pull-right",onClick:this.props.updateContact(this.contact)}," Done "):r.default.createElement(u.Link,{key:this.state.contact.id+" - "+this.state.contact.group_id,className:"btn btn-sm btn-default pull-right",href:"/groups/"+this.state.contact.group_id+"/"+this.state.contact.id+"/edit"},"Edit")))))}}]),t}(r.default.Component);t.default=d}});
//# sourceMappingURL=1.app.bundle.js.map