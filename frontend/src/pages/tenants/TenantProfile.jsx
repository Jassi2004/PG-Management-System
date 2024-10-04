import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTenantData, updateTenantData } from '../../services/api'; // Import API functions

const TenantProfile = () => {
    const { tenantId } = useParams();
    const [tenant, setTenant] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const getTenantData = async () => {
            const data = await fetchTenantData(tenantId);
            setTenant(data);
            setFormData(data); // Initialize form data with tenant info
        };
        getTenantData();
    }, [tenantId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTenantData(tenantId, formData);
        setIsEditing(false);
        // Optionally, re-fetch tenant data or update state
    };

    if (!tenant) return <div>Loading...</div>;

    return (
        <div className="tenant-profile">
            <h1>{tenant.name}'s Profile</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <div>
                    <p>Email: {tenant.email}</p>
                    <p>Phone: {tenant.phoneNumber}</p>
                    <p>Room Number: {tenant.roomNumber}</p>
                    <p>Monthly Rent: ${tenant.monthlyRent}</p>
                    <p>Joined on: {new Date(tenant.dateOfJoining).toLocaleDateString()}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default TenantProfile;
