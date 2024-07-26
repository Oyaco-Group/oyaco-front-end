import Dropdown from "@/components/style-components/dropdown";
import Pagination from "@/components/style-components/pagination";
import DetailOrder from "../detail";
import FormOrder from "../formOrder";
import { useRouter } from "next/router";
import Button from "@/components/style-components/button";
import { useEffect, useState } from "react";
import { getOrderById, updateOrderItem } from "@/fetching/order";
import Table from "@/components/style-components/table";
import Modal from "@/components/style-components/modal";
import SelectFieldOrder from "../create/selectFieldOrderEmail";
import { getInventoryByProductId } from "@/fetching/inventory";
import InputField from "@/components/style-components/form/input-field";
import { toast } from "react-toastify";

const EditOrder = () => {
    const router = useRouter();   
    const[orderId, setOrderId] = useState(1);
    const[detailOrder, setDetailOrder] = useState({});
    const[products, setProducts] = useState([]);
    const[inventory, setInventory] = useState([]);
    const[orderItemId, setOrderItemId] = useState();
    const[productId, setProductId] = useState();
    const[inventoryId, setInventoryId] = useState();
    const[quantity, setQuantity] = useState();
    const[isOpen, setIsOpen] = useState(false);
    const[refresh, setRefresh] = useState(false);

    const fetchingDetailOrder = async(id) => {
        try {
            const data = await getOrderById(id);
            setDetailOrder(data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchInventory = async (index) => {
        try {
            const data = await getInventoryByProductId(index);
            let item = [];
            for(const i in data) {
                item[i] = {
                    id : data[i].id,
                    label : `Warehouse ${data[i].warehouse_id}, (${data[i].quantity})`
                }
            }
            setInventory(item);
        } catch(err) {
            console.log(err);
        }
    }

    const updateOrder = async (id) => {
        try {
            const data = {
                order_id : +detailOrder.id,
                master_product_id : +productId,
                inventory_id : +inventoryId,
                quantity : +quantity 
            }
            console.log(id,data);
            const orderItem = await updateOrderItem(id, data);
            toast.success(orderItem.message);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }

    }
    const arrangeColumn = () => {
        let array = [];
        const data = detailOrder.order_item;
        for (const i in data) {
            array[i] = {
                payment_type : detailOrder.payment_type,
                quantity : data[i].quantity,
                master_product_name : data[i].master_product.name,
                image : `http://localhost:8080/api/images/${data[i].master_product.image}`,
                price : data[i].master_product.price,
                inventory : `${data[i].inventory.warehouse.name} (${data[i].inventory.quantity})`,
                productId : data[i].master_product.id,
                orderItemId : data[i].id
            }
        }
        setProducts(array);
    }

    const openModal = (row) => {
        setIsOpen(true);
        fetchInventory(+row.productId);
        setProductId(+row.productId);
        setOrderItemId(+row.orderItemId);
        console.log(inventory);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const columns = [
        {label : 'No', field : 'no'},
        {label : 'Image', field : 'image'},
        {label : 'Product Name', field : 'master_product_name'},
        {label : 'Quantity', field : 'quantity'},
        {label : 'Price', field : 'price'},
        {label : 'Payment Type', field : 'payment_type'},
        {label : 'Inventory', field : 'inventory'},
        {label : 'Action', field : 'Edit'},
      ]


    useEffect(() => {
        if(router.query.id) {
            setOrderId(router.query.id); 
        }
    }, [router.query.id, refresh, isOpen])

    useEffect(() => {
        if(orderId !== 1) {
            fetchingDetailOrder(orderId);
        }
    }, [orderId, refresh, isOpen])

    if(detailOrder.user) {
        return (
            <div className="p-4 sm:ml-64">
                <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
                    <h1 className="mt-4 text-2xl text-gray-800">Order List</h1>
                    <p className="mb-1 text-sm font-light text-gray-400">
                    Manage Order List
                    </p>
                    <div className="relative overflow-x-auto">
                        <div className="flex flex-wrap items-center justify-around space-y-4 bg-white py-3 md:flex-row md:space-y-0 dark:bg-gray-900">
                          
                                <table className="w-1/3 min-w-max text-left text-md text-gray-500 rtl:text-right dark:text-gray-400 bg-blue-200 border rounded-lg p-2">
                                    <tbody>
                                        <tr >
                                            <td className="font-medium text-md text-black">Order Id</td>
                                            <td>:</td>
                                            <td>{detailOrder.id}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium text-md text-black">Username</td>
                                            <td>:</td>
                                            <td>{detailOrder.user.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium text-md text-black">User Email</td>
                                            <td>:</td>
                                            <td>{detailOrder.user.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium text-md text-black">Address</td>
                                            <td>:</td>
                                            <td>{detailOrder.user.address}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium text-md text-black">Order Status</td>
                                            <td>:</td>
                                            <td className="font-medium text-md text-black">{detailOrder.order_status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            
                        </div>
                        <Table
                            columns={columns} 
                            data={products} 
                            onDetail={''} 
                            onForm={''}
                            onEdit={openModal}
                        />
                    </div>
                </div>
                <div className="flex justify-end px-5">
                    <Pagination
                        currentPage={''}
                        totalPages={''}
                        onPageChange={''}
                    />
                </div>

                <Modal isOpen={isOpen} onClose={closeModal}>
                    <h1>Select Inventory and Quantity</h1>
                    <div className="w-full min-w-max text-left text-md text-gray-900 rtl:text-right p-4 border rounded-lg shadow-md m-1 bg-blue-200">
                        <form className="text-center">
                            <div className="p-2 text-center">Inventory : </div>
                            <SelectFieldOrder options={inventory} placeholder={'Select Warehouse'} required={true} 
                                onChange={(ev) => {
                                    setInventoryId(ev.target.value)
                                }}
                            />
                            <div className="p-2 text-center">Quantity : </div>
                            <InputField type={'number'} minValue={1} 
                                 onChange={(ev) => {
                                    setQuantity(ev.target.value)
                                }}
                            /> 
                            <Button onClick={(ev) => {
                                // ev.preventDefault();
                                updateOrder(orderItemId);
                                setIsOpen(false);
                                setRefresh(true);
                            }}
                            >
                                Confirm Edit</Button>
                        </form>
                    </div>
                </Modal>
    
                <Button onClick={() => {
                    arrangeColumn();
                    setRefresh(false);
                    console.log(products);
                }}>
                Refresh Data
                </Button>
            </div>
        )
    }

}

export default EditOrder;