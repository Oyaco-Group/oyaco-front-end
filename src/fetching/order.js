import instance from "@/lib/axios"


const getAllOrder = async(page,limit) => {
    const response = await instance({
        method : "GET",
        url : `/order/getorder?page=${page}&limit=${limit}`
    })
    return response.data;
}

const getOrderById = async(id) => {
    const response = await instance({
        method : 'GET',
        url : `order/getoneorder/${id}`
    })
    return response.data;
}

const getOrderByUserId = async(user_id) => {
    const response = await instance({
        method : 'GET',
        url : `order/getoneorderuser/${user_id}`
    })
    return response.data;
}

const updateOrderItem = async(id, data) => {
    const response = await instance({
        method : 'PUT',
        url : `orderitem/updateorderitem/${id}`,
        data : {...data}
    })
    return response.data
}

const updateOrderStatus = async(id,order_status) => {
    const response = await instance({
        method : 'PATCH',
        url : `order/updateorderstatus/${id}`,
        data : {order_status}
    })
    return response.data;
}

const getAllUser = async(page,limit) => {
    const response = await instance({
        method : 'GET',
        url : `user?page=${page}&limit=${limit}`
    })

    return response.data.data.users;
}

const getUserByEmail = async(email) => {
    const response = await instance({
        method : 'GET',
        url : `user/email/${email}`
    })

    return response.data;
}

const getAllProduct = async(page,limit) => {
    const response = await instance({
        method : 'GET',
        url : `masterProduct/?page=${page}&limit=${limit}`
    })

    return response.data.data.masterProduct;
}

const getInventoryByProductId = async(id) => {
    const response = await instance({
        method : 'GET',
        url : `/inventory/product/${id}`
    })
    return response.data.data;
}

const createOrder = async(params) => {
    const response = await instance({
        method : 'POST',
        url : `order/createorder`,
        data : {
            user_id: params.user_id,
            payment_type: params.payment_type,
            order_status: params.order_status,
            buyer_status: params.buyer_status,
            products: params.products
        }
    })
    return response.data;
}

const sendOrder = async(id,params,admin_id) => {
    const response = await instance({
        method : 'POST',
        url : `order/sendorder/${id}`,
        data : {...params, admin_id}
    })
    return response.data;
}

const getComplaint = async(order_id) => {
    // const response = await instance.get(`/complaint/${order_id}`);
    const response = await instance({
        method : 'GET',
        url : `/complaint/${order_id}`
    })

    return response.data.data;
}

export {
    getAllOrder,
    getOrderById,
    getOrderByUserId,
    getInventoryByProductId,
    updateOrderStatus,
    updateOrderItem,
    getAllUser,
    getUserByEmail,
    getAllProduct,
    createOrder,
    sendOrder,
    getComplaint
}