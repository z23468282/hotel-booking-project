import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Footer from './components/Footer';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:hotelId" element={<Detail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          {isLoggedIn && (
            <>
              <Route path="/add-hotel" element={<AddHotel />} />
              <Route path="/my-hotels" element={<MyHotels />} />
              <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
