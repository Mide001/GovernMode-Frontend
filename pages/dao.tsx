import { NextPage } from "next";
import DaoNavbar from "../components/DaoNavbar";
import CustomComponent from "../components/CustomComponent";
import Footer from "../components/Footer";

const DAO: NextPage = () => {
  return (
    <>
      <DaoNavbar />
      <div className="p-4">
        <CustomComponent />
      </div>
      <Footer />
    </>
  );
};

export default DAO;
