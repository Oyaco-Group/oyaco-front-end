import TableOrder from "@/components/style-components/TableOrder";
import Dropdown from "@/components/style-components/dropdown";
import CheckboxField from "@/components/style-components/form/checkbox-field";
import InputField from "@/components/style-components/form/input-field";
import SelectField from "@/components/style-components/form/select-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import { createOrder, getAllProduct, getAllUser, getInventoryByProductId, getUserByEmail } from "@/fetching/order";
import { useEffect, useState } from "react";
import SelectFieldOrder from "./selectFieldOrderEmail";
import Button from "@/components/style-components/button";
import Modal from "@/components/style-components/modal";
import { toast } from "react-toastify";

const OrderCreatePage = () => {
    const[optionEmail,setOptionEmail] = useState([]);
    const[oneUser, setOneUser] = useState([]);
    const[optionProduct, setOptionProduct] = useState([]);
    const[inventory, setInventory] = useState([]);
    const[arrayShow,setArrayShow] = useState([]);
    const[userId, setUserId] = useState();
    const[paymentType, setPaymentType] = useState();
    const[buyerType, setBuyerType] = useState();
    const[minValueProduct, setMinValueProduct] = useState(1);

    const[isOpen, setIsOpen] = useState(false);

    const [arrayProduct, setArrayProduct] = useState([]);

    const[data,setData] = useState({})

    const optionPayment = [
        {label : 'Cash',},
        {label : 'Credit'}
    ]
    const optionBuyer = [
        {label : 'Online',},
        {label : 'Offline'},
        {label : 'B2B'}
    ]


    const fetchDataUser = async(page=1,limit=10) => {
        try {
            const data = await getAllUser(page,limit);
       
            let user = [];
            for(const i in data) {
                user[i] = {
                    id : data[i].id,
                    label : data[i].email
                }
            }
            setOptionEmail(user);
        } catch (err) {
            console.log(err);
            toast.error('Failed to fetch User Email');
        }
    }
        

    const fetchProduct = async(page=1,limit=20) => {
        try {
            const data = await getAllProduct(page,limit);
    
            let product = [];
            for(const i in data) {
                product[i] = {
                    id : data[i].id,
                    label : data[i].name
                }
            }
            setOptionProduct(product);
            
        } catch (err) {
            console.log(err);
            toast.error('Failed to fetch Product List');
        }
    }

    const fetchInventory = async(index) => {
        const master_product_id = +document.getElementById(`productId${index}`).value;
        const data = await getInventoryByProductId(master_product_id);

        let item = [];
        for(const i in data) {
            item[i] = {
                id : data[i].id,
                label : `Warehouse ${data[i].warehouse_id}, (${data[i].quantity})`
            }
        }
        const newArray = [...inventory];
        newArray[index] = item;
        setInventory(newArray);
    }

    const onChangeUserId = async(ev) => {
        try {
            const email = document.getElementById('email').value;
            const user = await getUserByEmail(email);
            setUserId(user.data.id);
            toast.success(user.message);
        } catch(err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
    
    const onChangePayment = (ev) => {
        const payment = ev.target.value;
        setPaymentType(payment);
    }

    const onChangeBuyer = (ev) => {
        const buyer = ev.target.value;
        setBuyerType(buyer);
    }

    const onChangeNumberItem = (ev) => {
        const numberItem = ev.target.value;
        const notNullLength = arrayShow.filter(item => item !== null).length;
        setMinValueProduct(notNullLength);

        if(notNullLength <= numberItem) {
            const array = Array(+numberItem).fill(null);
            const existArray = [...arrayShow];
            for(const i in array) {
                if(i < existArray.length) {
                    array[i] = existArray[i]
                }
            }
            setArrayShow(array);
        }
    }

    const isDisableSetting = (index) => {
        const arrayItem = [...arrayShow];
        arrayItem[index] = true;
        setArrayShow(arrayItem)
    }

    const isUnableSetting = (index) => {
        const arrayItem = [...arrayShow];
        arrayItem[index] = false;
        setArrayShow(arrayItem);
    }
    
    const arrangeArrayProduct = (index) => {
        const master_product_id = +document.getElementById(`productId${index}`).value;
        const quantity = +document.getElementById(`quantity${index}`).value;
        const inventory_id = +document.getElementById(`inventoryId${index}`).value;
        const newArray= [...arrayProduct];
        newArray[index] = {
            master_product_id, quantity, inventory_id
        }
        setArrayProduct(newArray);
    }

    const arrangeData = () => {
        setData({
            user_id : +userId,
            payment_type : paymentType,
            buyer_status : buyerType,
            order_status : 'Confirmed Yet',
            products : arrayProduct
        })
        console.log(data);
    }

    const createOrderItem = async() => {
        try{
            const response = await createOrder(data);
            setArrayShow([]);
            setArrayProduct([]);
            setData({});
            toast.success(response.message);
        } catch(err) {
            console.log(err);
            toast.error(err.message);
        }
    }
 
    useEffect(() => {
        fetchDataUser();
        fetchProduct();
    }, [])

    return (
        <div className="p-4 sm:ml-64">
            <div className="mt-14 rounded-lg p-4 dark:border-gray-700">
                <h1 className="mt-4 text-2xl text-gray-800">Add Order</h1>
                <p className="mb-6 text-sm font-light text-gray-400">
                    Please input order item or product
                </p>
                <div className="relative overflow-x-auto overflow-y-auto rounded-lg border shadow-md bg-blue-200 p-5 text-center">
                    <div className="w-full min-w-max flex justify-center text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <div className="bg-blue-400 p-4 rounded-lg">
                            <div className="flex flex-wrap justify-between gap-2 mx-5 text-gray-900 text-white font-semibold border rounded-sm p-4 mb-3">
                                <label>User Email</label>
                                <InputField type={'email'} placeholder={'User Email'} id={'email'} />
                                <Button size="sm" className="bg-red-500 hover:bg-red-600 w-full" onClick={(ev) => {onChangeUserId(ev)}}>Lock User</Button>
                            </div>
                            <div className="flex justify-between gap-2 mx-5 text-center text-gray-900 text-white font-semibold border rounded-sm p-4 mb-3   ">
                                <label>Payment Type</label>
                                <SelectField options={optionPayment} placeholder={'Payment_Type'} 
                                    onChange={(ev) => {onChangePayment(ev)}}/>
                            </div>
                            <div className="flex mx-5 justify-between gap-2 text-center text-gray-900 text-white font-semibold border rounded-sm p-4">
                                <label>Buyer_Status</label>
                                <SelectField options={optionBuyer} placeholder={'Buyer_Status'}
                                    onChange={(ev) => {onChangeBuyer(ev)}}/>
                            </div>
                        </div>
                        <div className="w-2/3 mx-5 text-center text-gray-900 text-white font-semibold bg-blue-400 p-4 rounded-lg">
                            <div className="w-full flex mx-5 justify-center text-gray-900 text-white font-semibold">
                                <label>Product Item</label>
                                <span>:</span>
                                <InputField type={'number'} minValue={minValueProduct} onChange={(ev) => {onChangeNumberItem(ev)}}/>
                            </div>

                            <div className="overflow-x-auto overflow-y-auto rounded-lg border shadow-md">

                                <table className="w-full min-w-max text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-blue-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-center">
                                            <th scope="col" className="whitespace-nowrap px-6 py-3">No</th>
                                            <th scope="col" className="whitespace-nowrap px-6 py-3">Product</th>
                                            <th scope="col" className="whitespace-nowrap px-6 py-3">Quantity</th>
                                            <th scope="col" className="whitespace-nowrap px-6 py-3">Warehouse</th>
                                            <th scope="col" className="whitespace-nowrap px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { arrayShow.map((arr,index) => {
                                            return (
                                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                                        <td className="px-8 ">{index+1}</td>
                                                        <td className="py-2 px-2">
                                                            <SelectFieldOrder options={optionProduct} placeholder={'Product Name'} id={`productId${index}`} disabled={arrayShow[index]} required={true} 
                                                                onChange={() => {fetchInventory(index)}}/>
                                                        </td>
                                                        <td className="py-2 px-2">
                                                            <InputField type={'number'} minValue={1} placeholder={'Quantity'} id={`quantity${index}`} disabled={arrayShow[index]} required={true}/>
                                                        </td>
                                                        <td className="py-2 px-2">
                                                            <SelectFieldOrder options={!inventory[index] ? [] : inventory[index]} placeholder={'Inventory'} id={`inventoryId${index}`} disabled={arrayShow[index]} required={true}/>
                                                        </td>
                                                        <td className="px-2 text-center">
                                                            {!arr && (
                                                                <Button size="sm" onClick={(ev) => 
                                                                    {
                                                                        isDisableSetting(index);
                                                                        arrangeArrayProduct(index);
                                                                    }}
                                                                >Create Data</Button>
                                                            )}
                                                            {arr && (
                                                                 <Button size="sm" onClick={(ev) => 
                                                                    {
                                                                        isUnableSetting(index);
                                                                    }}
                                                                >Update Data</Button>
                                                            )}
                                                            
                                                        </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>

                                </table>
                           
                            </div>
                            
                        </div>
                        
                    </div>
                    <Button className="bg-green-400 hover:bg-green-500 mt-8"
                        onClick={() => {
                            arrangeData();
                            setIsOpen(true);
                            }}>
                        Add Order
                    </Button>
                    <Modal title={'Confirm Order'} onClose={()=>{setIsOpen(false)}} isOpen={isOpen} >
                        <p>Are You Sure to Order ?</p>
                        <Button onClick={() => 
                            {
                                setIsOpen(false)
                                arrangeData()
                                createOrderItem();
                            }}>
                            CheckOut
                        </Button>
                    </Modal>
                </div>
            </div>

        </div>

    )
}

export default OrderCreatePage;