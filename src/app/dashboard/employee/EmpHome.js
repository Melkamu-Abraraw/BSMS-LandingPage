"use client";
import React from "react";
import { BiCheck, BiUserPlus, BiX } from "react-icons/bi";
import EmpTable from "@/components/BEmpComp/empTable";
import EmpForm from "@/components/BEmpComp/empForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "@/redux/empRedux/reducer";
import { deleteEmployee, getEmployees } from "@/data/empdata/lib/EmpHelper";

import { useQueryClient } from "react-query";
const EmpHome = () => {
  const toggleVisible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const formAndTableVisiblityHandler = () => {
    dispatch(toggleChangeAction());
  };

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteEmployee(deleteId);
      await queryClient.prefetchQuery("workers", getEmployees);
      dispatch(deleteAction(null));
    }
  };
  const cancelHandler = async () => {
    dispatch(deleteAction(null));
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

        <div className="flex  items-center gap-3 container mx-auto flex justify-end py-2">
          <button
            onClick={formAndTableVisiblityHandler}
            className="flex bg-indigo-400 text-white px-2 py-2 border font-bold rounded-md hover:bg-gray-200 hover:border-indigo-500 hover:text-black"
          >
            {toggleVisible ? "Close" : "Add"}{" "}
            <span className="px-1">
              {toggleVisible ? <BiX size={23} /> : <BiUserPlus size={23} />}
            </span>
          </button>
        </div>
        <div className="flex justify-center mb-5">
          {deleteId ? DeleteComponent({ deleteHandler, cancelHandler }) : <></>}
        </div>

        <div> {toggleVisible ? <EmpForm /> : <EmpTable />}</div>
      </div>
    </main>
  );
};
export default EmpHome;
function DeleteComponent({ deleteHandler, cancelHandler }) {
  return (
    <div className="flex gap-5">
      <p>Are You Sure To Delete This Employee?</p>
      <button
        onClick={deleteHandler}
        className="flex bg-red-400 text-white px-2 py-1 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes{" "}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255" size={20}></BiCheck>
        </span>
      </button>
      <button
        onClick={cancelHandler}
        className="flex bg-gray-400 text-white px-2 py-1 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50"
      >
        No{" "}
        <span className="px-1">
          <BiX color="rgb(255 255 255" size={20}></BiX>
        </span>
      </button>
    </div>
  );
}
