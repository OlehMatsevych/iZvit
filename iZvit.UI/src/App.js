import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { reportsAPI } from './api/api';
import './App.css';
import { ReportingSystem } from './Pages/ReportingSystem';
import { Login } from './components/Login/Login';
import { MainHeader } from './components/Dashboard/Header';
import Modal from './components/Modal/Modal';
import { ProtectedLogin } from './components/protectedRoute/protectedLogin';
import { ProtectedRoute } from './components/protectedRoute/protectedRoute';
import Register from './components/Register/Register';
import { Home } from './Pages/Home';
import { Page1 } from './Pages/Page1';
import { Page2 } from './Pages/Page2';
import { Page4 } from './Pages/Page4';
import { Page5 } from './Pages/Page5';
import { Page6 } from './Pages/Page6';
import { Page7 } from './Pages/Page7';
import { Page8 } from './Pages/Page8';
import { Page9 } from './Pages/Page9';
import { Page10 } from './Pages/Page10';

function App() {
  const [auth, setAuth] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportById, setReportById] = useState();
  const [modalActive, setModalActive] = useState(false);
  const location = useLocation();
  const [path] = useState(location.pathname);

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
            <ProtectedLogin pathname={path} auth={auth}>
              <Login setAuth={setAuth} />
            </ProtectedLogin>
          } />
          <Route path='/register' element={
            <ProtectedLogin pathname={path} auth={auth}>
              <Register />
            </ProtectedLogin>
          } />
          <Route path='/reportingsystem' element={
            <ProtectedRoute auth={auth}>
              <ReportingSystem reportById={reportById} setReportById={setReportById} setModalActive={setModalActive} reports={reports} setAuth={setAuth} />
            </ProtectedRoute>
          } />
          <Route path='/home' element={
            <ProtectedRoute auth={auth}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/page1' element={
            <ProtectedRoute auth={auth}>
              <Page1 />
            </ProtectedRoute>
          } />
          <Route path='/page2' element={
            <ProtectedRoute auth={auth}>
              <Page2 />
            </ProtectedRoute>
          } />
          <Route path='/page4' element={
            <ProtectedRoute auth={auth}>
              <Page4 />
            </ProtectedRoute>
          } />
          <Route path='/page5' element={
            <ProtectedRoute auth={auth}>
              <Page5 />
            </ProtectedRoute>
          } />
          <Route path='/page6' element={
            <ProtectedRoute auth={auth}>
              <Page6 />
            </ProtectedRoute>
          } />
          <Route path='/page7' element={
            <ProtectedRoute auth={auth}>
              <Page7 />
            </ProtectedRoute>
          } />
          <Route path='/page8' element={
            <ProtectedRoute auth={auth}>
              <Page8 />
            </ProtectedRoute>
          } />
          <Route path='/page9' element={
            <ProtectedRoute auth={auth}>
              <Page9 />
            </ProtectedRoute>
          } />
          <Route path='/page10' element={
            <ProtectedRoute auth={auth}>
              <Page10 />
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
