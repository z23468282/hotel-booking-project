import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold ">
          <Link to="/">adoga.com</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="my-bookings"
              >
                我的預訂
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="my-hotels"
              >
                我的飯店
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500"
            >
              登入
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
