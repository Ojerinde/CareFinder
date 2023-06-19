import { v4 as uuidv4 } from "uuid";

// Generate a unique ID
export const generateUniqueIdentifier = () => {
  const uniqueId = uuidv4();
  return uniqueId;
};
