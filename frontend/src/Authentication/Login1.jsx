import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { login, reset, getUserInfo } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import '../dist/loginpage.css'; // Assuming you'll create a separate CSS file


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

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
        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
        dispatch(getUserInfo());
    }, [isError, isSuccess, user, navigate, dispatch]);

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Login <BiLogInCircle /></h1>

                {/* {isLoading && <Spinner />} */}

                <form className="login-form">
                    <div className="form-group">
                        <input type="text"
                            className="form-input"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input type="password"
                            className="form-input"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={password}
                            required
                        />
                    </div>

                    <Link className="forgot-password" to="/reset-password">Forgot Password?</Link>

                    <button className="btn-login" type="submit" onClick={handleSubmit}>Login</button>
                </form>
            <div className="login-link">
                    <p>Don't have an account? <Link to="/register">Register Here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
