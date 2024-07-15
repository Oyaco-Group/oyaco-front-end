import { useRouter } from "next/router";

const Menu = (props) => {
  const { href, title, className } = props;
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <li>
      <a
        href={href}
        onClick={handleClick}
        className={`group my-2 flex items-center rounded-lg p-2 text-gray-900 hover:bg-blue-50 ${className}`}
      >
        <span className="ms-3">{title}</span>
      </a>
    </li>
  );
};

export default Menu;
