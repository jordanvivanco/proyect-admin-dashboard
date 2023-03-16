import { Component, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './guards/auth.guard';
import { PrivateRoutes, PublicRoutes } from './models/routes';
import { Admin } from './pages/private/Admin';
import { Dashboard } from './pages/private/Dashboard';
import { Home } from './pages/private/Home';
import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import "./App.css";
import { UserProvider } from './context/UserProvider';

export default class App extends Component {
  render() {
    return (
      <div>
        <UserProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
                <Route path="*" element={<>Not Found</>} />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route path={PublicRoutes.LANDING} element={<Landing />} />
                <Route element={<AuthGuard />}>
                  <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Admin />} />
                  <Route path={`${PrivateRoutes.HOME}/*`} element={<Home />} />
                  <Route path={`${PrivateRoutes.ADMIN}/*`} element={<Admin />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </UserProvider>
      </div>
    )
  }
}