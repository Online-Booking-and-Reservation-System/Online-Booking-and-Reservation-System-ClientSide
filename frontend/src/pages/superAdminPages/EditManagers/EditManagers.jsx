import './EditManagers.css'
import axios from 'axios';
import { useState , useEffect} from 'react';
import { toast } from 'react-toastify';

function EditManagers(){
    const token = localStorage.getItem('token')

    const [managers, setManagers] = useState([]);
    

    useEffect(()=>{
		async function getManagers(){
			try{
				const res= await axios.get('http://localhost:3000/api/managers/',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setManagers(res.data.data.managers)
			}
			catch(err){}
		}
		getManagers();
	},[]);

    async function deleteManager(id){
        try{
            const res= await axios.delete(`http://localhost:3000/api/managers/${id}
`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200){
                toast.success('Manager Deleted Successfully.')
            }
        }
        catch(err){
            console.error(err.message)
            toast.error('Failed to Delete Manager.')
        }
    }

    return(
        <>
            <div className="container">
                <div className="add-manager">
                    <h1>All Managers</h1>
                    <div className='list'>
                        <table>
                            <tr>
                                <th>Email</th>
                                <th>Restaurant Name</th>
                                <th>Delete Manager</th>
                            </tr>
                            {
                                managers.map((manager)=>(
                                    <tr key={manager._id}>
                                        <td>{manager.email}</td>
                                        <td>{manager.restaurantName}</td>
                                        <td><button onClick={()=> deleteManager(manager._id)}>Delete</button></td>
                                    </tr>
                                    
                                ))
                            }
                            </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditManagers