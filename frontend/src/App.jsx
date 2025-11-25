import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from './redux/api/userApi'
import Error from './pages/errors/Error'
import Spinner from './components/loaders/Spinner';
import ProfileStudent from './pages/student/ProfileStudent';
import ProfileTPO from './pages/tpo/ProfileTPO';
import TPODashboard from './pages/tpo/TPODashboard';
import TPOLayout from './pages/layouts/TPOLayout';
import CreateDrive from './pages/tpo/CreateDrive';
import DriveList from './pages/tpo/DriveList';
import DriveDetails from './pages/tpo/DriveDetails';
import EditDrive from './pages/tpo/EditDrive';
import DriveAttendance from './pages/tpo/DriveAttendance';
import StudentLayout from './pages/layouts/StudentLayout';
import DriveRegister from './pages/student/DriveRegister';
import Drives from './pages/student/Drives';
import SingleDrive from './pages/student/SingleDrive';
import PrivateRoute from './components/PrivateRoute';
import { getRoute } from './utils/getRoute';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));

const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.user.auth);
  const role = useSelector(state => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile());
    if (auth) {
      navigate(getRoute(role), { replace: true });
    }
  }, [auth]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} ></Route>

        <Route path='/student' element={<PrivateRoute><ProtectedRoute role={['student']}><StudentLayout /></ProtectedRoute></PrivateRoute>} >
          <Route path='profile' index element={<PrivateRoute><ProtectedRoute role={['student']}><ProfileStudent /></ProtectedRoute></PrivateRoute>} />
          <Route path='drives' element={<PrivateRoute><ProtectedRoute role={['student']}><Drives /></ProtectedRoute></PrivateRoute>} />
          <Route path="drives/:id" element={<PrivateRoute><ProtectedRoute role={['student']}><SingleDrive /></ProtectedRoute></PrivateRoute>} />
          <Route path='drive/register/:drive_id' element={<PrivateRoute><ProtectedRoute role={['student']}><DriveRegister /></ProtectedRoute></PrivateRoute>} />
        </Route>

        <Route path='/tpo' element={<PrivateRoute><ProtectedRoute role={['tpo']}><TPOLayout /></ProtectedRoute></PrivateRoute>}>
          <Route index element={<PrivateRoute><ProtectedRoute role={['tpo']}><TPODashboard /></ProtectedRoute></PrivateRoute>} />
          <Route path='profile' element={<PrivateRoute><ProtectedRoute role={['tpo']}><ProfileTPO /></ProtectedRoute></PrivateRoute>} />
          <Route path="drives" element={<PrivateRoute><ProtectedRoute role={['tpo']}><DriveList /></ProtectedRoute></PrivateRoute>} />
          <Route path="drives/create" element={<PrivateRoute><ProtectedRoute role={['tpo']}><CreateDrive /></ProtectedRoute></PrivateRoute>} />
          <Route path="drives/:id" element={<PrivateRoute><ProtectedRoute role={['tpo']}><DriveDetails /></ProtectedRoute></PrivateRoute>} />
          <Route path="drives/:id/edit" element={<PrivateRoute><ProtectedRoute role={['tpo']}><EditDrive /></ProtectedRoute></PrivateRoute>} />
          <Route path="drives/:drive_id/attendance" element={<PrivateRoute><ProtectedRoute role={['tpo']}><DriveAttendance /></ProtectedRoute></PrivateRoute>} />
        </Route>

        <Route path='/login' element={<Suspense fallback={<div className='flex h-96 justify-center items-center'><Spinner /></div>}><Login /></Suspense>} />
        <Route path='/signup' element={<Suspense fallback={<div className='flex h-96 justify-center items-center'><Spinner /></div>}><Signup /></Suspense>} />

        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App