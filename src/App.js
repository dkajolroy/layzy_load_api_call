import "./App.css";
import useSWR from "swr";
import Product from "./Product";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App() {
  const [limit, setLimit] = useState(30);
  const [store, setStore] = useState([]);
  const { product, isLoading, isError } = useUser(limit);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollHeight, clientHeight, scrollTop } =
        document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight - 5) {
        setLimit((prevNumber) => prevNumber + 10);
      }
      //  scrollHeight is ful web height
      //  clientHeight is view web hight
      //  scrollTop is current scroll height
    });
  }, []);
  useEffect(() => {
    if (product && product.products.length > 0) {
      setStore(product.products);
    }
  }, [product]);

  return (
    <div className="App">
      {store.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {store.map((item, index) => (
            <Product key={index} product={item} />
          ))}
        </div>
      ) : isLoading ? (
        <span>First Loading...</span>
      ) : (
        isError && <span>Something Error !</span>
      )}

      {/* Load More Alert */}
      {store.length > 0 && isLoading ? (
        <span
          style={{
            fontSize: "20px",
          }}
        >
          Load more product...
        </span>
      ) : null}
    </div>
  );
}

function useUser(limit) {
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/products?limit=${limit}&skip=0&select=title,price,image,thumbnail,`,
    fetcher
  );

  return {
    product: data,
    isLoading,
    isError: error,
  };
}
