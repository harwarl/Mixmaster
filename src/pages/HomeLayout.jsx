import { Outlet, Link, useNavigation } from "react-router-dom";
import { Navbar } from "../components";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? <div>Loading...</div> : <Outlet />}
      </section>
      <footer>Footer</footer>
    </>
  );
};

export default HomeLayout;
