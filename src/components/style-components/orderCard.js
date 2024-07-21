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
    <div className="flex items-center bg-white dark:bg-gray-800 max-w-full rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex-shrink-0 mr-4 ml-10">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src="http://www.w3.org/2000/svg"
          alt="Order Image"
        />
      </div>
      <div className="w-full p-4">
        <div className="font-bold text-xl mb-2">Order ID: {order.id}</div>
        <p className="text-gray-700 text-base">User ID: {order.user_id}</p>
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
      <div className="p-4 flex justify-end">
        <button
          className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-4 rounded mr-8 text-sm"
          onClick={handleOrderDetail}
        >
          Detail
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mr-8 text-sm"
          onClick={handleComplaint}
        >
          Complaint
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-8 text-sm"
          onClick={handleUpdateStatus}
        >
          Status
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
