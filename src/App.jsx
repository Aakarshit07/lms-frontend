import './App.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import CourseDescription from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import CreateCourse from './Pages/Course/CreateCourse';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Checkout from './Pages/Payment/Checkout';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import Signup from './Pages/Signup';
import EditProfile from './Pages/User/EditProfile';
import Profile from './Pages/User/Profile';


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />

        <Route path="/course/description" element={<CourseDescription />} />


        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />} >
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Route>


        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
