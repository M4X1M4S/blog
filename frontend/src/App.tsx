import GetStarted from "./components/GetStarted";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <GetStarted />,
  },
  {
    path: "error",
    element: <ErrorPage />,
  },
]);

const App = () => <RouterProvider router={appRouter} />;

export default App;
