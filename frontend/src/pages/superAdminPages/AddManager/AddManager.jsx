import './AddManager.css'
import axios from 'axios';
import { useState , useEffect} from 'react';
import { toast } from 'react-toastify';

function AddManager(){

    const token = localStorage.getItem('token')

    //get restaurants list
    const [restaurants, setRestaurants] = useState([]);
    const [email, setEmail] = useState('');

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
	const [selectedOption, setSelectedOption] = useState("");

	function toggleDropdown() {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option.restaurantName);
		setIsOpen(false);
	};

    async function addManager(e){
        e.preventDefault();
        if (selectedOption === ''){
            toast.warning('Please enter restaurant name')
        }
        else{
            try{
                const res= await axios.post('http://localhost:3000/api/managers/',{
                    restaurantName:selectedOption,
                    email
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.status === 201){
                    toast.success('Manager Added Successfully.')
                }
            }
            catch(err){
                toast.error('Failed to Add Manager.')
            }
        }
    }

    return(
        <>
            <div className="containerr">
                <div className="another-containerr">
                    <h1>Add Manager Email</h1>
                    <form onSubmit={addManager}>
                        <div>
                            <label htmlFor='email'>Email:</label>
                        </div>
                        <input type='text' name='email' id='email' className='text' 
                        onChange={(e)=> setEmail(e.target.value)} required></input>
                        <label>Restaurant:</label>
                        <div className="dropdown">
                            <div onClick={toggleDropdown}>
                                {selectedOption || 'Restaurant'}
                            </div>
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
                        <button className='submit'type='submit'>Add Manager</button>
                    </form>

                        <div>
                        </div>
                </div>
            </div>

        </>
    )
}

export default AddManager