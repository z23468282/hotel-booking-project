const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 mt-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          agoda.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4 ">
          <p className="cursor-pointer">隱私權政策</p>
          <p className="cursor-pointer">條款</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
