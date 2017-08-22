var React = require('react');
var ReactDOM = require('react-dom');

require("../../css/TestComponent.css");

var TestComponent = React.createClass({
    getDefaultProps: function () {
        return ({
            heading: null,
            close: true
        });
    },
    render: function () {
        return (
                <div>
                    <h1> This is a test component </h1>
                </div>
        );
    }
});

ReactDOM.render(<TestComponent />,  document.getElementById("app"));
