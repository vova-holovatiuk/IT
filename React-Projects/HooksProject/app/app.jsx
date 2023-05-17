import React, {useState} from "react";

function ClickButtonHook(props){
    const [count, setCount] = React.useState(0);
    const press = function(){
        setCount(count + props.increment);
    };
    return (<div>
            <button onClick={press}>Count</button>
            <div>Counter: {count}<br /> Increment: {props.increment}</div>
        </div>);
}

const ReactDOM = require("react-dom/client");
// const React = require("react");
const Header = require("./components/header.jsx");
const Body = require("./components/body.jsx");

  
const header = "Хуки";
const article = "проект с затрагиванием темы хуков";


function Counter(){
    const [count, setCount] = React.useState(0)
    return(
        <div>
            <h3>Count = {count}</h3>
            <button onClick={()=> setCount(count + 1)}>Zoom in</button>
        </div>
    )
}

function UserData(){
    const [user, setUser] = React.useState({name: "Vova", age: 22})

    function handleNameChange(event){
        setUser({name: event.target.value, age: user.age})
    }
    function handleAgeChange(event){
        setUser({name: user.name, age:target.value})
    }
    return(
        <div>
            <h3>Name: {user.name}</h3>
            <h3>Age: {user.age}</h3>

            <div>
            <p>Имя: <input type="text" value={user.name} onChange={handleNameChange} /></p>
            <p>Возраст: <input type="number" min="0" max="110" value={user.age} onChange={handleAgeChange} /></p>
            </div>
        </div>
    )
}



function User(){
    const [name, setName] = React.useState("Vova")
    const [age, setAge] = React.useState(22)

    // const unmount = () =>  root.unmount();
    React.useEffect(() => {
        document.title = `Hello ${name}`
        console.log("useEffect")
    }, [name])
    const changeName = (event) => setName(event.target.value);
    const changeAge = (event) => setAge(event.target.value);

    return(
        <div>
            <h3>Name: {name}</h3>
            <h3>Age: {age}</h3>
            <div>
                <p>Name: <input type="text" value={name} onChange={changeName} /></p>
                <p>Age: <input type="number" value={age} onChange={changeAge} /></p>
            </div>
        </div>
    )
}


function User1() {
  const [name, setName] = React.useState("Tom");
   
  const unmount = () =>  root.unmount();
React.useEffect(() => {    
   
    const unmountBtn = document.getElementById("unmountBtn");
     
     // подписываемся на событие onclick кнопки unmountBtn
     unmountBtn.addEventListener("click", unmount);
     console.log("EventListener added");
      
    return()=>{
         // отписываемся от события
        unmountBtn.removeEventListener("click", unmount);
        console.log("EventListener removed");
    }
  },
  []); // эффект срабатывает только один раз - при самом первом рендеринге
   
  return (<div>
    <h3>Имя: {name}</h3>
    <p>Имя: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
    </div>);
}

function UserForm(){
    const nameField = React.useRef(null)
    const send = () => {
        const inputElement = nameField.current
        console.log("Name: " + inputElement.value)
    }
    return(
        <div>
            <input type="text" ref={nameField} />
            <button onClick={send}>Send</button>
        </div>
    )
}



ReactDOM.createRoot(document.getElementById("app"))
.render(
    
    <div>
        <Header text={header} />
        <Body content={article} />
        <h2>Хук useState</h2>
        <ClickButtonHook increment={2} />
        <Counter />
        <UserData />
        <h2>Хук useEffect</h2>
        <User />
        {/* <User1 /> */}
        <h2>Хук useRef</h2>
        <UserForm />
    </div>
);