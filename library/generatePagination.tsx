export const generatePagination = function (
  currentPage: number,
  totalPages: number
): Array<number | string> {
  const pagination: Array<number | string> = [];

  // If there are less than or equal to 10 pages, show all page numbers
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i);
    }
  }
  // If there are more than 10 pages
  else {
    if (currentPage <= 5) {
      // Display page numbers from 1 to 6
      for (let i = 1; i <= 5; i++) {
        pagination.push(i);
      }
      // Add ellipsis (...) after 6
      pagination.push("...");
      // Add the last page number
      pagination.push(totalPages);
    } else if (currentPage >= totalPages - 4) {
      // Add the first page number
      pagination.push(1);
      // Add ellipsis (...) before the last 5 pages
      pagination.push("...");
      // Display page numbers from totalPages - 5 to totalPages
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      // Add the first page number
      pagination.push(1);
      // Add ellipsis (...) before the current page
      pagination.push("...");
      // Display the current page and its neighbors (2 pages on each side)
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pagination.push(i);
      }
      // Add ellipsis (...) after the current page
      pagination.push("...");
      // Add the last page number
      pagination.push(totalPages);
    }
  }

  return pagination;
};
