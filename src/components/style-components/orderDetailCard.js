// components/CardOrder.js

import React from "react";

const OrderInfoCard = ({ order }) => {
  const { order_id, quantity, created_at } = order;

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Order ID: {order_id}</h5>
        <p className="card-text">Quantity: {quantity}</p>
        <p className="card-text">
          <small className="text-muted">
            Ordered At: {new Date(created_at).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
};

const ProductInfoCard = ({ product }) => {
  const { name, image, sku, price } = product;
  const placeholderImageUrl = "https://via.placeholder.com/300x200";

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={placeholderImageUrl}
            className="img-fluid rounded-start"
            alt={name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">SKU: {sku}</p>
            <p className="card-text">Price: Rp{price}</p>
          </div>
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

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <OrderInfoCard order={{ order_id, quantity, created_at }} />
      </div>
      <div className="col-md-6">
        <ProductInfoCard product={{ name, image, sku, price }} />
      </div>
    </div>
  );
};

export default CardOrderDetail;
