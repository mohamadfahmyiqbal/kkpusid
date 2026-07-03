import React from "react";
import { Form } from "react-bootstrap";
import { MdSearch } from "react-icons/md";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  tabCounts
}) => {
  return (
    <div className="bg-white rounded-4 p-3 shadow-sm border-light-1">
      <div className="d-flex flex-column gap-3">
        {/* Search Input */}
        <div className="search-wrapper">
          <MdSearch size={22} className="search-icon text-muted" />
          <Form.Control
            type="text"
            placeholder="Cari deskripsi atau tipe transaksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input border-0 py-2 ps-5 rounded-3 bg-light-soft"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="filter-tabs d-flex align-items-center gap-2 overflow-x-auto pb-1">
          <button 
            onClick={() => setActiveTab("all")}
            className={`filter-tab-btn ${activeTab === "all" ? 'active' : ''}`}
          >
            Semua
            <span className="tab-badge">{tabCounts.all}</span>
          </button>
          <button 
            onClick={() => setActiveTab("active")}
            className={`filter-tab-btn ${activeTab === "active" ? 'active' : ''}`}
          >
            Berjalan
            <span className="tab-badge">{tabCounts.active}</span>
          </button>
          <button 
            onClick={() => setActiveTab("completed")}
            className={`filter-tab-btn ${activeTab === "completed" ? 'active' : ''}`}
          >
            Selesai
            <span className="tab-badge">{tabCounts.completed}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
