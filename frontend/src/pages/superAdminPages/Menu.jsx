import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers, faPlus} from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
		<> 
			<div className="menu">
				<span>
					<Link to='/superAdmin/editAdmins'>
						<FontAwesomeIcon icon={faUsers} />
					</Link>
				</span>
				<span>
					<Link to='/superAdmin/editRestaurant'>
						<FontAwesomeIcon icon={faUtensils} />
					</Link>
				</span>
			</div>
		</>
	)
}

export default Menu;