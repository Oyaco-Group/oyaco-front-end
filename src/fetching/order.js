import instance from "@/lib/axios"


const getAllOrder = async() => {
    const response = await instance({
        method : "GET",
        url : '/order/getorder'
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

const updateOrderAdmin = async(id, data) => {
    const response = await instance({
        method : 'PUT',
        url : `order/updateorder/${id}`,
        data : data
    })
    return response.data
}

const updateOrderStatus = async(id,order_status) => {
    const response = await instance({
        method : 'PATCH',
        url : `order/updateorderstatus/${id}`
    })
}

const getAllUser = async(page,limit) => {
    const response = await instance({
        method : 'GET',
        url : `user?page=${page}&limit=${limit}`
    })

    return response.data.data;
}

const getAllProduct = async(page,limit) => {
    const response = await instance({
        method : 'GET',
        url : `masterProduct/?page=${page}&limit=${limit}`
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
    console.log(response);
    return response.data.data;
}

export {
    getAllOrder,
    getOrderById,
    getOrderByUserId,
    updateOrderAdmin,
    getAllUser,
    getAllProduct,
    createOrder
}