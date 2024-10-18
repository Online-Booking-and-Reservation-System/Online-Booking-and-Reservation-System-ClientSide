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
                {/* <div className="times">
                    <div>{restaurant.openTime}:00</div>
                    <div>{restaurant.openTime + 1}:00</div>
                    <div>{restaurant.openTime + 2}</div>
                </div> */}
            </div>
        </>
    )
}

export default Card