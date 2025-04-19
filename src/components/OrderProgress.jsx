import { useState } from "react";
import DepartmentNode from "./DepartmentNode";

const OrderProgress = ({ deliverable }) => {
  const departmentLabels = {
    1: "Manufacturing 1",
    2: "Manufacturing 2",
    3: "Raw Material 1",
    4: "Raw Material 2",
    5: "Production",
    6: "Design",
    7: "Stitching",
    8: "Packaging",
    9: "Shipping",
  };

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
