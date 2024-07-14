const TextareaField = ({
  id,
  rows,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className="mb-5">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextareaField;
