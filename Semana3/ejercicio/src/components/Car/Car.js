import React, {useState} from 'react';
import ReactDom from 'react-dom/client';


export default function Car() {
    const [brand, setBrand] = useState("Ford");
    const [model, setModel] = useState("Mustang");
    const [color, setColor] = useState("red");
    const [year, setYear] = useState(1964);

    return (
        <div>
            <h1>My {brand}</h1>
            <p>
                It is a {color} {model} from {year}.
            </p>
            <button onClick={() => setColor("blue")}>Change color</button>
        </div>
    );
}


// class Car extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         brand: "Ford",
//         model: "Mustang",
//         color: "red",
//         year: 1964
//       };
//     }
//     changeColor = () => {
//       this.setState({color: "blue"});
//     }
//     render() {
//       return (
//         <div>
//           <h1>My {this.state.brand}</h1>
//           <p>
//             It is a {this.state.color}
//             {this.state.model}
//             from {this.state.year}.
//           </p>