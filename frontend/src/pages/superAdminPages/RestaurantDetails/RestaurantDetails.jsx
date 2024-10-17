import './RestaurantDetails.css'
function RestaurantDetails(){
return (
    <>
    <div className="restaurant-details">
        <div className="header">
            <div className="dropdown"></div>
            <button>Submit</button>
        </div>
        <div className='editting'>
            <label htmlFor='r-name'>Restaurant Name:</label>
            <input type='text' name='r-name'></input>
            <label htmlFor='r-address'>Restaurant Address:</label>
            <input type='text' name='r-address'></input>
            <label htmlFor='r-description'>Restaurant Description:</label>
            <input type='text' name='r-description'></input>
        </div>
    </div>
    </>
)
}

export default RestaurantDetails