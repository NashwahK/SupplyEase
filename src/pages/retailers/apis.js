export const generatePayFastUrl = async (amount, itemName) => {
  const baseURL = "sandbox.payfast.co.za";
  const params = new URLSearchParams({
    merchant_id: "10038119",
    merchant_key: "lfagxz2ah6qvr",
    amount: amount,
    item_name: itemName,
    return_url: "https://e343-223-123-119-34.ngrok-free.app/rlandingpage",
    cancel_url: "https://example.com/onCancel"
  });

  try {
    const url = `https://${baseURL}/eng/process?${params.toString()}`;
    console.log("Generated PayFast URL:", url);
    return url;
  } catch (error) {
    console.error("Error generating PayFast URL:", error);
    return "";
  }
};

  