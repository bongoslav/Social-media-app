import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import { loader as postsLoader } from "./loaders/postsLoader";

// TODO:
// add Home(posts), Login, Register, Profile pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "posts",
        element: <HomePage />,
        loader: postsLoader,
        children: [
          { path: "create" },
          { path: ":postId/like" },
          { path: "add-comment/:postId" },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
