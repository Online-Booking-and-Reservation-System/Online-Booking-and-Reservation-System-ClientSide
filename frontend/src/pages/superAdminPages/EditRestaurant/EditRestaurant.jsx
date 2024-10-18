import './EditRestaurant.css'
import { useState } from 'react'

function EditRestaurant(){
return (
    <>
        <div className="add-restaurant">
            <label>Restaurant Name:</label>
            <input type='text' name='r-name' className='text'></input>
            <label>Restaurant Address:</label>
            <input type='text' name='r-address' className='text'></input>
            <label>Restaurant Description:</label>
            <textarea type='textarea' name='r-description' className='text'></textarea>
            <label>Select Time (Between 1 and 12):</label>
            <div className='time'>
                <input type='number' name='r-address' placeholder='Opening Time' min={1} max={12}></input>
                <p>AM</p>
                <input type='number' name='r-address' placeholder='Closing Time' min={1} max={12}></input>
                <p>PM</p>
            </div>
            <label>Number of Tables:</label>
            <input type='number' name='r-address' className='text' min={1}></input>
                <label class="size">Table Size:</label>
                <div className='size'>
                    <label>
                        <input type="radio" name="size" value="Small"/>Small
                    </label>
                    <label>
                        <input type="radio" name="size" value="Medium"/>Medium
                    </label>
                    <label>
                        <input type="radio" name="size" value="Large"/>Large
                    </label>
                </div>
            {/* <label>Featured Picture URL:</label>
            <input></input> */}
        </div>
    </>
)
}

export default EditRestaurant