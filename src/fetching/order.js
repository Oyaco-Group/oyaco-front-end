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


export {
    getAllOrder,
    getOrderById
}