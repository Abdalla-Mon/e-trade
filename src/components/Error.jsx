import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <>
          <div>This page doesn't exist!</div>
          <Link to="/"> back to home?</Link>
        </>
      );
    }

    if (error.status === 401) {
      return (
        <>
          {" "}
          <div>You aren't authorized to see this</div>
          <Link to="/"> back to home?</Link>
        </>
      );
    }

    if (error.status === 503) {
      return (
        <>
          <div>Looks like our API is down</div>;
          <Link to="/"> back to home?</Link>
        </>
      );
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return (
    <>
      <div>Something went wrong</div>;<Link to="/"> back to home?</Link>
    </>
  );
}

export default RootBoundary;
