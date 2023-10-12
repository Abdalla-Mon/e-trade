import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";

export async function fetchData() {
  try {
    const docRef = doc(db, "Data", "shop_data");
    const data = await getDoc(docRef);
    if (data.data().data.length < 10 || !data.data().data) {
      let alterniveData = await handleError();
      const dataObj = { data: await alterniveData };
      return dataObj;
    }
    return data.data();
  } catch (e) {
    let alterniveData = await handleError();
    const dataObj = { data: await alterniveData };
    return dataObj;
  }
}

async function handleError() {
  let data = await axios.get("./db/products.json");
  data = await data.data.sort((a, b) => a.sortOrder - b.sortOrder);
  data = await data.map((e, index) => {
    e.sortOrder = index;
    e.stock = true;
    return e;
  });

  const docData = await setDoc(doc(db, "Data", "shop_data"), {
    data: data,
  });
  return data;
}
export function getHomeData(selector) {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: fetchData,
    select: (data) => {
      let homeData = data.data.filter((e) => e.home);
      return selector(homeData);
    },
    keepPreviousData: true,
  });
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
      if (filterType === "fromDash") {
        const sortedData = sortData(data.data, "default");
        return sortedData;
      }
      const sortedData = sortData(data.data, sortType);
      const filteredData = filter(
        sortedData,
        filterType,
        filterName,
        minPrice,
        maxPrice
      );
      return filteredData;
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
  switch (type) {
    case "Low to high price": {
      return sortPrice(data);
    }
    case "High to low price": {
      return sortPrice(data).reverse();
    }
    case "A-Z Sort": {
      return sortAlphapitcal(data);
    }
    case "Z-A Sort": {
      return sortAlphapitcal(data).reverse();
    }
    default: {
      return data.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  }
}
function sortPrice(data) {
  return data.sort((a, b) => a.price - b.price);
}
function sortAlphapitcal(data) {
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
      return data.data
        .filter((e) => e.name.includes(el))
        .sort((a, b) => a.sortOrder - b.sortOrder);
    },
    keepPreviousData: true,
  });
}
export function fetchSingleProduct(id) {
  return useQuery({
    queryKey: ["singleProduct"],
    queryFn: fetchData,
    select: (data) => {
      return data.data.find((e) => e.id === id);
    },
    keepPreviousData: true,
  });
}
export function getRelatedProducts(el) {
  return useQuery({
    queryKey: ["related"],
    queryFn: fetchData,
    select: (data) => {
      return data.data.filter((e) => e.cat === el.cat && e.id !== el.id);
    },
    keepPreviousData: true,
    enabled: !!el,
  });
}
async function getCategeroiesData() {
  try {
    const docRef = doc(db, "Data", "categories");

    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e);
  }
}
export function getCategeroies() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategeroiesData,
  });
}

//  post requsets

// async function deleteOldImg(imgName) {
//   const { error } = await supabase.storage
//     .from("products_images")
//     .remove([imgName]);
//   return error;
// }
// export async function uploadNewImgAndGetImgUrl(data) {
//   const deleteError = await deleteOldImg(data.imgName);
//   const { data: done, error } = await supabase.storage
//     .from("products_images")
//     .upload(data.imgName, data.avaterFile);
//   const gettingImgUrl = await getImageUrl(done.path);
//   return gettingImgUrl;
// }
// async function getImageUrl(imgName) {
//   const { data, error } = await supabase.storage
//     .from("products_images")
//     .createSignedUrl(imgName, 365 * 24 * 60 * 60 * 10);
//   return data.signedUrl;
// }
// export function uploadNewImgQuery() {
//   return useMutation(uploadNewImgAndGetImgUrl);
// }
