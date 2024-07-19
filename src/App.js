import logo from './logo.svg';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import Login  from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
   <>
   <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
    </Router>
   </>
  );
}

export default App;
