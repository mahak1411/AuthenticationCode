import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {handleError, handleSuccess} from "../utils"
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products , setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      setLoggedInUser(user); // Update state with logged-in user
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear local storage and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
    navigate('/login'); 
    }, 1000);
  };
  const fetchProducts = async ()=>{
    try {
      const url = 'http://localhost:3030/products/getProduct';
      const response = await fetch(url, {
        method: 'GET', // Default is GET, but good to specify
        headers: {
          'authorization': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      console.log(result.data)
      setProducts(result.data);
    } catch (error) { 
      handleError(error)
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <div>
      <h1>Welcome! {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.map((items)=>(
          <ul>
            <span>{items.name}</span> &nbsp;
            <span>{items.price}</span>

          </ul>
        ))}
      </div>
  <ToastContainer/>
    </div>
  );
};

export default Home;
