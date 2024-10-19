import './EditRestaurant.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ChangeData from './ChangeData';

function EditRestaurant(){
    const token = localStorage.getItem('token')

    //get restaurants list
    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
		async function getRestaurants(){
			try{
				const res= await axios.get('http://localhost:3000/api/resturants/',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
				setRestaurants(res.data.data.resturants)
			}
			catch(err){}
		}
		getRestaurants();
	},[]);

    //dropdown menu
    const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
    const [toEdit, setToEdit] = useState({});

	function toggleDropdown() {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option) => {
        setToEdit(option)
		setSelectedOption(option.restaurantName);
		setIsOpen(false);
	};

return (
    <>
        <div className='container'>
            <div className="edit-restaurant">
                <h1>Edit Restaurant</h1>
                <div className="dropdown">
                    <button onClick={toggleDropdown}>
                        {selectedOption || 'Choose a Restaurant'}
                    </button>
                    {isOpen && (
                        <ul>
                            {restaurants.map((option) => (
                                <li key={option._id} onClick={() => handleOptionClick(option)}>
                                    {option.restaurantName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {selectedOption === null ? (
                    <></>) : (
                    <ChangeData toEdit={toEdit} token={token}/>)}
        </div> 
    </div>
    </>
)
}

export default EditRestaurant;