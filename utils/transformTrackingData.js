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
    const tagUID = row["Tag UID"];
    const itemId = row["Item ID"]; // Use Item ID from your new function
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

    // Identify unique deliverable by both product and item ID (not tag UID anymore)
    let deliverable = order.deliverables.find(
      d => d.title === product && d.itemId === itemId // Match on item ID
    );

    if (!deliverable) {
      deliverable = {
        title: product,
        quantity,
        itemId, // Store item ID
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