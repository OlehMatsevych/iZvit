import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { reportsAPI } from './api/api';
import './App.css';
import { Home } from './components/Dashboard/Home';
import { Login } from './components/Login/Login';
import { MainHeader } from './components/Dashboard/Header';
import Modal from './components/Modal/Modal';
import { ProtectedLogin } from './components/protectedRoute/protectedLogin';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute';
import Register from './components/Register/Register';

function App() {
  const [auth, setAuth] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportById, setReportById] = useState();
  const [modalActive, setModalActive] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie()
    reportsAPI.getReports().then((response) => setReports(response.data))
  }, [])

  return (
    <div className="App">
      <MainHeader setAuth={setAuth} />
      <div className='Dashboard'>
        <Routes>
          <Route path='/' element={
            <ProtectedLogin auth={auth}>
              <Login setAuth={setAuth} />
            </ProtectedLogin>
          } />
          <Route path='/register' element={
            <ProtectedLogin auth={auth}>
              <Register />
            </ProtectedLogin>
          } />
          <Route path='/home' element={
            <ProtectedRoute auth={auth}>
              <Home reportById={reportById} setReportById={setReportById} setModalActive={setModalActive} reports={reports} setAuth={setAuth} />
            </ProtectedRoute>
          } />
        </Routes>
        <Modal active={modalActive} setActive={setModalActive}>
          <div className='modal-container'>
            <h1>{reportById?.title}</h1>
            <p>{reportById?.description}</p>
            <div className='modal-date'>
              <div>Created By: {reportById?.createdBy}</div>
              <div>{reportById?.createDate.split('T')[0]}</div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
