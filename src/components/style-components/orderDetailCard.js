// components/CardOrder.js

import React from "react";

const OrderInfoCard = ({ order }) => {
  const { order_id, quantity, created_at } = order;

  const formatISODate = (isoDateString) => {
    // Mendapatkan bagian-bagian tanggal dari string ISO 8601
    const year = isoDateString.substring(0, 4);
    const month = isoDateString.substring(5, 7);
    const day = isoDateString.substring(8, 10);
    const hour = isoDateString.substring(11, 13);
    const minute = isoDateString.substring(14, 16);
    const second = isoDateString.substring(17, 19);

    // Fungsi untuk mendapatkan nama bulan dari indeks bulan
    const getMonthName = (monthNum) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[parseInt(monthNum, 10) - 1];
    };

    // Membuat string tanggal yang mudah dibaca
    const formattedDate = `${day} ${getMonthName(month)} ${year}, ${hour}:${minute}:${second}`;

    return formattedDate;
  };

  return (
    <div className="bg-white rounded-t-lg border border-gray-200">
      <div className="p-4">
        <h5 className="font-bold text-gray-800">Order ID: {order_id}</h5>
        <p className="text-gray-700">Quantity: {quantity}</p>
        <p className="text-sm text-gray-500">
          Ordered At: {formatISODate(created_at)}
        </p>
      </div>
    </div>
  );
};

const ProductInfoCard = ({ product }) => {
  const { name, image, sku, price } = product;

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div className="p-4 flex items-center">
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:8080/api/images/${image}`}
            className="h-24 w-24 object-cover rounded"
            alt={name}
          />
        </div>
        <div className="ml-4 flex-1">
          <h5 className="font-bold text-gray-800">{name}</h5>
          <p className="text-gray-700">SKU: {sku}</p>
          <p className="text-gray-700">Price: Rp{price}</p>
        </div>
      </div>
    </div>
  );
};

const CardOrderDetail = ({ orders }) => {
  const [
    {
      id,
      order_id,
      master_product_id,
      inventory_id,
      quantity,
      created_at,
      updated_at,
      master_product,
    },
  ] = orders;
  const {
    id: productId,
    name,
    image,
    sku,
    slugify,
    price,
    category_id,
    isdelete,
    created_at: product_created_at,
    updated_at: product_updated_at,
  } = master_product;

  const subTotal = orders.reduce((total, order) => {
    const { quantity, master_product } = order;
    const { price } = master_product;
    return total + quantity * price;
  }, 0);

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <div className="bg-white rounded-lg border border-gray-200">
        {orders.map((order) => (
          <div key={order.id}>
            <ProductInfoCard product={order.master_product} />
            <OrderInfoCard order={order} />
          </div>
        ))}
        <div className="bg-gray-100 p-4 rounded-b-lg border-t border-gray-200">
          <h5 className="font-bold text-gray-800">Sub Total</h5>
          <p className="text-gray-700">Rp{subTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default CardOrderDetail;
