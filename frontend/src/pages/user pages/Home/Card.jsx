function Card({restaurant , onClick}){
    return(
        <>
            <div className="card" onClick={onClick}>
            {restaurant.imgUrl && (
                            <img src={restaurant.imgUrl} alt={restaurant.restaurantName} />
                        )}
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