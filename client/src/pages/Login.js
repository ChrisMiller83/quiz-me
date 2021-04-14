import { useState } from 'react'
import { Button, Form, } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setUser } from '../redux/actions';

export default function Login() {
  const [form, setForm] = useState({
    email: '',    
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,        
        password: form.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('User Login Successful');
          dispatch(setUser(data));
          history.push('/home');
        }
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className='email-label'>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            onChange={handleChange}
            value={form.email}
            name="email"
          />
          <Form.Text className="text-white">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className='password-label'>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            name="password"
          />
        </Form.Group>        
        <Button className="login-btn" type="submit">
          Login
        </Button>
        <Button className="register-btn" type='submit'>
        <Link className="register" to="/register" variant="secondary">Register</Link>
        </Button>
      </Form>
    </div>
  )
}
