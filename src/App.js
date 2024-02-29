import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signin from './pages/Signin';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          {/* <Route path="/create-join-room" to={<Signin />}></Route> */}
          {/* <Route path="/editor/:roomId" element={<EditorPage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
