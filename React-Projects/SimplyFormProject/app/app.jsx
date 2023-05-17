const ReactDOM = require("react-dom/client");
const React = require("react");
const Header = require("./components/header.jsx");
const Article = require("./components/article.jsx");
  
const header = "Cтраница простой формы";
const article = "Ниже представлена простая пользовательская форма";

class NameField extends React.Component {
    constructor(props) {
        super(props);
        var isValid = this.validate(props.value);
        this.state = {value: props.value, valid: isValid};
        this.onChange = this.onChange.bind(this);
    }
    validate(val){
        return val.length>2;
    }
    onChange(e) {
        var val = e.target.value;
        var isValid = this.validate(val);
        this.setState({value: val, valid: isValid});
    }
    render() {
        var color = this.state.valid===true?"green":"red";
        return <p>
            <label>Name:</label><br />
            <input type="text" value={this.state.value} onChange={this.onChange} style={{borderColor:color}} />
        </p>;
    }   
}
class AgeField extends React.Component {
    
    constructor(props) {
        super(props);
        var isValid = this.validate(props.value);
        this.state = {value: props.value, valid: isValid};
        this.onChange = this.onChange.bind(this);
    }
    validate(val){
        return val>=0;
    }
    onChange(e) {
        var val = e.target.value;
        var isValid = this.validate(val);
        this.setState({value: val, valid: isValid});
    }
    render() {
        var color = this.state.valid===true?"green":"red";
        return <p>
            <label>Age:</label><br />
            <input type="number" value={this.state.value} onChange={this.onChange} style={{borderColor:color}} />
        </p>;
    }   
}
  
class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameField = React.createRef();
        this.ageField = React.createRef();
    }
    handleSubmit(e) {
        e.preventDefault();
        var name = this.nameField.current.state.value;
        var age = this.ageField.current.state.value;
        if(this.nameField.current.state.valid && this.ageField.current.state.valid){
            alert(`Name: ${name} Age: ${age}`);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <NameField value="" ref={this.nameField} />
            <AgeField value="0" ref={this.ageField} />
            <input type="submit" value="Submit" />
        </form>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app"))
.render(
    <div>
        <Header text={header} />
        <Article content={article}/>
        <UserForm />
    </div>
);