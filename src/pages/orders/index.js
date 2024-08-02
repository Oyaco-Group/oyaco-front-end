import TableOrder from "@/components/style-components/TableOrder";
import { getAllOrder, getOrderById, sendOrder } from "@/fetching/order";
import { updateOrderAdmin, updateOrderStatus } from "@/fetching/order";
import { useEffect, useState } from "react";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Dropdown from "@/components/style-components/dropdown";
import Button from "@/components/style-components/button";
import Modal from "@/components/style-components/modal";
import { toast } from "react-toastify";
import DetailOrder from "./detail";
import FormOrder from "./formOrder";
import { useRouter } from "next/router";
import Pagination from "@/components/style-components/pagination";
import ChangeStatus from "./changeStatus";
import SendOrder from "./sendOrder";
import { useAuth } from "@/context/authContext";

const OrderPage = () => {
  const { user } = useAuth();
  const [order, setOrder] = useState([]);
  const [isOpen1, setisOpen1] = useState(false);
  const [isOpen2, setisOpen2] = useState(false);
  const [isOpen3, setisOpen3] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [id, setId] = useState();
  const [detailOrder, setDetailOrder] = useState({});
  const router = useRouter();

  const fetchOrder = async () => {
    try {
      const data = await getAllOrder(page, limit);
      setOrder(data.data);
      setTotalPages(data.metadata.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDetail = async (id) => {
    try {
      const data = await getOrderById(id);
      setDetailOrder(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  function openModal1(id) {
    setisOpen1(true);
    setId(id);
    fetchDetail(id);
  }

  function closeModal1() {
    setisOpen1(false);
  }

  function openModal2(id) {
    setId(id);
    setisOpen2(true);
    fetchDetail(id);
  }

  function closeModal2() {
    setisOpen2(false);
  }

  function openModal3(id) {
    setId(id);
    setisOpen3(true);
    fetchDetail(id);
  }

  function closeModal3() {
    setisOpen3(false);
  }

  const sendOrderHandler = async (params) => {
    try {
      const { id } = params;
      const admin_id = user.id;
      // console.log(params, admin_id);
      const order = await sendOrder(id, params, admin_id);
      setisOpen2(false);
      toast.success(order.message);
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const statusOrderChanger = async () => {
    try {
      const order_status = "Confirmed";
      const order = await updateOrderStatus(detailOrder.id, order_status);
      toast.success(order.message);
      setisOpen3(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const onEdit = (id) => {
    router.push(`/orders/edit/${id}`);
  };

  useEffect(() => {
    fetchOrder();
  }, [page, limit, isOpen1, isOpen2, isOpen3]);

  const columns = [
    // {label : 'No', field : "no"},
    { label: "No", field: "no" },
    { label: "Date", field: "created_at" },
    { label: "Order Status", field: "order_status" },
    { label: "Order Type", field: "buyer_status" },
    { label: "Payment Type", field: "payment_type" },
    { label: "Action", field: "action" },
    { label: "Send", field: "action" },
  ];

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
        <h1 className="mt-4 text-2xl text-gray-800">Order List</h1>
        <p className="mb-1 text-sm font-light text-gray-400">
          Manage Order List
        </p>
        <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-end space-y-4 bg-white py-3 md:flex-row md:space-y-0 dark:bg-gray-900">
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                router.push("/orders/create");
              }}
            >
              Add Order
            </Button>
          </div>
          <TableOrder
            columns={columns}
            data={order}
            onDetail={openModal1}
            onChange={openModal3}
            onEdit={onEdit}
            sendOrder={openModal2}
          />
        </div>
      </div>
      <div className="flex justify-end px-5">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <ChangeStatus
        onClose={closeModal3}
        isOpen={isOpen3}
        data={detailOrder}
        statusOrderChanger={statusOrderChanger}
      />
      <DetailOrder
        onClose={closeModal1}
        isOpen={isOpen1}
        data={detailOrder}
        order_status={detailOrder.order_status}
      />
      <SendOrder
        onClose={closeModal2}
        isOpen={isOpen2}
        data={detailOrder}
        sendOrderHandler={sendOrderHandler}
      />
    </div>
  );
};

export default OrderPage;
