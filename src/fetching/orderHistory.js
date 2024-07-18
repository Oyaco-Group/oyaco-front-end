import instance from "@/lib/axios";

export const getServerSideProps = async ({ params }) => {
  // Destructure `id` from params
  const { id } = params;

  try {
    // Panggil API backend untuk mendapatkan data order history
    const response = await instance.get(`/order/getoneorder/${id}`);
    const data = response.data;

    return {
      props: {
        orders: data,
      },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      props: {
        orders: null, // Jika terjadi kesalahan, kembalikan null atau tangani sesuai kebutuhan Anda
      },
    };
  }
};
