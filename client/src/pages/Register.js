import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        username: form.username,
        password: form.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('User Registered Successfully');
          history.push('/login');
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
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="email-label">Email address</Form.Label>
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
        
        <Form.Group controlId="formBasicUsername">
          <Form.Label className="username-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            value={form.username}
            name="username"
          />          
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="password-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            name="password"
          />
        </Form.Group>
        <Button className='register-btn' type="submit">
          Register
        </Button>        
      </Form>    
    </div>
  )
}
