import React from "react";
import clsx from "clsx";

<<<<<<< HEAD
const departmentIcons = {
  1: "../../public/assets/factory_16492396.png",
  2: "../../public/assets/Manufacturing 2.png",
  3: "../../public/assets/processing_10614604.png",
  4: "../../public/assets/organic-material_15443661.png",
=======
const departmentIcons = { // DB?
  1: "../../public/assets/processing_10614604.png",
  2: "../../public/assets/Manufacturing 2.png",
  3: "../../public/assets/organic-material_15443661.png",
  4: "../../public/assets/Manufacturing 2.png",
>>>>>>> master
  5: "../../public/assets/Production.png",
  6: "../../public/assets/Design.png",
  7: "../../public/assets/Stitching.png",
  8: "../../public/assets/Packaging.png",
  9: "../../public/assets/Shipping.png",
};

const getStatus = (entry, exit) => {
  if (entry && exit) return "complete";
  if (entry && !exit) return "in-progress";
  return "not-started";
};

const statusStyles = {
  complete: {
    bg: "#E5FFE4",
    border: "#45F996",
  },
  "in-progress": {
    bg: "#FFF5E4",
    border: "#F9C645",
  },
  "not-started": {
    bg: "#ABADAB",
    border: "#CBC9C9",
  },
};

const DepartmentNode = ({ dept, label }) => {
  const status = getStatus(dept.entry, dept.exit);
  const styles = statusStyles[status];
  const icon = departmentIcons[dept.id];

  return (
    <div className="flex flex-col items-center min-w-[90px] text-xs text-center">
        <div
            className="w-16 h-16 rounded-full border-4 flex items-center justify-center overflow-hidden"
            style={{
            backgroundColor: styles.bg,
            borderColor: styles.border,
            }}
        >
            {icon && (
            <img src={icon} alt={label} className="w-10 h-10 object-contain" />
            )}
        </div>
        <div className="mt-1 font-medium">{label}</div>
        <div className="text-[10px] mt-0.5 text-gray-700">
            {dept.entry && <div>In: {dept.entry}</div>}
            {dept.exit && <div>Out: {dept.exit}</div>}
        </div>
        </div>

  );
};

<<<<<<< HEAD
export default DepartmentNode;
=======
export default DepartmentNode;
>>>>>>> master
