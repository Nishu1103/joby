// import { useContext, useState } from "react";
// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";
// import { FaPencilAlt } from "react-icons/fa";
// import { FaPhoneFlip } from "react-icons/fa6";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// // import toast from "react-hot-toast";
// import createToast from "../../utils/toast";
// import { Context } from "../../main";

// const Register = () => {
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("");

//     const { isAuthorized, setIsAuthorized } =
//         useContext(Context);

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post(
//                 "http://localhost:4000/api/v1/user/register",
//                 { name, phone, email, role, password },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     withCredentials: true,
//                 }
//             );
//             createToast(data.message,"success");
//             setName("");
//             setEmail("");
//             setPassword("");
//             setPhone("");
//             setRole("");
//             setIsAuthorized(true);
//         } catch (error) {
//             // createToast.error(error.response.data.message);
            
//             createToast(error.response.data.message, "error")
//         }
//     };

//     if (isAuthorized) {
//         return <Navigate to={"/"} />;
//     }

//     return (
//         <>
//             <section className="authPage">
//                 <div className="container">
//                     <div className="header">
//                         <img src="/JobZeelogo.png" alt="logo" />
//                         <h3>Create a new account</h3>
//                     </div>
//                     <form>
//                         <div className="inputTag">
//                             <label>Register As</label>
//                             <div>
//                                 <select
//                                     value={role}
//                                     onChange={(e) => setRole(e.target.value)}
//                                 >
//                                     <option value="">Select Role</option>
//                                     <option value="employer">employer</option>
//                                     <option value="jobseeker">jobseeker</option>
//                                 </select>
//                                 <FaRegUser />
//                             </div>
//                         </div>
//                         <div className="inputTag">
//                             <label>Name</label>
//                             <div>
//                                 <input
//                                     type="text"
//                                     placeholder="Nishant"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                                 <FaPencilAlt />
//                             </div>
//                         </div>
//                         <div className="inputTag">
//                             <label>Email Address</label>
//                             <div>
//                                 <input
//                                     type="email"
//                                     placeholder="xyz@gmail.com"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                                 <MdOutlineMailOutline />
//                             </div>
//                         </div>
//                         <div className="inputTag">
//                             <label>Phone Number</label>
//                             <div>
//                                 <input
//                                     type="number"
//                                     placeholder="12345678"
//                                     value={phone}
//                                     onChange={(e) => setPhone(e.target.value)}
//                                 />
//                                 <FaPhoneFlip />
//                             </div>
//                         </div>
//                         <div className="inputTag">
//                             <label>Password</label>
//                             <div>
//                                 <input
//                                     type="password"
//                                     placeholder="Your Password"
//                                     value={password}
//                                     onChange={(e) =>
//                                         setPassword(e.target.value)
//                                     }
//                                 />
//                                 <RiLock2Fill />
//                             </div>
//                         </div>
//                         <button type="submit" onClick={handleRegister}>
//                             Register
//                         </button>
//                         <Link to={"/login"}>Login Now</Link>
//                     </form>
//                 </div>
//                 <div className="banner">
//                     <img src="./images/register.png" alt="login" />
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Register;

import  { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import createToast from "../../utils/toast";
import { Context } from "../../main";
import "./Register.css";

const Register = () => {
    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            role: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            name: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
            phone: Yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Required"),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
            role: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    "https://garb-sea-urchin.cyclic.app/api/v1/user/register",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                createToast(data.message, "success");
                formik.resetForm();
                setIsAuthorized(true);
            } catch (error) {
                createToast(error.response.data.message, "error");
            }
        },
    });

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="/JobZeelogo.png" alt="logo" />
                        <h3>Create a new account</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="inputTag">
                            <label>Register As</label>
                            <div>
                                <select
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="role"
                                >
                                    <option value="">Select Role</option>
                                    <option value="employer">employer</option>
                                    <option value="jobseeker">jobseeker</option>
                                </select>
                                <FaRegUser />
                            </div>
                            {formik.touched.role && formik.errors.role ? (
                                <div className="error">{formik.errors.role}</div>
                            ) : null}
                        </div>
                        <div className="inputTag">
                            <label>Name</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nishant"
                                    {...formik.getFieldProps("name")}
                                />
                                <FaPencilAlt />
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="xyz@gmail.com"
                                    {...formik.getFieldProps("email")}
                                />
                                <MdOutlineMailOutline />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="inputTag">
                            <label>Phone Number</label>
                            <div>
                                <input
                                    type="number"
                                    placeholder="12345678"
                                    {...formik.getFieldProps("phone")}
                                />
                                <FaPhoneFlip />
                            </div>
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="error">{formik.errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    {...formik.getFieldProps("password")}
                                />
                                <RiLock2Fill />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button type="submit">Register</button>
                        <Link to={"/login"}>Login Now</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="./images/register.png" alt="login" />
                </div>
            </section>
        </>
    );
};

export default Register;

