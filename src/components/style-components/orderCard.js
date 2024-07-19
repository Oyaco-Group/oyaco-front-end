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
    <div className="mb-4 flex max-w-full items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="ml-10 mr-4 flex-shrink-0">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src="http://www.w3.org/2000/svg"
          alt="Order Image"
        />
      </div>
      <div className="w-full p-4">
        <div className="mb-2 text-xl font-bold">Order ID: {order.id}</div>
        <p className="text-base text-gray-700">User ID: {order.user_id}</p>
        <p className="text-base text-gray-700">
          Payment Type: {order.payment_type}
        </p>
        <p className="text-base text-gray-700">
          Order Status: {order.order_status}
        </p>
        <p className="text-base text-gray-700">
          Buyer Status: {order.buyer_status}
        </p>
        <p className="text-base text-gray-700">
          Created At: {formatISODate(order.created_at)}
        </p>
      </div>
      <div className="flex justify-end p-4">
        <button
          className="mr-8 rounded bg-black px-4 py-1 text-sm font-bold text-white hover:bg-gray-800"
          onClick={handleOrderDetail}
        >
          Detail
        </button>
        <button
          className="mr-8 rounded bg-red-500 px-4 py-1 text-sm font-bold text-white hover:bg-red-700"
          onClick={handleComplaint}
        >
          Complaint
        </button>
        <button
          className="mr-8 rounded bg-green-500 px-4 py-1 text-sm font-bold text-white hover:bg-green-700"
          onClick={handleUpdateStatus}
        >
          Status
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
