"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Trash,
  Phone,
  MapPin,
  University,
  Mail,
  User,
  Calendar,
  Award,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    profile: {
      publicId: "public1",
      url: "http://example.com/john.jpg",
    },
    contactInfo: {
      phone: "123-456-7890",
      location: "Kathmandu",
      university: "Pokhara University",
      college: "XYZ College",
    },
    liveLocation: "Lakeside",
    pointsEarned: 150,
    created: "2025-04-01",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    profile: {
      publicId: "public2",
      url: "http://example.com/jane.jpg",
    },
    contactInfo: {
      phone: "987-654-3210",
      location: "Pokhara",
      university: "Tribhuvan University",
      college: "ABC College",
    },
    liveLocation: "Newroad",
    pointsEarned: 200,
    created: "2025-04-05",
  },
  {
    id: 3,
    fullName: "David Lee",
    email: "david.lee@example.com",
    profile: {
      publicId: "public3",
      url: "http://example.com/david.jpg",
    },
    contactInfo: {
      phone: "555-123-4567",
      location: "Bhaktapur",
      university: "Kathmandu University",
      college: "PQR College",
    },
    liveLocation: "Durbarmarg",
    pointsEarned: 180,
    created: "2025-04-10",
  },
  {
    id: 4,
    fullName: "Emily Chen",
    email: "emily.chen@example.com",
    profile: {
      publicId: "public4",
      url: "http://example.com/emily.jpg",
    },
    contactInfo: {
      phone: "111-222-3333",
      location: "Lalitpur",
      university: "Purbanchal University",
      college: "LMN College",
    },
    liveLocation: "Pulchowk",
    pointsEarned: 220,
    created: "2025-04-15",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    profile: {
      publicId: "public2",
      url: "http://example.com/jane.jpg",
    },
    contactInfo: {
      phone: "987-654-3210",
      location: "Pokhara",
      university: "Tribhuvan University",
      college: "ABC College",
    },
    liveLocation: "Newroad",
    pointsEarned: 200,
    created: "2025-04-05",
  },
  {
    id: 3,
    fullName: "David Lee",
    email: "david.lee@example.com",
    profile: {
      publicId: "public3",
      url: "http://example.com/david.jpg",
    },
    contactInfo: {
      phone: "555-123-4567",
      location: "Bhaktapur",
      university: "Kathmandu University",
      college: "PQR College",
    },
    liveLocation: "Durbarmarg",
    pointsEarned: 180,
    created: "2025-04-10",
  },
  {
    id: 4,
    fullName: "Emily Chen",
    email: "emily.chen@example.com",
    profile: {
      publicId: "public4",
      url: "http://example.com/emily.jpg",
    },
    contactInfo: {
      phone: "111-222-3333",
      location: "Lalitpur",
      university: "Purbanchal University",
      college: "LMN College",
    },
    liveLocation: "Pulchowk",
    pointsEarned: 220,
    created: "2025-04-15",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    profile: {
      publicId: "public2",
      url: "http://example.com/jane.jpg",
    },
    contactInfo: {
      phone: "987-654-3210",
      location: "Pokhara",
      university: "Tribhuvan University",
      college: "ABC College",
    },
    liveLocation: "Newroad",
    pointsEarned: 200,
    created: "2025-04-05",
  },
  {
    id: 3,
    fullName: "David Lee",
    email: "david.lee@example.com",
    profile: {
      publicId: "public3",
      url: "http://example.com/david.jpg",
    },
    contactInfo: {
      phone: "555-123-4567",
      location: "Bhaktapur",
      university: "Kathmandu University",
      college: "PQR College",
    },
    liveLocation: "Durbarmarg",
    pointsEarned: 180,
    created: "2025-04-10",
  },
  {
    id: 4,
    fullName: "Emily Chen",
    email: "emily.chen@example.com",
    profile: {
      publicId: "public4",
      url: "http://example.com/emily.jpg",
    },
    contactInfo: {
      phone: "111-222-3333",
      location: "Lalitpur",
      university: "Purbanchal University",
      college: "LMN College",
    },
    liveLocation: "Pulchowk",
    pointsEarned: 220,
    created: "2025-04-15",
  },
];

const universities = [
  "All",
  "Pokhara University",
  "Tribhuvan University",
  "Kathmandu University",
  "Purbanchal University",
];

const rowsPerPage = 7;

const page = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = initialUsers.filter((user) => {
    const matchesUniversity =
      selectedUniversity === "All" ||
      (user.contactInfo.university &&
        user.contactInfo.university === selectedUniversity);
    const matchesSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    return matchesUniversity && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [selectedUniversity, search]);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 flex items-center gap-2">
        User Management
      </h1>
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Filter</h2>
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 rounded-xl border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              {universities.map((uni) => (
                <option key={uni}>{uni}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 rounded-xl border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 text-orange-400 w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-orange-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-orange-100">
          <thead className="bg-orange-100 text-orange-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">SN</th>
              <th className="px-4 py-3 text-left font-semibold">Full Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">University</th>
              <th className="px-4 py-3 text-left font-semibold">Points</th>
              <th className="px-4 py-3 text-left font-semibold">Created</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-orange-50" : "bg-white"
                  } hover:bg-orange-100`}
                >
                  <td className="px-4 py-3">
                    {(page - 1) * rowsPerPage + idx + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.contactInfo.university}</td>
                  <td className="px-4 py-3">{user.pointsEarned}</td>
                  <td className="px-4 py-3">{user.created}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-transparent text-gray-900 px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="bg-transparent text-red-500 px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="Delete User"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded-md font-semibold ${
                page === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-orange-600 hover:text-orange-800"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h2
              id="modal-title"
              className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2"
            >
              <User className="w-6 h-6" />
              {selectedUser.fullName}
            </h2>
            <div id="modal-description" className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <strong>Phone:</strong> {selectedUser.contactInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <strong>Location:</strong> {selectedUser.contactInfo.location}
              </p>
              <p className="flex items-center gap-2">
                <University className="w-4 h-4 text-gray-500" />
                <strong>University:</strong>{" "}
                {selectedUser.contactInfo.university}
              </p>
              <p className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-500" />
                <strong>Points Earned:</strong> {selectedUser.pointsEarned}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <strong>Created:</strong> {selectedUser.created}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
