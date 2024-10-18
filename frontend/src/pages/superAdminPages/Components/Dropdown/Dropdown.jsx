import './Dropdown.css'
import { useState } from 'react';

function Dropdown() {

	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);

	const options = ['Option 1', 'Option 2', 'Option 3'];

	function toggleDropdown() {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	return (
		<div className="dropdown">
			<button onClick={toggleDropdown}>
				{selectedOption || 'Select an option'}
			</button>
			{isOpen && (
				<ul>
					{options.map((option) => (
						<li key={option} onClick={() => handleOptionClick(option)}>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;