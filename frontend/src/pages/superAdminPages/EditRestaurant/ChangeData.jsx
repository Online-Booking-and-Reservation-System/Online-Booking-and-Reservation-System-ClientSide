import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ChangeData(toEdit){
    const token = localStorage.getItem('token')

    const [restaurant, setRestaurant] = useState({})
    const [restaurantName, setRestaurantName] = useState('')
    const [fullAddress, setFullAddress] = useState('')
    const [description, setDescription] = useState('')
    const [openTime, setOpenTime] = useState(0)
    const [closeTime, setCloseTime] = useState(0)
    const [numberOfTables, setNumberOfTables] = useState()
    const [sizeTable, setSizeTable] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [id, setId] = useState(null)

    useEffect(()=>{
        if (toEdit){
            setRestaurant(toEdit.toEdit)
        }
    },[toEdit])
    
    useEffect(()=>{
        if (restaurant){
            setRestaurantName(restaurant.restaurantName)
            setFullAddress(restaurant.fullAddress)
            setDescription(restaurant.description)
            setOpenTime(restaurant.openTime)
            setCloseTime(restaurant.closeTime)
            setNumberOfTables(restaurant.numberOfTables)
            setSizeTable(restaurant.sizeTable)
            setImgUrl(restaurant.imgUrl)
            setId(restaurant._id)
        }
    },[restaurant])

    function optionChange(e){
        setSizeTable(e.target.value)
    }

    function editPicPath(e){
        let str = e.target.value
        str = str.slice(12)
        const newStr = 'uploads/' + str
        setImgUrl(newStr)
    }

    async function updateRestaurant(e){
        e.preventDefault();
        try{
            const res= await axios.patch(`http://localhost:3000/api/resturants/${id}`,{
                restaurantName,
                fullAddress,
                description,
                openTime,
                closeTime,
                numberOfTables,
                sizeTable,
                imgUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200){
                toast.success('Restaurant Updated Successfully.')
            }
        }
        catch(err){
            toast.error('Failed to Update Restaurant.')
        }
    }

    async function deleteRestaurant(e){
        e.preventDefault();
        try{
            const res= await axios.delete(`http://localhost:3000/api/resturants/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200){
                toast.success('Restaurant Deleted Successfully.')
            }
        }
        catch(err){
            console.error(err.message)
            toast.error('Failed to Delete Restaurant.')
        }
    }

    return(
        <>
            <form className='form' onSubmit={updateRestaurant}>
                <label htmlFor='restaurantName'>Restaurant Name:</label>
                <input type='text' name='restaurantName' id='restaurantName' className='text' value={restaurantName || ''}
                onChange={(e)=> setRestaurantName(e.target.value)} required></input>

                <label htmlFor='fullAddress'>Restaurant Address:</label>
                <input type='text' name='fullAddress' id='fullAddress' className='text' value={fullAddress || ''}
                onChange={(e)=> setFullAddress(e.target.value)} required></input>

                <label htmlFor='description'>Restaurant Description:</label>
                <textarea name='description' id='description' className='text' value={description || ''}
                onChange={(e)=> setDescription(e.target.value)} required></textarea>

                <label>Select Time (Between 1 and 12):</label>
                <div className='time'>
                    <div>
                    <input type='number' name='openTime' id='openTime' placeholder='Opening Time' min={1} max={12} value={openTime || ''}
                    onChange={(e)=> setOpenTime(e.target.value)} required></input>
                    <p>AM</p>
                    </div>
                    <div>
                    <input type='number' name='closeTime' id='closeTime' placeholder='Closing Time' min={1} max={12} value={closeTime || ''}
                    onChange={(e)=> setCloseTime(e.target.value)} required></input>
                    <p>PM</p>
                    </div>
                </div>

                <label>Number of Tables:</label>
                <input type='number' name='numberOfTables' id='numberOfTables'className='text' min={1} value={numberOfTables || ''}
                onChange={(e)=> setNumberOfTables(e.target.value)} required></input>

                <label htmlFor="sizeTable">Table Size:</label>
                <div className='size'>
                    <label>
                        <input type="radio" name="sizeTable" value="Small" onChange={optionChange}/>Small
                    </label>
                    <label>
                        <input type="radio" name="sizeTable" value="Medium" onChange={optionChange}/>Medium
                    </label>
                    <label>
                        <input type="radio" name="sizeTable" value="Large" onChange={optionChange}/>Large
                    </label>
                </div>
                <label htmlFor='imgUrl'>Featured Image URL:</label>
                <input type='file' name='imgUrl' id='imgUrl' className='text'
                onChange={editPicPath}></input>
                <div className='btns'>
                    <button type='submit' className='submit'>Save Changes</button>
                    <button className='delete' onClick={deleteRestaurant}>Delete Restaurant</button>
                </div>
            </form>
        </>
    )
}

export default ChangeData;