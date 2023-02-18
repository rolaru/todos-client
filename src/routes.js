import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom';

// import { getFromStorage } from './helpers/local-storage-helper';

import TodosPage from './pages/todos-page/todos-page';
import LoginPage from './pages/auth/login-page/login-page';
import RegisterPage from './pages/auth/register/register-page';
import NotFoundPage from './pages/not-found-page/not-found-page';

const PrivateRoute = ({ children }) => {
  // const user = getFromStorage('user');

  // if (user) {
    return children ? children : <Outlet />;
  // } else {
  //   return <Navigate to="/auth/login" replace />;
  // }
};

const TodosRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Navigate to="/todos" />} />
        <Route path="todos" element={<TodosPage />}></Route>
      </Route>

      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default TodosRoutes;