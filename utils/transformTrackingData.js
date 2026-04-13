import departmentIdMap from "./departmentIdMap";

export class OrderTrackingDataAdapter {
  constructor(departmentMap = departmentIdMap) {
    this.departmentMap = departmentMap;
  }

  adapt(flatData) {
    const ordersMap = new Map();

    flatData.forEach((row) => {
      const orderId = row["Order ID"];
      const deliveryDate = row["Delivery Date"];
      const status = row["Status"];
      const product = row["Product"];
      const quantity = row["Quantity Ordered"];
      const departmentName = row["Department"];
      const entry = row["Entry Timestamp"];
      const exit = row["Exit Timestamp"];
      const itemId = row["Item ID"];
      const deptId = this.departmentMap[departmentName];

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

      let deliverable = order.deliverables.find(
        (d) => d.title === product && d.itemId === itemId
      );

      if (!deliverable) {
        deliverable = {
          title: product,
          quantity,
          itemId,
          departments: [],
        };
        order.deliverables.push(deliverable);
      }

      if (!deliverable.departments.find((d) => d.id === deptId)) {
        deliverable.departments.push({
          id: deptId,
          entry: entry || null,
          exit: exit || null,
        });
      }
    });

    ordersMap.forEach((order) => {
      order.deliverables.forEach((deliverable) => {
        deliverable.departments.sort((a, b) => a.id - b.id);
      });
    });

    return Array.from(ordersMap.values());
  }
}

const trackingDataAdapter = new OrderTrackingDataAdapter();

export function transformTrackingData(flatData) {
  return trackingDataAdapter.adapt(flatData);
}