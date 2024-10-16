import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from "../features/auth/authSlice"
import '../dist/styles.css';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        "email": "",
    })

    const { email } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email
        }

        dispatch(resetPassword(userData))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/")
            toast.success("A reset password email has been sent to you.")
        }


    }, [isError, isSuccess, message
        , dispatch])

    return (
        <div className="reset-page-wrapper">
            <div className="reset-container">
                <h2 className="reset-title">Reset Password <i className='fas fa-unlock'></i></h2>
                <form className="reset-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="form-input"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            required
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="reset-button">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
