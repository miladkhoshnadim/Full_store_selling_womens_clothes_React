// import logo from "./logo.svg";
import "./App.css";
import dataCart from "./component/input";
import React, { useState } from "react";
import { ModalTag } from "./component/ModalCart/modal";
import { SingelProductCart } from "./component/SingelProduct/SingelProductCart";

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

  return (
    <>
      <div className="baseModal">
        {ModalDisplay && (
          <ModalTag
            item={itemModalDisplay}
            ModalDisplay={ModalDisplay}
            setModalDisplay={setModalDisplay}
            myOrders={myOrders}
            setmyOrders={setmyOrders}
            setTotPrice={setTotPrice}
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
                <SingelProductCart
                  key={item.id}
                  item={item}
                  ModalDisplay={ModalDisplay}
                  setModalDisplay={setModalDisplay}
                  myOrders={myOrders}
                  setmyOrders={setmyOrders}
                  setTotPrice={setTotPrice}
                  setitemModalDisplay={setitemModalDisplay}
                />
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
