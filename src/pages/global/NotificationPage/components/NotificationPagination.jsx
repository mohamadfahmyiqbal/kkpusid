import React from "react";
import Pagination from "../../../components/ui/Pagination";

const NotificationPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      totalItems={0}
      itemsPerPage={10}
    />
  );
};

export default NotificationPagination;
