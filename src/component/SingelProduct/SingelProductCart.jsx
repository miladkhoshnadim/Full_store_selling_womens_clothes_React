export const SingelProductCart = ({
  item,
  ModalDisplay,
  setModalDisplay,
  myOrders,
  setmyOrders,
  setTotPrice,
  setitemModalDisplay,
}) => {
  let newMyOrder = [...myOrders];
  let totPrices = 0;

  function handelAddToCart(Added) {
    newMyOrder = [...myOrders];
    totPrices = 0;
    const AddedToCart = newMyOrder.find((obj) => obj.id === Added.id);
    console.log("!@#", AddedToCart);
    if (AddedToCart) {
      const findIndex = newMyOrder.findIndex((obj) => obj.id === Added.id);
      newMyOrder[findIndex].cunter++;
    } else if (!AddedToCart) {
      console.log("!@#", 2);
      Added.cunter = 1;
      newMyOrder = [...newMyOrder, Added];
    }
    setmyOrders(newMyOrder);
    // console.log("item", Added);
    CalcTotPrice();
  }

  function CalcTotPrice() {
    myOrders.forEach((item) => {
      totPrices = totPrices + item.price * item.cunter;
    });
    setTotPrice(totPrices);
  }

  function handelModal(item) {
    setModalDisplay(ModalDisplay ? false : true);
    setitemModalDisplay(item);
  }

  return (
    <div key={item.id} className="SingelOrder">
      <img onClick={() => handelModal(item)} src={item.url} />
      <span className="IntroduseProduct">{item.description}</span>
      <div className="FoterSingelPruduct">
        <span>${item.price}</span>
        <button className="AddToCart" onClick={() => handelAddToCart(item)}>
          Add To cart❤
        </button>
      </div>
    </div>
  );
};
