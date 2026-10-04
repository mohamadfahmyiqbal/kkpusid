import React from 'react';
import { Table, Spinner } from 'react-bootstrap';
import Pagination from './Pagination';

export const DataTable = ({
  columns,
  data,
  isLoading,
  emptyState,
  pagination, // { currentPage, totalPages, onPageChange, totalItems, itemsPerPage }
  onRowClick,
  hover = true,
  responsive = true,
}) => {
  return (
    <div className="data-table-container">
      <div className={responsive ? "table-responsive" : ""}>
        <Table hover={hover} className="mb-0">
          <thead className="bg-light">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={col.headerClassName || ""}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="text-muted mt-2 mb-0">Memuat data...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  {emptyState || <p className="text-muted mb-0">Tidak ada data ditemukan.</p>}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                  className={onRowClick ? "hover-bg-light" : ""}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={col.cellClassName || ""}>
                      {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      
      {pagination && (
        <Pagination 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      )}
    </div>
  );
};
export default DataTable;
