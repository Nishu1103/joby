import { useEffect, useContext } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import MyJobs from "./components/Job/MyJobs";
import Postjob from "./components/Job/PostJob";
import Application from "./components/application/Application";
import Myapplication from "./components/application/Myapplication";
import NotFound from "./components/NotFound/NotFound";
// import Toaster from "react-hot-toast";
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import axios from "axios";

export default function App() {
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "https://garb-sea-urchin.cyclic.app/api/v1/user/getuser ",
                    {
                        withCredentials: true,
                    }
                );
                setUser(res.data.user);
                setIsAuthorized(true);
            } catch (error) {
                console.log(error);
                setIsAuthorized(false);
            }
        };
        fetchUser();
    }, [isAuthorized]);

    return (
        <> 
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/job/getall" element={<Jobs />} />
                    <Route path="/job/:id" element={<JobDetails />} />
                    <Route path="/job/me" element={<MyJobs />} />
                    <Route path="/job/post" element={<Postjob />} />
                    <Route path="/application/:id" element={<Application />} />
                    <Route
                        path="/applications/me"
                        element={<Myapplication />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                {/* <Toaster />     */}
                <ToastContainer />
            </BrowserRouter>
        </>
    );
}
