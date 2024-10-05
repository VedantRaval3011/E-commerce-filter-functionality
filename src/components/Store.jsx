"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }

  useEffect(() => {
    filterProducts();
  },[minPrice,maxPrice,category,searchQuery])

  const filterProducts = () => {
    let filter = products.filter((product) => {
      const matchesCategory = category? category === product.category : true;
      const matchesPrice = product.price>= (minPrice || 0) && product.price<(maxPrice || Infinity);
      const matchesSearch = product.title.toLowerCase().includes( searchQuery.toLowerCase() )

      return matchesCategory && matchesPrice && matchesSearch;
    })
    setFilteredProducts(filter);
  }

  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        {" "}
        <input
          type="text"
          className="p-2 text-center text-black"
          placeholder="Find Your Product Here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />{" "}
      </div>
      <div>
        <div className="flex gap-10 justify-around" >
          <button onClick={ () => setCategory('men\'s clothing')} >men's clothing</button>
          <button onClick={ () => setCategory('women\'s clothing')}>women's clothing</button>
          <button onClick={ () => setCategory('electronics')}>electronics</button>
          <button onClick={ () => setCategory('jewelery')}>jwellery</button>
        </div>
      </div>
      <div className="flex gap-3 justify-around mt-10">
        
        <div>
          <input type="text" placeholder="Min Price" className="text-black text-center" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder="Max Price" className="text-black text-center" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border-green-100 border-2 flex flex-col gap-3 items-center px-3">
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.title}
              objectFit="cover"
              className="h-[200px]  "
            />
            <div className="rounded-xl w-32 ml-2 bg-yellow-300 text-black flex items-center justify-center">
              {" "}
              {product.category}{" "}
            </div>
            <h1> {product.title} </h1>
            <p> {product.price} $ </p>
            <p>
              Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
