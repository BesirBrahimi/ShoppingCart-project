import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { ExternalProducts } from "./ShoppingCart";

interface IPagination {
  handlePageChange: (direction: "left" | "right" | number) => void;
  currentPage: number;
  filteredProducts: ExternalProducts[];
  productsPerPage: number;
}

const Pagination: React.FC<IPagination> = ({
  handlePageChange,
  currentPage,
  filteredProducts,
  productsPerPage,
}) => {
  return (
    <div className="pagination">
      <div
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange("left")}
      >
        <AiOutlineArrowLeft />
      </div>
      {Array.from({
        length: Math.ceil(filteredProducts.length / productsPerPage),
      }).map((_, index) => (
        <button
          key={index}
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <div
        className={`page-item ${
          currentPage === Math.ceil(filteredProducts.length / productsPerPage)
            ? "disabled"
            : ""
        }`}
        onClick={() => handlePageChange("right")}
      >
        <AiOutlineArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
