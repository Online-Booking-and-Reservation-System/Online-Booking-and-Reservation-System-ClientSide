import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Home from './pages/user pages/Home/Home';
import Admin from './pages/admin pages/Admin';
import Reservation from './pages/user pages/Reservation/Reservation';
import SuperAdmin from './pages/superAdminPages/SuperAdmin';
import Contact from './components/shared components/Contact Us/Contact';
import RTable from './pages/admin pages/RTable/RTable';
import RList from './pages/admin pages/RList/RList';  
import Profile from './pages/admin pages/Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Context/AuthProvider';
import './App.css';
import Footer from './components/shared components/Footer/Footer';
import RestaurantDetails from './pages/superAdminPages/RestaurantDetails/RestaurantDetails';

function App() {
    return (
        <>
        {/* <AuthProvider> */}
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar />}>
                            <Route index element={<Home />} />
                            <Route path='/signup' element={<Signup trigger={false} />} />
                            <Route path='/signin' element={<Signin />} />
                            <Route path='/admin/*' element={<Admin />}>
                                <Route path='reservationsTable' element={<RTable />} />
                                <Route path='reservationsList' element={<RList />} />
                                <Route path='profile' element={<Profile />} />
                            </Route>
                            <Route path='/contactUs' element={<Contact />} />
                            <Route path='/reservation' element={<Reservation />} />
                            <Route path='/superAdmin/*' element={<SuperAdmin />}>
                                <Route path='restaurantDetails' element={<RestaurantDetails/>}/>
                            </Route>
                    </Route>
                </Routes>
                <ToastContainer />
                <Footer/>
            </BrowserRouter>
        {/* </AuthProvider> */}
        </>
    );
}

export default App;
