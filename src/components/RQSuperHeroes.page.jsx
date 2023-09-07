import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function fetchSuperHeroes() {
  return axios.get("http://localhost:4000/superheroes");
}
export const RQSuperHeroesPage = () => {
  const results = useQuery(["super-heroes"], fetchSuperHeroes);
  const { isLoading, data } = results;

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map((e) => {
        return <p key={e.name}>{e.name}</p>;
      })}
    </>
  );
};
