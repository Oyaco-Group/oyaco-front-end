import Dropdown from "@/components/style-components/dropdown";
import Modal from "@/components/style-components/modal";
import { getInventoryByProductId } from "@/fetching/inventory";
import { useEffect, useState } from "react";
import DropDownInventory from "./dropDownInventory";
import Button from "@/components/style-components/button";
import { updateOrderAdmin } from "@/fetching/order";

const DetailOrder = ({isOpen, onClose,data}) => {
    const userName = {...data.user};
    const product = data.order_item;
    const [dataInput, setDataInput] = useState({});

    const fetchInventory = async(id) => {
        const data = await getInventoryByProductId(id);
        return data.data
    }

    const addInventory = async() => {
        for(const i in product) {
            product[i].inventory = await fetchInventory(product[i].master_product.id);
        }
    }

    const updateInputHandler = async(params) => {
        const {user_id,payment_type,order_status,buyer_status} = data;
        const array = {
            user_id, payment_type, order_status, buyer_status
        };
        const inventory_id = params.id;
        let object = [];
        for(const i in product) {
            object[i] = {
                master_product_id : product[i].master_product.id,
                quantity : product[i].quantity,
                inventory_id : inventory_id
            }
        }
        array.products = object;
        setDataInput(array);
        // window.alert(JSON.stringify(dataInput))
    }
    
    const submitHandler = async(input) => {
        await updateOrderAdmin(data.id,input);
        // window.alert(JSON.stringify(dataInput))
        console.log(dataInput.order_status)
        console.log(dataInput.products)
    }
    
    useEffect(() => {
        addInventory();
    },[product])


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
                                    <div className="px-1 py-2">
                                        <span className="font-medium">SKU : </span>
                                        {obj.master_product.sku}
                                    </div>
                                    <div className="px-1">
                                        <span className="font-medium">Quantity : </span>
                                        {obj.quantity}
                                    </div>
                                    <div className="px-1 py-2"> 
                                        <span className="font-medium">Price : </span>
                                        {obj.master_product.price}
                                    </div>
                                    <div className="text-center">
                                       <DropDownInventory product={obj} onSelect={(ev) => {updateInputHandler(dataInput)}}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }))
                    }
                    {!product && (<div>AAA</div>)}
                </div>
                <div className="p-2">
                    <Button onClick={submitHandler}>
                        Confirmed Order</Button>
                </div>
            </div>
            </Modal>
    )
}

export default DetailOrder;