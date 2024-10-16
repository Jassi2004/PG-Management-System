// src/tenants/TenantGrid.jsx
import React from 'react';
import TenantCard from './TenantCard';

const TenantGrid = ({ tenants }) => {
    return (
        <div className="tenant-grid">
            {tenants.map((tenant) => (
                <TenantCard key={tenant._id} tenant={tenant} />
            ))}
        </div>
    );
};

export default TenantGrid;
