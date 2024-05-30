import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

const layout = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
    </div>
  );
};

export default layout;
