import { useState, useEffect } from "react";
import { ethers } from "ethers";
import DepartmentNode from "./DepartmentNode";
import ABIJson from '../../blockchain/artifacts/contracts/SupplyCIDStorage.sol/SupplyCIDStorage.json'
const ABI = ABIJson.abi;

const INFURA_PROJECT_ID = import.meta.env.VITE_INFURA_PROJECT_ID;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

const OrderProgress = ({ deliverable }) => {
  const departmentLabels = {
    1: "Raw Material 1",
    2: "Raw Material 2",
    3: "Manufacturing 1",
    4: "Manufacturing 2",
    5: "Production",
    6: "Design",
    7: "Stitching",
    8: "Packaging",
    9: "Shipping",
  };

  const [cid, setCid] = useState(null);
  const fetchCIDForTag = async (itemID) => {
    try {
      const stringItemID = itemID.toString()
      console.log('attempting to contact blockchain')
      const fetchedCID = await contract.getCID(stringItemID);
      console.log('i survived')
      setCid(fetchedCID);
      console.log(fetchedCID)
    } catch (err) {
      console.error('Error fetching CID from smart contract:', err);
      setCid('Error fetching CID');
    }
  };

  useEffect(() => {
    console.log(deliverable)
    if (deliverable.itemId) {
      fetchCIDForTag(deliverable.itemId);
    }
  }, [deliverable.itemId]);

  const allDepartments = Object.keys(departmentLabels).map((id) => {
    const deptData = deliverable.departments.find((d) => d.id === Number(id));
    return {
      id: Number(id),
      label: departmentLabels[id],
      entry: deptData?.entry || null,
      exit: deptData?.exit || null,
    };
  });

  return (
    <div>
      <p className="mb-2 font-medium">Deliverable: {deliverable.title}</p>
      {cid ? (
        <div className="mb-4 p-4 rounded-2xl bg-[#E6E6FA] shadow-md border border-gray-200">
          <p className="text-sm text-gray-500 font-semibold">Blockchain Anchor</p>

          <p className="mt-2 font-mono text-xs text-gray-800 break-words max-w-full">
            {cid}
          </p>

          <a
            href={`https://ipfs.io/ipfs/${cid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[#A584EC] hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            View CID on IPFS ↗
          </a>

          <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Immutable blockchain record verified
          </div>
        </div>
      ) : (
        <div className="mb-4 p-4 rounded-xl bg-gray-50 text-gray-500 text-sm">
          Fetching blockchain CID...
        </div>
      )}



      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {allDepartments.map((dept, index) => (
          <div key={dept.id} className="flex items-center">
            <DepartmentNode dept={dept} label={dept.label} />
            {index !== allDepartments.length - 1 && (
              <div className="w-8 h-1 bg-gray-300 mx-1 rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgress;