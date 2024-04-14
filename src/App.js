import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { CiUser, CiBookmark } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import ProductItem from "./components/ProductItem";
import { TailSpin } from "react-loader-spinner";

import categoryList from "./categoryList";

import "./App.css";

function App() {
  const [activeTabIcon, setActiveTabIcon] = useState(categoryList[0].id);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProductData() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        const { products } = response.data;
        const filteredData = products.filter(
          (product) => product.category === activeTabIcon
        );
        setIsLoading(false);
        setProductData(filteredData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    getProductData();
  }, [activeTabIcon]);
  console.log(productData);

  const reactLoader = ()=>(
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#fff"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      className="loader"
    />
  );

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
        {isLoading
          ? reactLoader()
          : productData.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
      </ul>
    </div>
  );
}

export default App;
