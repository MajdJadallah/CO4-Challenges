import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../logo.svg'
import '../App.css';

function Auth() {
  return (
    <div>
      <Registration />
    </div>
  );
}

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('*Username is required').matches(/^[A-Za-z]+$/, 'Username must not contain numbers'),
    password: Yup.string().required('*Password is required').min(6, 'Password must be at least 6 characters').matches(/^(?=.*[!@#$%^&*])[A-Z][a-zA-Z!@#$%^&*]+$/, 'Password must start with a capital letter, contain at least one special character, and no numbers'),
    email: Yup.string().required('*Email is required').email('*Invalid email address'),
  });

  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Replace the axios post with your registration API endpoint
      await axios.post('http://localhost:9000/register', {
        username: values.username,
        password: values.password,
        email: values.email,
      });
      localStorage.setItem('User',values.username);
      // Registration successful
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      // Handle other errors if needed
      setErrorMessage('An error occurred. Please try again later.');
    }

    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 id='title'>Register</h2>
            <img src={logo} id='logo' alt='logo'/>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <Field type="text" id="username" name="username" />

              <ErrorMessage name="username" component="div" className="error" />

              <label htmlFor="email">Email: </label>
              <Field type="email" id="email" name="email" />

              <ErrorMessage name="email" component="div" className="error" />

              <label htmlFor="password">Password: </label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting} id='submitButton'>
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Auth;
