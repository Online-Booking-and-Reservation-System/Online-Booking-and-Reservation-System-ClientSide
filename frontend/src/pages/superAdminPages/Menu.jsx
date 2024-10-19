import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers, faPlus, faPenToSquare, faUserPen} from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
		<> 
			<div className="menu">
				<span>
					<Link to='/superAdmin/editAdmins'>
						<FontAwesomeIcon icon={faUserPen} />
					</Link>
				</span>
				<span>
					<Link to='/superAdmin/addRestaurant'>
						<FontAwesomeIcon icon={faPlus} className='plus'/> <FontAwesomeIcon icon={faUtensils} />
					</Link>
				</span>
				<span>
					<Link to='/superAdmin/editRestaurant'>
						<FontAwesomeIcon icon={faPenToSquare} className='plus'/> <FontAwesomeIcon icon={faUtensils} />
					</Link>
				</span>
			</div>
		</>
	)
}

export default Menu;