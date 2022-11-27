// import React from "react";

export const ModalTag = ({
  item,
  ModalDisplay,
  setModalDisplay,
  myOrders,
  setmyOrders,
  setTotPrice,
}) => {
  let newMyOrder = [...myOrders];
  let totPrices = 0;
  function handeelAddToCart(Added) {
    newMyOrder = [...myOrders];
    const AddedToCart = newMyOrder.find((obj) => obj.id === Added.id);
    if (AddedToCart) {
      const findIndex = newMyOrder.findIndex((obj) => obj.id === Added.id);
      newMyOrder[findIndex].cunter++;
    } else if (!AddedToCart) {
      Added.cunter = 1;
      newMyOrder = [...newMyOrder, Added];
    }
    setmyOrders(newMyOrder);
    handelModal()
    CalcTotPrice();
  }

  function CalcTotPrice() {
    myOrders.forEach((item) => {
      totPrices = totPrices + item.price * item.cunter;
    });
    setTotPrice(totPrices);
  }

  function handelModal() {
    setModalDisplay(ModalDisplay ? false : true);
  }

  return (
    <div className="modalDiv">
      <div>
        <img className="imageModal" src={item.url} />
      </div>
      <div className="explainOrderModal">
        <div className="DivClose">
          <span>{item.description}</span>
          <button onClick={handelModal}>x</button>
        </div>
        <p>
          This is for all the latest trends, no matter who you are, where you’re
          from and what you’re up to. Exclusive to ASOS, our universal brand is
          here for you, and comes in all our fit ranges: ASOS Curve, Tall,
          Petite and Maternity. Created by us, styled by you.
        </p>
        <div className="divModalAddCart">
          <span>${item.price} </span>
          <button className="AddToCart" onClick={() => handeelAddToCart(item)}>
            Add To cart❤
          </button>
        </div>
      </div>
    </div>
  );
};

// export default ModalTag;
