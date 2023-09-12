import { useQuery, useInfiniteQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

function fetchData() {
  return axios.get("./db/products.json");
}

export function fetchAllProducts() {
  return useQuery({
    queryKey: ["searchProducts"],
    queryFn: fetchData,
    select: (data) => {
      return data.data.sort((a, b) => a.sortOrder - b.sortOrder);
    },
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
export function fetchByCategory(catOrder) {
  return useQuery({
    queryKey: ["shopProducts"],
    queryFn: fetchData,
    select: (data) => {
      return catOrder(data);
    },
  });
}
