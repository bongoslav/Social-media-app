import { useRouteError } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function ErrorPage() {
  const error: any = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <Navigation />
      <p>{message}</p>
    </>
  );
}

export default ErrorPage;
