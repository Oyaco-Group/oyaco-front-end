const CheckboxField = ({ id, checked, onChange, label, link, className }) => {
  return (
    <div className={`mb-6 flex items-start ${className}`}>
      <div className="flex h-5 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-400 bg-gray-50"
          required
        />
      </div>
      <label htmlFor={id} className="ms-2 text-sm font-medium text-white">
        {label}{" "}
        <a href={link} className="text-blue-800 hover:underline">
          terms and conditions.
        </a>
      </label>
    </div>
  );
};

export default CheckboxField;
