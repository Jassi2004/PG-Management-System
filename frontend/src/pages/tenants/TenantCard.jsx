import React from 'react';
import '../../index.css'; // Make sure to create a CSS file for styles

const TenantCard = ({ tenant, onClick }) => {
    return (
        <div className="tenant-card" onClick={onClick}>
            <div className="tenant-avatar">
                {/* You can add an avatar image here. For example, a placeholder image */}
                <img src="https://via.placeholder.com/100" alt={`${tenant.name}'s avatar`} />
            </div>
            <h3>{tenant.name}</h3>
            <p>Email: {tenant.email}</p>
            <p>Phone: {tenant.phoneNumber}</p>
            <p>Room Number: {tenant.roomNumber}</p>
            <p>Monthly Rent: ${tenant.monthlyRent}</p>
            <p>Joined on: {new Date(tenant.dateOfJoining).toLocaleDateString()}</p>
        </div>
    );
};

export default TenantCard;
