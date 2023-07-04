import { filterHospitalByName } from "@/library/filters";

describe("filterHospitalByName", () => {
  const allHospitals: any[] = [
    { hospitalName: "Hospital A" },
    { hospitalName: "Hospital B" },
    { hospitalName: "Hospital C" },
  ];

  it("filters hospitals by name", () => {
    const filteredArray = filterHospitalByName(allHospitals, "B");

    // Calling the function being tested
    const result = filterHospitalByName(allHospitals, "B");

    // Asserting the result
    expect(result).to.deep.equal(filteredArray);
  });
});
