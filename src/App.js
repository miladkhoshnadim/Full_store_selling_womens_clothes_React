import logo from "./logo.svg";
import "./App.css";
import dataCart from "./component/input";
import React, { useState } from "react";
import { ModalTag } from "./component/ModalCart/modal";
const MyOrderss = [];

function App() {
  const [data, setdata] = useState(dataCart);
  const [myOrders, setmyOrders] = useState(MyOrderss);
  const [TotPrice, setTotPrice] = useState(0);
  const [ModalDisplay, setModalDisplay] = useState(false);
  const [itemModalDisplay, setitemModalDisplay] = useState({});
  let newMyOrder = [...myOrders];
  let totPrices = 0;

  function handelFilter(e) {
    setdata(dataCart.filter((item) => item.size.includes(e.target.value)));
  }

  function HandelFilterPrice(e) {
    const newdata = [...data];
    if (e.target.value == "Lowest") {
      setdata(newdata.sort((a, b) => a.price - b.price));
    } else if (e.target.value == "Highest") {
      setdata(newdata.sort((a, b) => b.price - a.price));
    }
  }

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
  }

  myOrders.forEach((item) => {
    totPrices = totPrices + item.price * item.cunter;
  });
  setTotPrice(totPrices);

  function handelPayment() {
    alert("your Payment was Saccesfully but we dont have any products");
  }

  function handelRemovig(itemremove) {
    console.log("itemremove", itemremove);
    newMyOrder = [...myOrders];
    totPrices = 0;
    // const AddedToCart = newMyOrder.find((obj) => obj.id === Added.id);
    // console.log("!@#", AddedToCart);
    const findIndex = newMyOrder.findIndex((obj) => obj.id === itemremove.id);
    if (itemremove.cunter > 1) {
      newMyOrder[findIndex].cunter--;
    } else if (itemremove.cunter == 1) {
      newMyOrder.splice(findIndex, 1);
    }
    setmyOrders(newMyOrder);
    // console.log("item", Added);
    newMyOrder.forEach((item) => {
      totPrices = totPrices + item.price * item.cunter;
    });
    setTotPrice(totPrices);
  }

  function handelModal(item) {
    setModalDisplay(ModalDisplay ? false : true);
    setitemModalDisplay(item);
  }

  // <div className="modalDiv">
  //   <div>
  //     <img
  //       className="imageModal"
  //       src={itemModalDisplay.url}
  //     />
  //   </div>
  //   <div className="explainOrderModal">
  //     <div className="DivClose">
  //       <span>{itemModalDisplay.description}</span>
  //       <button onClick={handelModal}>x</button>
  //     </div>
  //     <p>
  //       This is for all the latest trends, no matter who you are, where
  //       you’re from and what you’re up to. Exclusive to ASOS, our
  //       universal brand is here for you, and comes in all our fit
  //       ranges: ASOS Curve, Tall, Petite and Maternity. Created by us,
  //       styled by you.
  //     </p>
  //     <div className="divModalAddCart">
  //       <span>${itemModalDisplay.price} </span>
  //       <button className="AddToCart" onClick={() => handelAddToCart(itemModalDisplay)}>
  //         Add To cart❤
  //       </button>
  //     </div>
  //   </div>
  // </div>

  return (
    <>
      <div className="baseModal">
        {ModalDisplay && (
          <ModalTag
            ite={itemModalDisplay}
            ModalDispla={ModalDisplay}
            setModalDispla={setModalDisplay}
            myOrder={myOrders}
            setmyOrder={setmyOrders}
          />
        )}

        <div className="headMinePage">React Shapping Cart</div>
        <section className="MainSection">
          <div className="ProductSection">
            <div className="heaadSectionProduct">
              <span>{data.length} Products</span>
              <div>
                Order
                <select onChange={HandelFilterPrice}>
                  <option>Lowest</option>
                  <option>Highest</option>
                </select>
              </div>
              <div>
                Filter
                <select onChange={handelFilter}>
                  <option>ALL</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </select>
              </div>
            </div>
            <div className="ProductsShow">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="SingelOrder"
                  onClick={() => handelModal(item)}
                >
                  <img src={item.url} />
                  <span className="IntroduseProduct">{item.description}</span>
                  <div className="FoterSingelPruduct">
                    <span>${item.price}</span>
                    <button
                      className="AddToCart"
                      onClick={() => handelAddToCart(item)}
                    >
                      Add To cart❤
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="OrderSection">
            <div className="HeadSectonOrder">
              {myOrders.length > 0
                ? `you have ${myOrders.length} in cart`
                : "Cart is Empty"}
            </div>
            <div className="MyOrderShowSection">
              {myOrders.map((item) => (
                <div key={item.id} className="singelOrder">
                  <div>
                    <img className="imgOrder" src={item.url} />
                  </div>
                  <div className="explainOrder">
                    <span>{item.description}</span>
                    <div>
                      <span>
                        ${item.price} x {item.cunter}
                      </span>
                      <button
                        className="removeOrder"
                        onClick={() => handelRemovig(item)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="divPayment">
              {myOrders.length > 0 && (
                <>
                  <span>Total: ${TotPrice}</span>
                  <button className="Payment" onClick={handelPayment}>
                    Pay and buy
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
