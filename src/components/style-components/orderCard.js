import { FaCartShopping } from "react-icons/fa6";

const OrderCard = ({ order, onOrderDetail, onComplaint, onUpdateStatus }) => {
  const formatISODate = (isoDateString) => {
    // Mendapatkan bagian-bagian tanggal dari string ISO 8601
    const year = isoDateString.substring(0, 4);
    const month = isoDateString.substring(5, 7);
    const day = isoDateString.substring(8, 10);
    const hour = isoDateString.substring(11, 13);
    const minute = isoDateString.substring(14, 16);
    const second = isoDateString.substring(17, 19);

    // Fungsi untuk mendapatkan nama bulan dari indeks bulan
    const getMonthName = (monthNum) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[parseInt(monthNum, 10) - 1];
    };

    // Membuat string tanggal yang mudah dibaca
    const formattedDate = `${day} ${getMonthName(month)} ${year}, ${hour}:${minute}:${second}`;

    return formattedDate;
  };

  const handleOrderDetail = () => {
    onOrderDetail(order.id);
  };

  const handleComplaint = () => {
    onComplaint(order.id);
  };

  const handleUpdateStatus = () => {
    onUpdateStatus(order.id);
  };

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 max-w-full rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 mb-4 transition duration-300 ease-in-out transform hover:shadow-lg">
      <div className="flex-shrink-0 mr-4 ml-10">
        <FaCartShopping className="text-blue-400 h-12 w-12" />
      </div>
      <div className="w-full p-4">
        <div className="font-bold text-xl mb-2">Order ID: {order.id}</div>
        <p className="text-gray-700 text-base">
          Payment Type: {order.payment_type}
        </p>
        <p className="text-gray-700 text-base">
          Order Status: {order.order_status}
        </p>
        <p className="text-gray-700 text-base">
          Buyer Status: {order.buyer_status}
        </p>
        <p className="text-gray-700 text-base">
          Created At: {formatISODate(order.created_at)}
        </p>
      </div>
      <div className="p-4 flex items-center space-x-4 mr-6">
        <button
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ease-in-out"
          onClick={handleOrderDetail}
        >
          Detail
        </button>
        <button
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 ease-in-out"
          onClick={handleComplaint}
        >
          Complaint
        </button>
        <button
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out"
          onClick={handleUpdateStatus}
        >
          Status
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
