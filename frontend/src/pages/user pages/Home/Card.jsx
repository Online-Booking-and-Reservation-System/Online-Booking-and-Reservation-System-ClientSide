function Card({restaurant}){
    return(
        <>
            <div className="card">
                <img src={restaurant.imgUrl}></img>
                <h4>{restaurant.restaurantName}</h4>
                <div>
                    <p>{restaurant.fullAddress}</p>
                </div>
                <p>{restaurant.openTime}:00 - {restaurant.closeTime}:00</p>
            </div>
        </>
    )
}

export default Card