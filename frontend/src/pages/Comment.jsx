// import { useState } from "react";

const Comment = () => {
 //   const [textColor, setTextColor] = useState("black");
    // const [count, setCount] = useState(0);

    // const increase = () => {
    //     setCount(count + 1);
    // }
    // const decrease = () => {
    //     setCount(count - 1);
    // }
    // const setToZero = () => {
    //     setCount(0);
    // }

  const asamb = [
    {name: 'kenneth', location: 'ghana', car: 'audi', kids: 0, hobby: 'video game'},
    {name: 'kofi', location: 'usa', car: 'rav4', kids: 2, hobby: 'golf'},
    {name: 'kwasi', location: 'ghana', car: 'camery', kids: 0, hobby: 'video game'},
    {name: 'irene', location: 'ghana', car: 'honda', kids: 2, hobby: 'movies'},
    {name: 'david', location: 'usa', car: 'tesla', kids: 3, hobby: 'traveling'},
    {name: 'slim', location: 'ghana', car: 'benz', kids: 1, hobby: 'video games'},
    {name: 'osei', location: 'ghana', car: 'bmw', kids: 0, hobby: 'video games'},
    {name: 'lindsey', location: 'usa', car: 'corolla', kids: 2, hobby: 'reading'},
];

  let words = asamb.filter((word) => word.location !== 'usa' && word.hobby !== 'video game'); 
  console.log(words);

const age = [11, 24, 9, 32, 81, 23];
const result = age.filter((num) => num > 18);

console.log(result);

// let locationUsa = [];

// for (let i = 0; i < asamb.length; i++) {
//     if (asamb[i].location === 'usa') {
//         locationUsa.push(asamb[i]);
//     }
// }

// asamb.forEach((person) => {
// if (person.location !== 'ghana') {
//     console.log(person.name);
// }
// })

// console.log(locationUsa);

// let test = ['name' , 'age' , 'country' , 'religion'];
// let List = ['Kenneth' , 'Genevieve' , 'Agnes' , 'Frank'];
// let joint = List.concat(test);
// let together = joint.join(' and ');

//     console.log(together);
//     console.log(joint);

    

    return (
        <div >
         {/*   <button
            onClick={() => {
setTextColor(textColor === "black" ? "red" : "black");
            }}
            >
               Show/Hide 
            </button>
            <h1 style={{color: textColor}}> HI MY NAME IS KENNETH</h1> 
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={setToZero}>Set to Zero</button> */}
        </div>
    );
};

export default Comment;