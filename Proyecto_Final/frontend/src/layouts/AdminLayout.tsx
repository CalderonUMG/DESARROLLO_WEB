// src/layouts/AdminLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <NavbarAdmin tipo="admin" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
