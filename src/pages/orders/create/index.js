import TableOrder from "@/components/style-components/TableOrder";
import Dropdown from "@/components/style-components/dropdown";
import CheckboxField from "@/components/style-components/form/checkbox-field";
import InputField from "@/components/style-components/form/input-field";
import SelectField from "@/components/style-components/form/select-field";
import TextareaField from "@/components/style-components/form/textarea-field";
import { getAllProduct, getAllUser } from "@/fetching/order";
import { useEffect, useState } from "react";
import SelectFieldOrder from "./selectFieldOrderEmail";
import Button from "@/components/style-components/button";

const OrderCreatePage = () => {
    const[optionEmail,setOptionEmail] = useState([]);
    const[optionProduct, setOptionProduct] = useState([]);
    const[arrayShow,setArrayShow] = useState();
    const[userId, setUserId] = useState();
    const[paymentType, setPaymentType] = useState();
    const[buyerType, setBuyerType] = useState();
    const[numberItem, setNumberItem] = useState();

    const arrayProduct = useState([]);

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
        const data = await getAllUser(page,limit);
       
        let user = [];
        for(const i in data) {
            user[i] = {
                id : data[i].id,
                label : data[i].email
            }
        }
        setOptionEmail(user);
    }

    const fetchProduct = async(page=1,limit=20) => {
        const data = await getAllProduct(page,limit);

        let product = [];
        for(const i in data) {
            product[i] = {
                id : data[i].id,
                label : data[i].name
            }
        }

        setOptionProduct(product);
    }

    const onChangeUserId = (ev) => {
        const id = ev.target.value;
        setUserId(id);
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
        const item = ev.target.value;
        setNumberItem(item);
        setArrayShow(Array(+item).fill(null));
    }

    const arrangeArrayProduct = (index) => {
        arrayProduct[index] = {
            master_product_id : ''
        }
    }

    const arrangeData = () => {
        setData({
            user_id : userId,
            payment_type : paymentType,
            buyer_status : buyerType,
            order_status : 'Confirmed Yet'
        })
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
                <div className="relative overflow-x-auto overflow-y-auto rounded-lg border shadow-md bg-blue-400 p-5">
                    <form className="w-full min-w-max flex justify-between text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <div className="">
                            <div className="flex justify-between gap-2 mx-5 text-gray-900 text-white font-semibold">
                                <label>User Email</label>
                                <span>:</span>
                                <SelectFieldOrder options={optionEmail} placeholder={'User Email'} 
                                    onChange={(ev) => {onChangeUserId(ev)}}/>
                            </div>
                            <div className="flex justify-between gap-2 mx-5 text-center text-gray-900 text-white font-semibold">
                                <label>Payment Type</label>
                                <span>:</span>
                                <SelectField options={optionPayment} placeholder={'Payment_Type'} 
                                    onChange={(ev) => {onChangePayment(ev)}}/>
                            </div>
                            <div className="flex mx-5 justify-between gap-2 text-center text-gray-900 text-white font-semibold">
                                <label>Buyer_Status</label>
                                <span>:</span>
                                <SelectField options={optionBuyer} placeholder={'Buyer_Status'}
                                    onChange={(ev) => {onChangeBuyer(ev)}}/>
                            </div>
                        </div>
                        <div className="w-1/2 mx-5 text-center text-gray-900 text-white font-semibold border">
                            <div className="w-full flex mx-5 justify-center text-gray-900 text-white font-semibold">
                                <label>Product Item</label>
                                <span>:</span>
                                <InputField type={'number'} minValue={1} onChange={(ev) => {onChangeNumberItem(ev)}}/>
                            </div>
                            <h1 className="mb-3">Product : </h1>
                            { arrayShow.map((arr) => {
                                return (
                                    <div className="flex mx-5 justify-around text-center text-gray-900 text-white font-semibold">
                                            {/* <span>1</span> */}
                                            <SelectFieldOrder options={optionProduct} placeholder={'Product Name'}/>
                                            <div>
                                                <InputField type={'number'} minValue={1} placeholder={'Quantity'}/>
                                            </div>
                                     </div>
                                )
                            })
                            }
                            
                        </div>
                        
                    </form>
                        <Button onClick={arrangeData}>Add Order</Button>
                </div>
            </div>

        </div>

    )
}

export default OrderCreatePage;