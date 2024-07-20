import Modal from "@/components/style-components/modal";

const DetailOrder = ({ isOpen, onClose, data }) => {
  const userName = { ...data.user };
  const product = data.order_item;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Detail Order"}>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Order Id</td>
              <td>:</td>
              <td>{data.id}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>:</td>
              <td>{userName.name}</td>
            </tr>
            <tr>
              <td>User Email</td>
              <td>:</td>
              <td>{userName.email}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>{userName.address}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-wrap items-center justify-around">
          {product &&
            product.map((obj, index) => {
              return (
                <div key={index}>
                  <div>
                    <div>{obj.master_product.name}</div>
                    <img
                      src={`http://localhost:8080/api/images/${obj.master_product.image}`}
                    />
                    {obj.master_product.image}
                  </div>
                  <div>
                    <div>{obj.master_product.sku}</div>
                    <div>{obj.quantity}</div>
                    <div>{obj.master_product.price}</div>
                  </div>
                </div>
              );
            })}
          {!product && <div>AAA</div>}
        </div>
      </div>
    </Modal>
  );
};

export default DetailOrder;
