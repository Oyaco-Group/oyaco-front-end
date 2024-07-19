import TableOrder from "@/components/style-components/TableOrder";
import { getAllOrder, getOrderById } from "@/fetching/order";
import { useEffect, useState } from "react";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Dropdown from "@/components/style-components/dropdown";
import Button from "@/components/style-components/button";
import Modal from "@/components/style-components/modal";
import DetailOrder from "./detail";


const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const [loading,setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [detailOrder, setDetailOrder] = useState({});

  const fetchOrder = async() => {
    try {
      const data = await getAllOrder();
      setOrder(data.data);
      setLoading(false)

    } catch(err) {
      console.log(err);
    }
  }

  const fetchDetail = async(id) => {
    try {
      const data = await getOrderById(id);
      setDetailOrder(data.data);

    } catch(err) {
      console.log(err);
    }
  }

  function openModal(id) {
    setIsOpen(true);
    setId(id);
    fetchDetail(id);
    console.log(detailOrder);
  }
  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    fetchOrder();
    setLoading(true);
  }, [order,isOpen])

  const columns = [
    // {label : 'No', field : "no"},
    {label : 'Order Id ', field : 'id'},
    {label : 'Date', field : 'created_at'},
    {label : 'Order Status', field : 'order_status'},
    {label : 'Order Type', field : 'buyer_status'},
    {label : 'Payment Type', field : 'payment_type'},
    {label : 'Action', field : 'action'},

  ]

  return (
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
          <h1 className="mt-4 text-2xl text-gray-800">Order List</h1>
          <p className="mb-6 text-sm font-light text-gray-400">
            Manage Order List
          </p>
          <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-around space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <Dropdown/>

            <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >Add Order
            </button>

          </div>
        </div>
            <TableOrder columns={columns} data={order} onEdit={openModal}/>
        <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
          <h1 className="mt-4 text-2xl text-gray-800">Order List</h1>
          <p className="mb-6 text-sm font-light text-gray-400">
            Manage Order List
          </p>
          <div className="relative overflow-x-auto">
          <div className="flex flex-wrap items-center justify-around space-y-4 bg-white py-4 md:flex-row md:space-y-0 dark:bg-gray-900">
            <Dropdown/>

            <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >Add Order
            </button>

          </div>
        </div>
            <TableOrder columns={columns} data={order} onEdit={openModal}/>
        </div>

        <DetailOrder onClose={closeModal} isOpen={isOpen} data={detailOrder}/>
      </div>




  );


};

export default OrderPage;
