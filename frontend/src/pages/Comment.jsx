import { useState } from "react";

const Comment = () => {
 //   const [textColor, setTextColor] = useState("black");
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    }
    const decrease = () => {
        setCount(count - 1);
    }
    const setToZero = () => {
        setCount(0);
    }
    return (
        <div >
            {/* <button
            onClick={() => {
setTextColor(textColor === "black" ? "red" : "black");
            }}
            >
               Show/Hide 
            </button>
            <h1 style={{color: textColor}}> HI MY NAME IS KENNETH</h1> */}
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={setToZero}>Set to Zero</button>
        </div>
    );
};

export default Comment;