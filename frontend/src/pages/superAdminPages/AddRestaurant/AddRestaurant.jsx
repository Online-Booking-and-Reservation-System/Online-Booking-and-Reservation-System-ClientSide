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
        const str = (e.target.files[0].name)
        setImgUrl('uploads/' + str)
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
    <div className='containerr'>
        <div className="another-containerr" >
            <h1>Add Restaurant</h1>
            <form className='add-restaurant'>
                <div className='sectioning'>
                    <label htmlFor='restaurantName'>Restaurant Name:</label>
                    <input type='text' name='restaurantName' id='restaurantName' className='text' 
                    onChange={(e)=> setRestaurantName(e.target.value)} required></input>
                </div>

                <div className='sectioning'>
                    <label htmlFor='fullAddress'>Restaurant Address:</label>
                    <input type='text' name='fullAddress' id='fullAddress' className='text'
                    onChange={(e)=> setFullAddress(e.target.value)} required></input>
                </div>

                <div className='sectioning'>
                    <label htmlFor='description'>Restaurant Description:</label>
                    <textarea name='description' id='description' className='text'
                    onChange={(e)=> setDescription(e.target.value)} required></textarea>
                </div>

                <div className='sectioning'>
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
                </div>

                <div className='sectioning'>
                    <label>Number of Tables:</label>
                    <input type='number' name='numberOfTables' id='numberOfTables' min={1}
                    onChange={(e)=> setNumberOfTables(e.target.value)} required></input>
                </div>

                <div className='sectioning'>
                    <label htmlFor="sizeTable">Table Size:</label>
                    <div className='size'>
                        <label>
                            <input type="radio" name="sizeTable" value="Small" onChange={optionChange} required/> Small
                        </label>
                        <label>
                            <input type="radio" name="sizeTable" value="Medium" onChange={optionChange}/> Medium
                        </label>
                        <label>
                            <input type="radio" name="sizeTable" value="Large" onChange={optionChange}/> Large
                        </label>
                    </div>
                </div>

                <div className='sectioning'>
                    <label htmlFor='imgUrl'>Featured Image URL:</label>
                    <input type='file' name='imgUrl' id='imgUrl' 
                    onChange={editPicPath} required></input>
                </div>
                <button className='submit' onClick={createRestaurant}>Add Restaurant</button>
            </form>
        </div>
    </div>
    </>
)
}

export default AddRestaurant