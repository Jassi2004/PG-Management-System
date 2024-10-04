import React from 'react';
import TenantCard from './TenantCard';
import '../../index.css'; // Create a CSS file for styles

const TenantGrid = ({ tenants }) => {
    return (
        <div className="tenant-grid">
            {tenants.map(tenant => (
                <TenantCard 
                    key={tenant._id} 
                    tenant={tenant} 
                    onClick={() => console.log(`Navigate to profile of ${tenant.name}`)} // Replace with your navigation logic
                />
            ))}
        </div>
    );
};

export default TenantGrid;
