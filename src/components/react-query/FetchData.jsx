import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function fetchData() {
  return axios.get("./db/products.json");
}

export function fetchAllProducts(
  filterType,
  filterName,
  sortType,
  minPrice,
  maxPrice
) {
  return useQuery({
    queryKey: ["AllProducts"],
    queryFn: fetchData,

    select: (data) => {
      return filter(
        sortData(data.data, sortType),
        filterType,
        filterName,
        minPrice,
        maxPrice
      );
    },
  });
}
function filter(data, filterType, filterName, minPrice, maxPrice) {
  if (minPrice) {
    return data
      .filter((e) => e[filterType] === filterName)
      .filter((el) => {
        return el.price >= minPrice && el.price <= maxPrice;
      });
  }
  return data.filter((e) => e[filterType] === filterName);
}
function sortData(data, type) {
  if (type === "Low to high price") {
    return sortPrice(data);
  } else if (type === "High to low price") {
    return sortPrice(data).reverse();
  } else if (type === "Z-A Sort") {
    return sortAlpha(data).reverse();
  } else if (type === "A-Z Sort") {
    return sortAlpha(data);
  }
  return data.sort((a, b) => a.sortOrder - b.sortOrder);
}
function sortPrice(data) {
  return data.sort((a, b) => a.price - b.price);
}
function sortAlpha(data) {
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
export function fetchSingleProduct(id) {
  return useQuery({
    queryKey: ["sindleProduct"],
    queryFn: fetchData,
    select: (data) => {
      return data.data.find((e) => e.id === id);
    },
    keepPreviousData: true,
    // initialData: () => {
    //   // Use a todo from the 'todos' query as the initial data for this todo query
    //   return queryClient
    //     .getQueryData("searchProducts")
    //     ?.find((d) => d.id === productId);
    // },
  });
}
export function getRelatedProducts(el) {
  return useQuery({
    queryKey: ["sindleProduct"],
    queryFn: fetchData,
    select: (data) => {
      return data.data.filter((e) => e.cat === el.cat);
    },
    keepPreviousData: true,
    enabled: !!el,
  });
}
