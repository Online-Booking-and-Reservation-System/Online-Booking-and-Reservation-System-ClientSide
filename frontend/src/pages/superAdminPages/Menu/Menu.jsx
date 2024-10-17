import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';

function Menu() {
    return (
		<> 
			<div className="menu">
				<span>
					<Link to='/superAdmin/restaurantDetails'>
						<FontAwesomeIcon icon={faCircleInfo} />
					</Link>
				</span>
			</div>
		</>
	)
}

export default Menu;