import './AddRestaurant.css'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';

function AddRestaurant(){
    const token = localStorage.getItem('token')

    const [restaurantName, setRestaurantName] = useState('')
    const [fullAddress, setFullAddress] = useState('')
    const [description, setDescription] = useState('')
    const [openTime, setOpenTime] = useState()
    const [closeTime, setCloseTime] = useState()
    const [numberOfTables, setNumberOfTables] = useState()
    const [sizeTable, setSizeTable] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    function optionChange(e){
        setSizeTable(e.target.value)
    }

    function editPicPath(e){
        let str = e.target.value
        str = str.slice(12)
        const newStr = 'uploads/' + str
        setImgUrl(newStr)
    }
    
    async function createRestaurant(e){
        e.preventDefault();
        try{
            const res= await axios.post('http://localhost:3000/api/resturants/',{
                restaurantName,
                fullAddress,
                description,
                openTime,
                closeTime,
                numberOfTables,
                sizeTable,
                imgUrl
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 201){
                toast.success('Restaurant Added Successfully.')
            }
        }
        catch(err){
            toast.error('Failed to Add Restaurant.')
        }
    }

return (
    <>
    <div className='container'>
        <form className="add-restaurant" >
            <h1>Add Restaurant</h1>
            <label htmlFor='restaurantName'>Restaurant Name:</label>
            <input type='text' name='restaurantName' id='restaurantName' className='text' 
            onChange={(e)=> setRestaurantName(e.target.value)} required></input>

            <label htmlFor='fullAddress'>Restaurant Address:</label>
            <input type='text' name='fullAddress' id='fullAddress' className='text'
            onChange={(e)=> setFullAddress(e.target.value)} required></input>

            <label htmlFor='description'>Restaurant Description:</label>
            <textarea name='description' id='description' className='text'
            onChange={(e)=> setDescription(e.target.value)} required></textarea>

            <label>Select Time (Between 1 and 12):</label>
            <div className='time'>
                <div>
                <input type='number' name='openTime' id='openTime' placeholder='Opening Time' min={1} max={12}
                onChange={(e)=> setOpenTime(e.target.value)} required></input>
                <p>AM</p>
                </div>
                <div>
                <input type='number' name='closeTime' id='closeTime' placeholder='Closing Time' min={1} max={12}
                onChange={(e)=> setCloseTime(e.target.value)} required></input>
                <p>PM</p>
                </div>
            </div>

            <label>Number of Tables:</label>
            <input type='number' name='numberOfTables' id='numberOfTables'className='text' min={1}
            onChange={(e)=> setNumberOfTables(e.target.value)} required></input>

            <label htmlFor="sizeTable">Table Size:</label>
            <div className='size'>
                <label>
                    <input type="radio" name="sizeTable" value="Small" onChange={optionChange} required/>Small
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
            onChange={editPicPath} required></input>
            <button className='submit' onClick={createRestaurant}>Add Restaurant</button>
        </form>
    </div>
    </>
)
}

export default AddRestaurant