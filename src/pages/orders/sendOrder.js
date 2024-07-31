import Dropdown from "@/components/style-components/dropdown";
import Modal from "@/components/style-components/modal";
import { getInventoryByProductId } from "@/fetching/inventory";
import { useEffect, useState } from "react";
import DropDownInventory from "./dropDownInventory";
import Button from "@/components/style-components/button";



const SendOrder = ({isOpen, onClose,data, sendOrderHandler, order_status}) => {
    const [orderStatus, setOrderStatus] = useState(order_status|| ' ');
    const userName = {...data.user};
    const product = data.order_item;
    
    useEffect(() => {
        setOrderStatus(order_status || ' ');
    },[isOpen, orderStatus])

    return (
            <Modal isOpen={isOpen} onClose={onClose} title={"Detail Order"}>
                <div style={{}}>
                    <table className="w-full min-w-max text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <tbody>
                            <tr>
                                <td className="">Order Id</td>
                                <td>:</td>
                                <td>{data.id}</td>
                            </tr>
                            <tr>
                                <td>Username</td>
                                <td>:</td>
                                <td>{userName.name}</td>
                            </tr>
                            <tr>
                                <td>User Email</td>
                                <td>:</td>
                                <td>{userName.email}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>{userName.address}</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-md text-black">Order Status</td>
                                <td>:</td>
                                <td className="font-medium text-md text-black">{data.order_status}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-wrap items-center justify-start text-sm mt-5">
                        {product && (product.map((obj,index) => {
                            
                            return (
                                <div key={index} className="flex flex-wrap">
                                    <div className="rounded-lg border shadow-md m-1">
                                        <div className="font-semibold">{obj.master_product.name}</div>
                                        <img src={`http://localhost:8080/api/images/${obj.master_product.image}`} style={{width:'10rem'}}/>
                                    </div>
                                    <div className="text-xs text-left rounded-lg border shadow-md m-1 min-w-52">
                                        <div className="px-1 py-1">
                                            <span className="font-medium">SKU : </span>
                                            {obj.master_product.sku}
                                        </div>
                                        <div className="px-1 py-1">
                                            <span className="font-medium">Quantity : </span>
                                            {obj.quantity}
                                        </div>
                                        <div className="px-1 py-1"> 
                                            <span className="font-medium">Price : </span>
                                            {obj.master_product.price}
                                        </div>
                                        <div className="px-1 py-1">
                                            <span className="font-medium">Inventory : </span>
                                            {obj.inventory.warehouse.name}
                                        </div>
                                        <div className="px-1 py-1">
                                            <span className="font-medium">Stock : </span>
                                            {obj.inventory.quantity}
                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                        }
                        {!product && (<div>AAA</div>)}
                    </div>
                    <div className="p-2"> 
                        <h1 className="p-5">{`Are You Sure to Confirm Order with id ${data.id}?`}</h1>
                        <Button className="bg-blue-400 hover:bg-blue-500" onClick={() => {sendOrderHandler(data)}}>Confirm Send</Button>
                    </div>
                </div>
            </Modal>
    )
}

export default SendOrder;