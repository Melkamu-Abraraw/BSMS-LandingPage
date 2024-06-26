import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import Rate from "../Rating/Rate";
import "./property.css";

const Home = ({ property }) => {
  const propertyValues = { ...property };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-4 mt-7 w-806  gap-1">
      <div
        key={property.id}
        className="max-w-sm mx-auto rounded-md shadow-md overflow-hidden relative card bg-slate-400"
      >
        <div className="relative h-52 w-70 group">
          <Image
            src={propertyValues.imageUrls[0]}
            alt={propertyValues.Description}
            width={400}
            height={400}
            className="rounded-t-md box-border mb-4"
          />
          <div className="status-overlay">
            <div className="mt-1 text-darkBlue">For Sale</div>
          </div>
          <div className="price-overlay ">
            <div className="mx-1">
              <h2 className="green-color rounded text-green px-2 font-bold">
                ETB 45,000,000
              </h2>
            </div>
          </div>
          <button className="hidden bg-green btn-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:block hover:bg-white hover:text-black p-2 rounded text-white text-sm">
            View Property
          </button>
        </div>
        <div className="mt-14 text-left ">
          <h3 className="text-darkBlue ml-4 mb-1">B+G+2</h3>
          <div className="text-sm  text-darkBlue ml-4 flex flex-row justify-between ">
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              <a className="px-0 ml-1 text-green  ">Addis Abeba</a>
            </div>
            <Rate />
          </div>
        </div>
        <div className="mt-2 bg-slate-200 pt-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col text-darkBlue ml-4">
              <p className="text-gray-600">Bedrooms</p>
              <div className="flex flex-row justify-start ">
                <FontAwesomeIcon icon={faBed} className="mt-1 " />
                <span className="ml-2 mb-3">1</span>
              </div>
            </div>
            <div className="flex flex-col text-darkBlue ml-4">
              <p className="text-gray-600">Bathrooms</p>
              <div className="flex flex-row justify-start ">
                <FontAwesomeIcon icon={faRestroom} className="mt-1 " />
                <span className="ml-2 mb-3">2</span>
              </div>
            </div>
            <div className="flex flex-col text-darkBlue ml-4">
              <p className="text-gray-600">Area</p>
              <div className="flex flex-row justify-start mt-1">
                <svg
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="20px"
                  height="17px"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                >
                  <g>
                    <circle cx="2" cy="2" r="2"></circle>
                  </g>
                  <g>
                    <circle cx="2" cy="22" r="2"></circle>
                  </g>
                  <g>
                    <circle cx="22" cy="2" r="2"></circle>
                  </g>
                  <rect x="1" y="1" width="2" height="22"></rect>
                  <rect x="1" y="1" width="22" height="2"></rect>
                  <path
                    opacity="0.5"
                    d="M23,20.277V1h-2v19.277C20.7,20.452,20.452,20.7,20.277,21H1v2h19.277c0.347,0.596,0.984,1,1.723,1 c1.104,0,2-0.896,2-2C24,21.262,23.596,20.624,23,20.277z"
                  ></path>
                </svg>
                <span className="ml-2 mb-4 pr-2 pb-1">1000 sq/metre</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-row justify-between">
          <p className="ml-4 mt-4 text-darkBlue text-sm">
            Published 2 days ago
          </p>
          <div className="flex flex-row justify-start">
            <div className="relative rounded-full overflow-hidden h-16 w-16">
              <Image
                src={propertyValues.imageUrls[0]}
                alt={propertyValues.Description}
                height={200}
                width={200}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start text-darkBlue mt-1 mb-3 ml-3 pr-2">
              <p>Agent</p>
              <p>Melkamu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
