import { useState , useEffect } from "react";

const ETHprice = (props) => {

    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch("https://api.exir.io/v1/ticker?symbol=eth-irt")
        .then((res) => res.json())
        .then((data) => {        
          setPrice(data.last); 
          setLoading(false);       
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
        <span className="eth-price">{loading ? "LOADING" : "1 ETH = " + price + " Toman"}</span>
    );
  };

    export default ETHprice;