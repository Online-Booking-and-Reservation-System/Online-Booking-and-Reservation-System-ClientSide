import './Home.css';
import Card from "./Card.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
	const [restaurants, setRestaurants] = useState([])
	useEffect(()=>{
		async function getRestaurants(){
			try{
				const res= await axios.get('http://localhost:3000/api/resturants/');
				setRestaurants(res.data.data.resturants)
			}
			catch(err){}
		}
		getRestaurants();
	},[])
	return (
		<>
			<div className='container'>
				<div className='restaurants-window'>
					<h2>Our Restaurants</h2>
					<div className='cards-container'>
					{restaurants.map((restaurant)=>(
						<Card restaurant={restaurant} key={restaurant._id}/>
					))
					}
					</div>
				</div>
				<div className='side-menu'>
					<div className='sale'>
						<p>Automatically save <strong>2%</strong> on your bill if you reserve your Table With <strong>TableBooky</strong></p>
					</div>
					<div className='lil-container'>
						<h3 className='title'>All Locations</h3>
						<ul>
							{restaurants.map((r)=>(
								<li key={r._id}><FontAwesomeIcon icon={faLocationDot}/> {r.fullAddress}</li>
							))
							}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home;