"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  fetchOrderHistoryById,
  fetchUpdateOrderStatus,
} from "@/fetching/orderHistory";
import OrderCard from "@/components/style-components/orderCard";
import Pagination from "@/components/style-components/pagination";
import Link from "next/link";
import ComplaintModal from "@/components/style-components/complaintModal";
import ConfirmationModal from "@/components/style-components/updateStatusModal";
import { useAuth } from "@/context/authContext";

const HistoryOrderPage = ({ initialOrders }) => {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);
  const id = user.id;
  // const { id } = router.query;

  const [orders, setOrders] = useState(initialOrders || []);
  const [loading, setLoading] = useState(true);
  const [clickedOrderId, setClickedOrderId] = useState(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const data = await fetchOrderHistoryById(id, currentPage, pageSize);
          setOrders(data.data);
          setTotalPages(data.metadata.totalPages);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching order history:", error);
          setLoading(false);
        }
      }
    };
    if (user) {
      fetchData();
    }
  }, [id, currentPage, pageSize]);

  const handleOrderDetail = (orderId) => {
    console.log("Order Detail clicked for order ID:", orderId);
    router.push(`/order-item/${orderId}`);
    setClickedOrderId(orderId);
  };

  const handleComplaint = (orderId) => {
    console.log("Complaint clicked for order ID:", orderId);
    setSelectedOrderId(orderId);
    setShowComplaintModal(true);
  };

  const handleUpdateStatus = (orderId, status) => {
    console.log(
      `Update Status Pesanan clicked for order ID: ${orderId}, with status: ${status}`
    );
    setSelectedOrderId(orderId);
    setOrderStatus(status);
    setShowConfirmationModal(true);
  };

  const closeComplaintModal = () => {
    setShowComplaintModal(false);
    setSelectedOrderId(null);
    setOrderStatus("");
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedOrderId(null);
    setOrderStatus("");
  };

  const handleConfirmUpdateStatus = async () => {
    try {
      const response = await fetchUpdateOrderStatus(
        selectedOrderId,
        "delivered"
      );
      console.log("Order status updated successfully!", response.data);

      setLoading(true);
      const updatedOrders = await fetchOrderHistoryById(id);
      setOrders(updatedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const updatedOrders = await fetchOrderHistoryById(id);
      setOrders(updatedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clickedOrderId !== null) {
      router.push(`/order-item/${clickedOrderId}`);
    }
  }, [clickedOrderId]);

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <h1 className="text-4xl mt-10 mb-10">History Order Page</h1>
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onOrderDetail={() => handleOrderDetail(order.id)}
                onComplaint={() => handleComplaint(order.id)}
                onUpdateStatus={() =>
                  handleUpdateStatus(order.id, order.order_status)
                }
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <ComplaintModal
        show={showComplaintModal}
        onClose={closeComplaintModal}
        orderId={selectedOrderId}
        onSuccess={refreshData}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmUpdateStatus}
        orderStatus={orderStatus}
      />
    </div>
  );
};

export default HistoryOrderPage;
