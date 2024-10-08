import './Home.css';
import Card from "./Card.jsx"
import Official from './Official.jsx';

function Home() {
	return (
		<>
			<div className='container'>
				<div className='restaurants-window'>
					<h2>Our Restaurants</h2>
					<div className='cards-container'>
					{<Card/>}
					{<Card/>}
					{<Card/>}
					{<Card/>}
					{<Card/>}
					{<Card/>}
					</div>
				</div>
				<div className='side-menu'>
					<div className='sale'>
						<p>Automatically save <strong>2%</strong> on your bill if you reserve your Table With <strong>TableBooky</strong></p>
					</div>
					<div className='lil-container'>
						<h3 className='title'>All Locations</h3>
						<ul>
							<li>3913 NE 163rd St. North Miami Beach, FL 33160</li>
							<li>1 American Dream Way. #F225East Rutherford, NJ 07073</li>
							<li>1760 Sawgrass Mills, CircleSunrise, FL 33323-3912</li>
							<li>4250 Salzedo Street, Suite 1425Coral Gables, FL 33146</li>
							<li>344 Plaza Real, Suite 1433Boca Raton, FL 33432-3937</li>
							<li>360 San Lorenzo Avenue, Suite 1430Coral Gables, FL 33146-1865</li>
						</ul>
					</div>
					<div className='lil-container'>
						<h3 className='title'>Official Websites</h3>
						<div className='officials-container'>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home;