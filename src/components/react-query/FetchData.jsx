import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchData() {
  return axios.get("./db/products.json");
}

export function fetchAllProducts(filterType, filterName, sortType) {
  return useQuery({
    queryKey: ["searchProducts"],
    queryFn: fetchData,
    select: (data) => {
      return filter(sortData(data.data, sortType), filterType, filterName);
    },
  });
}
function filter(data, filterType, filterName) {
  return data.filter((e) => e[filterType] === filterName);
}
function sortData(data, type) {
  if (type === "Low to high price") {
    return data.sort((a, b) => a.price - b.price);
  } else if (type === "High to low price") {
    return data.sort((a, b) => b.price - a.price);
  } else if (type === "Z-A Sort") {
    return data
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .reverse();
  } else if (type === "A-Z Sort") {
    return data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  return data.sort((a, b) => a.sortOrder - b.sortOrder);
}
export function fetchSearchProducts(el) {
  return useQuery({
    queryKey: ["searchProducts"],
    queryFn: fetchData,
    select: (data) => {
      return data.data.filter((e) => e.name.includes(el));
    },
    keepPreviousData: true,
  });
}
