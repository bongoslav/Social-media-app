import { Outlet } from "react-router-dom";
import MainNavigation from "../components/mainNavigation";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
