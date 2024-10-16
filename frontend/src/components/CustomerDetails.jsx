import React, { useState, useEffect } from 'react';
import '../dist/styles.css';
import axios from 'axios';

const CustomerDetails = () => {
    const [customerData, setCustomerData] = useState(null); // Renamed state variable

    // Fetch customer details when the component mounts
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await axios.post("http://127.0.0.1:8000/getcustomer/",{"email":"inglehitexa@gmail.com"},
                    {
                        headers:{'Content-Type':'application/json'}
                    }
                );
                    console.log();
                    
                setCustomerData(response.data); // Set the fetched customer data
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        };

        getCustomer();
    }, []); 
    if (!customerData) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-header">
                    <img src='https://www.svgrepo.com/show/350417/user-circle.svg' alt="Profile" className="profile-img" />
                    {/* <h1>{customerData.firstname+" "+customerData.lastname}</h1> */}
                    {console.log(customerData)}
                    <p className="designation">{customerData.firstname+" "+customerData.lastname}</p>
                </div>

                <div className="profile-info">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> {customerData.email}</p>
                    <p><strong>Phone:</strong> {customerData.customer.phone_number}</p>

                    <h2>Address</h2>
                    <p>{customerData.customer.address}</p>

                    <h2>Driving License</h2>
                    <p><strong>Number:</strong> {customerData.customer.driving_license_number}</p>
                    <p><strong>Expiry:</strong> {customerData.customer.license_expiry_date}</p>

                    <h2>City & Pincode</h2>
                    <p>{customerData.customer.city+" "+ customerData.customer.pincode}</p>

                    {/* Social Icons */}
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
