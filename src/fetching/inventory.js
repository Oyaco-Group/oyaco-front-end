import instance from '@/lib/axios';


const getInventoryByProductId = async(id) => {
    const response = await instance({
        method : 'GET',
        url : `/inventory/product/${id}`
    })
    return response.data.data;
}


export {
    getInventoryByProductId
}