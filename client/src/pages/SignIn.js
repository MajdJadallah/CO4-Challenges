import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css';
import { useCookies } from 'react-cookie';



function SignIn() {
  return (
    <div>
      <Login />
    </div>
  );
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies(['access_token']); // Use cookies
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    email: Yup.string().required('*Email is required').email('*Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[!@#$%^&*])[A-Z][a-zA-Z!@#$%^&*]+$/,
        'Password must start with a capital letter, contain at least one special character, and no numbers'
      ),
  });

  
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:9000/login', {
        email: values.email,
        password: values.password,
      });

      if (response.data.token && response.data.adminId) {
        // Store user ID in local storage
        localStorage.setItem('userID', response.data.adminId);
        const user = localStorage.getItem('User');

        // Login successful, navigate to profile page
        navigate(`/profile/${user}`);
      } else {
        // Handle unsuccessful login here, if needed
        setErrorMessage('Username or password is incorrect.');
      }
    } catch (error) {
      // Handle other errors if needed
      setErrorMessage('An error occurred. Please try again later.');
    }

    setSubmitting(false);
  };

  return (
    <div id='formLogin'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 id='title'>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label htmlFor="password">Password: </label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting} id='submitButton'>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
