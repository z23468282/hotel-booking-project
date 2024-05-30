type props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};
const PriceFilter = ({ selectedPrice, onChange }: props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">最高價格</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">請選擇最高價格</option>
        {[2000, 3000, 4000, 5000, 6000].map((price, index) => (
          <option key={index}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
