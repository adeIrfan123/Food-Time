import { useEffect, useState } from "react";

export const useCount = () => {
  const [count, setCount] = useState(1); // Default minimum 1
  const [inputValue, setInputValue] = useState("1");

  useEffect(() => {
    setInputValue(count.toString()); // Pastikan input string
  }, [count]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setInputValue(""); // Biar input bisa kosong sebentar
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      if (parsed >= 1) {
        setCount(parsed);
      }
    }
  };

  return {
    count,
    inputValue,
    handleDecrement,
    handleIncrement,
    handleInputChange,
  };
};
