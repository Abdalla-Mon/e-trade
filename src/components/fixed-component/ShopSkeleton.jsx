import { Skeleton } from "@mui/material";
import { DividerResponsive } from "../shop/filter/Options";

export default function ShopSkeleton() {
  return (
    <>
      <div className="layout mb-4">
        <Skeleton
          variant="text"
          sx={{ fontSize: "2rem", margin: "auto" }}
          width={60}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.1rem", margin: "auto" }}
          width={120}
        />
      </div>
      <ProductsSkeleton />
    </>
  );
}
export function ProductsSkeleton() {
  let fakeArray = [];
  for (let i = 0; i < 9; i++) {
    fakeArray.push(i);
  }
  return (
    <div className="shop-skeleton">
      <div className="container mx-auto">
        <FilterSkeleton />
        <div className="grid tab:grid-cols-2 lap:grid-cols-3 pc:grid-cols-4 gap-10">
          {fakeArray.map((e) => (
            <SingleSkeleton key={e} />
          ))}
        </div>
      </div>{" "}
    </div>
  );
}
export function SingleSkeleton() {
  return (
    <div className="product-skeleton">
      <Skeleton variant="rectangular" width={"100%"} height={200} />

      <Skeleton width="60%" height={60} />
      <Skeleton width="55%" height={40} sx={{ marginTop: "-15px" }} />
      <Skeleton width="50%" />
    </div>
  );
}
function FilterSkeleton() {
  return (
    <div className="flex gap-4 flex-col tab:flex-row my-2">
      <Skeleton width="18%" height={45} />
      <DividerResponsive />
      <Skeleton width="18%" height={45} />
      <DividerResponsive />
      <Skeleton width="18%" height={45} />
      <DividerResponsive />
      <Skeleton width="18%" height={45} />
      <DividerResponsive />
      <Skeleton width={30} height={45} />
      <Skeleton width={30} height={45} />
    </div>
  );
}
