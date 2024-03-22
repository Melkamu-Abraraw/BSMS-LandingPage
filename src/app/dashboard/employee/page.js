"use client";
import Head from "next/head";
import Header from "@/components/Header";
import Layout from "@/components/layout";
import EmpTable from "@/components/BEmpComp/empTable";
import EmpForm from "@/components/BEmpComp/empForm";
import { BiUserPlus } from "react-icons/bi";
import { useState } from "react";

function Homepage() {
  const [visible, setVisisble] = useState(false);

  const handler = () => {
    setVisisble(!visible);
  };
  return (
    <>
      <Head>
        <title>BSMS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex ">
          <main className="bg-gray-100 min-h-screen flex-grow ml-60">
            <Header />
            <div className="py-5 px-0 ml-3">
              <h1
                className="text-xl md:text-xl text-center font-bold py-2 text-gray-800"
                style={{ fontFamily: "initial" }}
              >
                Job-Seekers Management Page
              </h1>

              <div className="flex items-center gap-3 container mx-auto flex justify-end py-2">
                <button
                  onClick={handler}
                  className="flex bg-indigo-400 text-white px-2 py-2 border font-bold rounded-md hover:bg-gray-200 hover:border-indigo-500 hover:text-black"
                >
                  Add{" "}
                  <span className="px-1">
                    <BiUserPlus size={23} />
                  </span>
                </button>
              </div>

              {visible ? <EmpForm /> : <></>}

              <div>
                <EmpTable/>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}
export default Homepage;
