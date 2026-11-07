import React from "react";
import { FaUser, FaUniversity, FaBriefcase, FaUserFriends } from "react-icons/fa";

export const EDIT_PROFILE_TABS = [
  { key: "pribadi", label: "Pribadi & Alamat", icon: FaUser },
  { key: "bank", label: "Rekening Bank", icon: FaUniversity },
  { key: "pekerjaan", label: "Pekerjaan", icon: FaBriefcase },
  { key: "darurat", label: "Kontak Darurat", icon: FaUserFriends },
];

export default function EditProfileNavTabs({ activeTab, onTabSelect }) {
  return (
    <div className="d-flex ap-modal-tabs px-4 pt-3 bg-light border-bottom">
      {EDIT_PROFILE_TABS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          className={`ap-modal-tab-btn ${activeTab === key ? "active" : ""}`}
          onClick={() => onTabSelect(key)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
