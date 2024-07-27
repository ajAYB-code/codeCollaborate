import logo from './logo.svg';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
   <>
   <Router>
        <Routes>
          <Route path="/home"
          element=
          {<ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          } />
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
    </Router>
   </>
  );
}

export default App;
