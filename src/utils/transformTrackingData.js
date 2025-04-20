import departmentIdMap from "./departmentIdMap";

export function transformTrackingData(flatData) {
  const ordersMap = new Map();

  flatData.forEach(row => {
    const orderId = row["Order ID"];
    const deliveryDate = row["Delivery Date"];
    const status = row["Status"];
    const product = row["Product"];
    const quantity = row["Quantity Ordered"];
    const departmentName = row["Department"];
    const entry = row["Entry Timestamp"];
    const exit = row["Exit Timestamp"];
    const deptId = departmentIdMap[departmentName];

    const orderKey = `${orderId}_${deliveryDate}_${status}`;

    if (!ordersMap.has(orderKey)) {
      ordersMap.set(orderKey, {
        orderId,
        deliveryDate,
        status,
        deliverables: [],
      });
    }

    const order = ordersMap.get(orderKey);

    let deliverable = order.deliverables.find(d => d.title === product);
    if (!deliverable) {
      deliverable = {
        title: product,
        quantity,
        departments: [],
      };
      order.deliverables.push(deliverable);
    }

    if (!deliverable.departments.find(d => d.id === deptId)) {
      deliverable.departments.push({
        id: deptId,
        entry: entry || null,
        exit: exit || null,
      });
    }
  });

  // Sort departments by ID
  ordersMap.forEach(order => {
    order.deliverables.forEach(deliverable => {
      deliverable.departments.sort((a, b) => a.id - b.id);
    });
  });

  return Array.from(ordersMap.values());
}
