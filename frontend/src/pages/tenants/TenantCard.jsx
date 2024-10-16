// src/tenants/TenantCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css'; // Ensure this file has styles for your modal as well
import './TenantCard.css'; // Import CSS for flashing effect

const TenantCard = ({ tenant }) => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Handle click to navigate to tenant profile page
    const handleClick = () => {
        navigate(`/admin/tenant/${tenant._id}`); // Change URL to match the route
    };

    // Calculate overdue days
    const today = new Date();
    const overdueDate = new Date(tenant.overdueDate);
    const diffTime = today - overdueDate;
    const daysOverdue = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let isOverdue = false;
    if(tenant.balance>0 && daysOverdue > 0){
        isOverdue = true;
    }
    else{
        isOverdue = false;
    }

    return (
        <div
            className={`tenant-card ${isOverdue ? 'flashing' : ''}`} // Add flashing class if overdue
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="tenant-avatar">
                <img src="https://via.placeholder.com/100" alt={`${tenant.name}'s avatar`} />
            </div>
            <h3>{tenant.name}</h3>
            <p>Joined on: {new Date(tenant.dateOfJoining).toLocaleDateString()}</p>
            {isOverdue && (
                <div className="overdue-alert">
                    {daysOverdue === 1 ? 'Overdue by 1 day!' : `Overdue by ${daysOverdue} days!`}
                </div>
            )}

        </div>
    );
};

export default TenantCard;
