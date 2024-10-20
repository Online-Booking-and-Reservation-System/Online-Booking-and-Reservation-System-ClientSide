import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faPlus, faPenToSquare, faUserPlus, faUserMinus} from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
		<> 
			<div className="menu">
				<span>
					<Link to='/superAdmin/addManager'>
						<FontAwesomeIcon icon={faUserPlus} />
					</Link>
				</span>
				<span>
					<Link to='/superAdmin/editManagers'>
						<FontAwesomeIcon icon={faUserMinus} />
					</Link>
				</span>
				<span>
					<Link to='/superAdmin/addRestaurant'>
						<FontAwesomeIcon icon={faUtensils} /> <FontAwesomeIcon icon={faPlus} className='plus'/> 
					</Link>
				</span>
				<span>
					<Link to='/superAdmin/editRestaurant'>
						<FontAwesomeIcon icon={faUtensils} /> <FontAwesomeIcon icon={faPenToSquare} className='plus'/>
					</Link>
				</span>
			</div>
		</>
	)
}

export default Menu;