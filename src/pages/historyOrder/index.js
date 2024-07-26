import { useEffect, useState } from "react";
import { fetchOrderData } from "@/fetching/orderHistory";
import OrderHistoryTable from "@/components/orderHistoryTable";

export async function getServerSideProps({ params }) {
  const { id } = params;

  const initialOrders = await fetchOrderData(id);

  return {
    props: {
      initialOrders,
    },
  };
}

const HistoryOrderPage = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrderData(id);
      setOrders(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <h1 className="text-2xl">History Order Page</h1>
          <OrderHistoryTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default HistoryOrderPage;
