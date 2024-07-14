const InputField = ({ id, type, value, onChange, placeholder, className }) => {
  return (
    <div className="mb-5">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
