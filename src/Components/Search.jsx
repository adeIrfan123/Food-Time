const Search = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      placeholder="Cari produk..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`py-2 px-4 bg-stone-50 rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_2px_4px_rgba(0,0,0,0.1)] text-black ${className}`}
    />
  );
};
export default Search;
