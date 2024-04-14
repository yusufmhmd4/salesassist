import React from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import {  MdCurrencyRupee } from "react-icons/md";
import {  CiBookmark } from "react-icons/ci";
import "./index.css"





function ProductItem({product}) {
  const actualPrice = Math.round(
    product.price - product.price * (product.discountPercentage / 100)
  );
  const offerPrice = Math.round(product.price - actualPrice);
  const offerPercentage = Math.round((offerPrice / product.price) * 100);

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
          <span className="offer-percentage">( {offerPercentage} % )</span>
        </div>

        <span>
          <TbShoppingBagPlus className="add-bag-icon" />
        </span>
      </div>
      <CiBookmark className="nav-icon bookmark" />
    </li>
  );
}

export default ProductItem;
