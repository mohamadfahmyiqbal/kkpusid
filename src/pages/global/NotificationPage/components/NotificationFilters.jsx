import React, { useState } from "react";
import {
  Form,
  InputGroup,
  Dropdown,
  Badge,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaTag,
  FaEnvelope,
} from "react-icons/fa";
import { useNotificationFeatures } from "../hooks/useNotificationFeatures";

const NotificationFilters = ({
  searchTerm,
  filterType,
  selectedCategory,
  availableCategories,
  onSearchChange,
  onFilterTypeChange,
  onCategoryChange,
  onClearFilters,
  activeFiltersCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const features = useNotificationFeatures();

  // Configuration constants (moved here to avoid circular dependency)
  const FILTER_OPTIONS = [
    { value: "all", label: "Semua" },
    { value: "unread", label: "Belum Dibaca" },
    { value: "read", label: "Sudah Dibaca" },
  ];

  const TYPE_LABELS = {
    transaction: "Transaksi",
    payment: "Pembayaran",
    system: "Sistem",
    promotion: "Promosi",
    reminder: "Pengingat",
    announcement: "Pengumuman",
  };

  if (!features.filter && !features.search) {
    return null;
  }

  return (
    <div className="notification-filters mb-3">
      <Row className="g-3 align-items-end">
        {/* Search Bar */}
        {features.search && (
          <Col md={showFilters ? 6 : 12}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cari notifikasi..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="notification-search"
              />
              {searchTerm && (
                <Button
                  variant="outline-secondary"
                  onClick={() => onSearchChange("")}
                  size="sm"
                >
                  <FaTimes />
                </Button>
              )}
            </InputGroup>
          </Col>
        )}

        {/* Filter Toggle Button */}
        {features.filter && (
          <Col md="auto">
            <Dropdown show={showFilters} onToggle={setShowFilters}>
              <Dropdown.Toggle
                variant="outline-primary"
                size="sm"
                className="notification-filter-toggle"
              >
                <FaFilter className="me-1" />
                Filter
                {activeFiltersCount > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="notification-filter-menu p-3"
                style={{ minWidth: "280px" }}
              >
                <div className="mb-3">
                  <h6 className="mb-2">
                    <FaEnvelope className="me-1" />
                    Status
                  </h6>
                  {FILTER_OPTIONS.map((option) => (
                    <Form.Check
                      key={option.value}
                      type="radio"
                      id={`filter-${option.value}`}
                      label={option.label}
                      name="filterType"
                      value={option.value}
                      checked={filterType === option.value}
                      onChange={(e) => onFilterTypeChange(e.target.value)}
                      className="mb-2"
                    />
                  ))}
                </div>

                {features.categories && availableCategories.length > 0 && (
                  <div className="mb-3">
                    <h6 className="mb-2">
                      <FaTag className="me-1" />
                      Kategori
                    </h6>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => onCategoryChange(e.target.value)}
                      size="sm"
                    >
                      <option value="all">Semua Kategori</option>
                      {availableCategories.map((category) => (
                        <option key={category} value={category}>
                          {TYPE_LABELS[category] || category}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                )}

                {activeFiltersCount > 0 && (
                  <div className="d-grid">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={onClearFilters}
                    >
                      <FaTimes className="me-1" />
                      Hapus Filter
                    </Button>
                  </div>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        )}
      </Row>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="active-filters mt-2">
          <small className="text-muted">
            Filter aktif: {activeFiltersCount}
          </small>
        </div>
      )}
    </div>
  );
};

export default NotificationFilters;
