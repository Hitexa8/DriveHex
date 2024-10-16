import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import '../dist/signuppage.css';
// import Spinner from '../Spinner'


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "password": '',
        "re_password": '',
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== re_password) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                first_name,
                last_name,
                email,
                password,
                re_password
            };
            console.log(userData);
            
            dispatch(register(userData));
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess && user) {
            navigate('/login');
            toast.success('An activation email has been sent to your email. Please check your email');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, dispatch]);

    return (
        <div className="register-page">
            <div className="register-container">
                <h1 className="register-title">Create an Account <BiUser /></h1>
                {/* {isLoading && <Spinner />} */}

                <form className="register-form">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={first_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={last_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Retype Password"
                        name="re_password"
                        value={re_password}
                        onChange={handleChange}
                        required
                    />
                    
                    <button className="register-button" type="submit" onClick={handleSubmit}>
                        Register
                    </button>
                </form>
                
                {/* Login Link */}
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
