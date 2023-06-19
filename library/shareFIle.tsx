import { CSV } from "@/store/AppContext";

const convertToCSV = function (data: object[]): string {
  //   Get all the keys present on an object which will be the same all througout.
  const titles = Object.keys(data[0]);
  let csvRow = [];
  //   Store the column header first
  csvRow.push(titles);

  //   Storing the values of each hospital
  data.forEach((item) => {
    csvRow.push(Object.values(item));
  });

  //   Converting the array of arrays into csv
  let csvContents = "";
  csvRow.forEach((row) => {
    csvContents += row.join(",") + "\n";
  });
  return csvContents;
};

// Function to download CSV
export const downloadCSV = function (
  filename: string,
  selectedHospitals: CSV[]
) {
  if (selectedHospitals.length < 1) {
    throw new Error("You haven't selected any hospital");
  }
  const modifiedSelectedHospitals = selectedHospitals.map((hos) => ({
    ...hos,
    address: hos.address.replaceAll(",", " "),
  }));
  const csvContent = convertToCSV(modifiedSelectedHospitals);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);

  return "Downloading";
};

export const shareCSVByEmail = async function (
  to: string | null | undefined,
  subject: string,
  body: string,
  selectedHospitals: CSV[]
) {
  if (selectedHospitals.length < 1) {
    throw new Error("You haven't selected any hospital");
  }

  const csvContent = convertToCSV(selectedHospitals);
  const response = await fetch("/api/shareViaEmail", {
    method: "POST",
    body: JSON.stringify({ to, subject, body, csvContent }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};
