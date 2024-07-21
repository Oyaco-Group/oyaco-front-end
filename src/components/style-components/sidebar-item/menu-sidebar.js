import { useRouter } from "next/router";

const Menu = ({ href, title, icon, className, onClick }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <li>
      <a
        href={href}
        onClick={handleClick}
        className={`group my-2 flex items-center rounded-lg p-2 text-gray-600 hover:bg-blue-50 ${className}`}
      >
        {icon && (
          <span className="mr-2 text-xl font-bold text-blue-400">{icon}</span>
        )}
        <span className="ms-3">{title}</span>
      </a>
    </li>
  );
};

export default Menu;
