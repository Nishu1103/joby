import   { useContext, useEffect, useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import createToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "https://garb-sea-urchin.cyclic.app/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        createToast(res.data.message, "success");
        createToast("Job Posted Successfully", "success");
        
        navigateTo("/job/getall");

      })
      .catch((err) => {
          createToast(err.response.data.message, "error");
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
// import React, { useContext } from "react";
// import axios from "axios";
// import createToast from "../../utils/toast";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../../main";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const PostJob = () => {
//   const { isAuthorized, user } = useContext(Context);
//   const navigateTo = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       category: "",
//       country: "",
//       city: "",
//       location: "",
//       salaryFrom: "",
//       salaryTo: "",
//       fixedSalary: "",
//       salaryType: "default",
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required("Required"),
//       description: Yup.string().required("Required"),
//       category: Yup.string().required("Required"),
//       country: Yup.string().required("Required"),
//       city: Yup.string().required("Required"),
//       location: Yup.string().required("Required"),
//       salaryFrom: Yup.number().when("salaryType", {
//         is: (val) => val === "Ranged Salary",
//         then: Yup.number().required("Required"),
//         otherwise: Yup.number(),
//       }),
//       salaryTo: Yup.number().when("salaryType", {
//         is: (val) => val === "Ranged Salary",
//         then: Yup.number().required("Required"),
//         otherwise: Yup.number(),
//       }),
//       fixedSalary: Yup.number().when("salaryType", {
//         is: (val) => val === "Fixed Salary",
//         then: Yup.number().required("Required"),
//         otherwise: Yup.number(),
//       }),
//       salaryType: Yup.string().notOneOf(["default"], "Please provide Salary Type").required("Required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000/api/v1/job/post",
//           values,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         formik.resetForm();
//         createToast(data.message, "success");
//         createToast("Job Posted Successfully", "success");
//       } catch (error) {
//         createToast(error.response.data.message, "error");
//       }
//     },
//   });

//   if (!isAuthorized || (user && user.role !== "employer")) {
//     navigateTo("/");
//   }

//   return (
//     <>
//       <div className="job_post page">
//         <div className="container">
//           <h3>POST NEW JOB</h3>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="wrapper">
//               <input
//                 type="text"
//                 value={formik.values.title}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 name="title"
//                 placeholder="Job Title"
//               />
//               {formik.touched.title && formik.errors.title ? (
//                 <div className="error">{formik.errors.title}</div>
//               ) : null}
//               <select
//                 value={formik.values.category}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 name="category"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Graphics & Design">Graphics & Design</option>
//                 <option value="Mobile App Development">Mobile App Development</option>
//                 <option value="Frontend Web Development">Frontend Web Development</option>
//                 {/* Add more options as needed */}
//               </select>
//               {formik.touched.category && formik.errors.category ? (
//                 <div className="error">{formik.errors.category}</div>
//               ) : null}
//             </div>
//             <div className="wrapper">
//               <input
//                 type="text"
//                 value={formik.values.country}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 name="country"
//                 placeholder="Country"
//               />
//               {formik.touched.country && formik.errors.country ? (
//                 <div className="error">{formik.errors.country}</div>
//               ) : null}
//               <input
//                 type="text"
//                 value={formik.values.city}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 name="city"
//                 placeholder="City"
//               />
//               {formik.touched.city && formik.errors.city ? (
//                 <div className="error">{formik.errors.city}</div>
//               ) : null}
//             </div>
//             {/* Continue adding the remaining form fields and their respective error handling */}
//             <button type="submit">Create Job</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostJob;
