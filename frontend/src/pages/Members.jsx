import React from 'react';
import '../css/dashboard.css';
import { Link } from 'react-router-dom';

const data = [
    { name: "Anom", contact: "2335428374537", age: 19, gender: "Male", image: "https://via.placeholder.com/50" },
    { name: "Megha", contact: "2335428374537", age: 19, gender: "Female", image: "https://via.placeholder.com/50" },
    { name: "Subham", contact: "2335428374537", age: 25, gender: "Male", image: "https://via.placeholder.com/50" },
]

const Members = () => {
    return (
        <div className="App">
            <div className='page-header-container'>
            <div>
            <h1 className='page-heading'>Members</h1>
            <h3 className='page-subheading'>Showing all members.</h3>
            </div>
            <Link to="/addmembers" className='add-member'>Add Members</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.contact}</td>
                                <td>{val.age}</td>
                                <td>{val.gender}</td>
                                <td><img src={val.image} alt={val.name} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Members;