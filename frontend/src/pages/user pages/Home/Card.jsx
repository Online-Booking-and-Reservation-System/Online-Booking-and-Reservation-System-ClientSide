function Card({restaurant , onClick}){
    return(
        <>
            <div className="card" onClick={onClick}>
                <img src={restaurant.imgUrl}></img>
                <h3>{restaurant.restaurantName}</h3>
                <div>
                    <p>{restaurant.fullAddress}</p>
                </div>
                <p>{restaurant.openTime}:00 - {restaurant.closeTime}:00</p>
            </div>
        </>
    )
}

export default Card