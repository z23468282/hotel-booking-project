import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Footer from './components/Footer';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Layout />
        <Routes>
          <Route path="/" />
          <Route path="/search" />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
