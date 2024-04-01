import { NextPage } from "next";
import DaoNavbar from "../components/DaoNavbar";
import NewProposal from "../components/NewProposal";
import CustomComponent from "../components/CustomComponent";

const DAO: NextPage = () => {
  return (
    <>
        <DaoNavbar />
        <NewProposal />
        <div className="p-4">
        <CustomComponent />
      </div>
    </>
  );
};

export default DAO;
