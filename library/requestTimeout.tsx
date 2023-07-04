export const requestTimeout = (secToCancel: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout. Check your internet connectivity"));
    }, secToCancel * 1000);
  });
};
