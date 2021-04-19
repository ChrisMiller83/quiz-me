import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Nav, NavLink, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Results from './pages/Results';
import { setUser } from './redux/actions';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userStatus, setUserStatus] = useState('LOADING');
  const logout = () => {
    fetch('/api/v1/users/logout')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.success);
          dispatch(setUser(null));
          history.push('/login');
        }
      });
  };

  useEffect(() => {
    fetch('/api/v1/users/current')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          dispatch(setUser(data));
        }
        setUserStatus('CHECKED');
      })
  }, [dispatch])

  return (
    <div className="App">
      <div className='navbar'>
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Link className="nav-link" to="/home">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/about">About</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/results">Results</Link>
          </Nav.Item>

          {user ? (
            <>
              <span className='username'>
                {user.username}
              </span>
              <br />
              <NavLink className="nav-link" variant="danger" onClick={logout}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-link" variant="success" to="/login">
                Login
              </NavLink>
            </>
          )}


        </Nav>
      </div>

      
      <Container className="page" style={{ margin: '2em auto' }}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/results" exact>
            <Results />
          </Route>
        </Switch>
      </Container>
      
        <br/>  
      <Footer />
    </div>
  );
}

export default App;