import TableOrder from "@/components/style-components/TableOrder";
import { getAllOrder, getOrderById } from "@/fetching/order";
import { useEffect, useState } from "react";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Dropdown from "@/components/style-components/dropdown";
import Button from "@/components/style-components/button";
import Modal from "@/components/style-components/modal";
import DetailOrder from "./[id]";
import FormOrder from "./formOrder";
import { useRouter } from "next/router";


const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const [loading,setLoading] = useState(false);
  const [isOpen1, setisOpen1] = useState(false);
  const [isOpen2, setisOpen2] = useState(false);
  const [isOpen3, setisOpen3] = useState(false);
  const [id, setId] = useState();
  const [detailOrder, setDetailOrder] = useState({});
  const router = useRouter();

  const optionDropDown = [
    {
      label : 'A',
      icon : 'AA'
    },
    {
      label : 'B',
      icon : 'BB'
    }
  ]

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

  function openModal1(id) {
    setisOpen1(true);
    setId(id);
    fetchDetail(id);
    // router.push(`orders/${id}`);
  }
  function closeModal1() {
    setisOpen1(false);
  }
  function openModal2() {
    setisOpen2(true);
  }
  function closeModal2() {
    setisOpen2(false);
  }

  useEffect(() => {
    fetchOrder();
    setLoading(true);
  }, [isOpen1])

  const columns = [
    // {label : 'No', field : "no"},
    {label : 'No', field : 'id'},
    {label : 'Date', field : 'created_at'},
    {label : 'Order Status', field : 'order_status'},
    {label : 'Order Type', field : 'buyer_status'},
    {label : 'Payment Type', field : 'payment_type'},
    {label : 'Action', field : 'action'},
    {label : 'Send', field : 'action'},
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
              <Dropdown options={optionDropDown}/>
              <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                  router.push('/orders/create');
                }}>Add Order
              </button>
            </div>
              <TableOrder columns={columns} data={order} onDetail={openModal1} onForm={openModal2}/>
        </div>
        </div>

        <DetailOrder onClose={closeModal1} isOpen={isOpen1} data={detailOrder}/>
        <FormOrder onClose={closeModal2} isOpen={isOpen2} />
        </div>



  );


};

export default OrderPage;
