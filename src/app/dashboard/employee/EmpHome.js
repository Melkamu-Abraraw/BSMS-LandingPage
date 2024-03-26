import * as React from "react";
import EmpTable from "@/components/BEmpComp/empTable";
import { BiUserPlus } from "react-icons/bi";
import EmpAdd from "@/components/BEmpComp/empAdd";

const EmpHome = () => {
  const [Visible, setVisible] = React.useState(false);

  const empAdd = () => {
    setVisible(!Visible);
  };

  return (
    <main>
      <div className="py-5 px-0 ml-1">
        <h1
          className="text-xl md:text-xl text-center font-bold py-0 text-gray-800"
          style={{ fontFamily: "initial" }}
        >
          Job-Seekers Information
        </h1>

        <div className="flex items-center gap-3 container mx-auto flex justify-end py-2">
          <button
            onClick={empAdd}
            className="flex bg-indigo-400 text-white px-2 py-2 border font-bold rounded-md hover:bg-gray-200 hover:border-indigo-500 hover:text-black"
          >
            Add{" "}
            <span className="px-1">
              <BiUserPlus size={23} />
            </span>
          </button>
        </div>
        {Visible ? <EmpAdd /> : <EmpTable />}
      </div>
    </main>
  );
};

export default EmpHome;
