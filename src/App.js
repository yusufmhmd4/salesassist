import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { CiUser, CiBookmark } from "react-icons/ci";
import { MdOutlineShoppingBag ,MdCurrencyRupee} from "react-icons/md";
import { TbShoppingBagPlus } from "react-icons/tb";


import categoryList from "./categoryList"


import "./App.css";


function App() {
  const [activeTabIcon, setActiveTabIcon] = useState(categoryList[0].id);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function getProductData() {
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=100");
        const { products } = response.data;
        const filteredData = products.filter((product) => product.category === activeTabIcon);
        setProductData(filteredData);
      } catch (error) {
        console.error("Error fetching product data:", error);

      }
    }
    getProductData();
  }, [activeTabIcon]);
  console.log(productData);

  return (
    <div className="app-container">
      <header>
        <nav>
          <h1 className="title">TANN TRIM</h1>
          <ul className="nav-icons-container">
            <li>
              <IoIosSearch className="nav-icon" />
            </li>
            <li>
              <CiUser className="nav-icon" />
            </li>
            <li>
              <CiBookmark className="nav-icon" />
            </li>
            <li>
              <MdOutlineShoppingBag className="nav-icon" />
            </li>
          </ul>
        </nav>
        <ul className="nav-links-container">
          <li className="nav-link">Bags</li>
          <li className="nav-link">Travel</li>
          <li className="nav-link">Accessories</li>
          <li className="nav-link">Gifting</li>
          <li className="nav-link">Jewelery</li>
        </ul>
      </header>
      <ul className="active-tab-icon-container">
        {categoryList.map((tab) => (
          <li
            key={tab.id}
            className={
              activeTabIcon === tab.id ? "tab-item active" : "tab-item"
            }
            onClick={() => setActiveTabIcon(tab.id)}
          >
            {tab.icon}
          </li>
        ))}
      </ul>
      <ul className="product-list-container">
        {productData.map((product) => {
          const actualPrice = Math.round(
            product.price - product.price * (product.discountPercentage / 100)
          );
          const offerPrice = Math.round(product.price - actualPrice);
          const offerPercentage = Math.round(
            (offerPrice / product.price) * 100
          );

          return (
            <li className="product-item" key={product.id}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <div className="product-title">{product.title}</div>
              <div className="product-price-container">
                <div>
                  <span className="actual-price">
                    <MdCurrencyRupee /> {actualPrice}
                  </span>
                  <span className="offer-price">{offerPrice}</span>
                  <span className="offer-percentage">
                    ( {offerPercentage} % )
                  </span>
                </div>

                <span>
                  <TbShoppingBagPlus className="add-bag-icon" />
                </span>
              </div>
              <CiBookmark className="nav-icon bookmark" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
