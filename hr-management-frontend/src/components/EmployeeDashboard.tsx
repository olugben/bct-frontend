import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Profile {
  name: string;
  email: string;
  department: string;
  role: string;
  joining_date: string;
}

const EmployeeDashboard: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    department: '',
    role: '',
    joining_date: ''
  });
  const [formData, setFormData] = useState<Profile>(profile);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      setError(`Error updating profile ${error}`);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:4000/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      setError(`Error updating profile ${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Joining Date:</strong> {profile.joining_date}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Joining Date:</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    name="joining_date"
                    value={formData.joining_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button className="w-full bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out" type="submit">
                Update Profile
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;
