"use client";

import React, { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const classRoom = [
  {
    id: 1,
    name: "Engineering Math",
    owner: "Ashim",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-04-16",
  },
  {
    id: 2,
    name: "Quantum Physics",
    owner: "Sita",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-03-10",
  },
  {
    id: 3,
    name: "Linear Algebra",
    owner: "Bikash",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-02-22",
  },
  {
    id: 4,
    name: "Thermodynamics",
    owner: "Rita",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-01-15",
  },
  {
    id: 5,
    name: "Calculus I",
    owner: "Manish",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-04-01",
  },
  {
    id: 6,
    name: "Statistics",
    owner: "Kiran",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-03-20",
  },
  {
    id: 7,
    name: "Electromagnetism",
    owner: "Suman",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-02-28",
  },
  {
    id: 8,
    name: "Differential Equations",
    owner: "Nisha",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-01-30",
  },
  {
    id: 9,
    name: "Classical Mechanics",
    owner: "Prakash",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-01-10",
  },
  {
    id: 3,
    name: "Linear Algebra",
    owner: "Bikash",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-02-22",
  },
  {
    id: 4,
    name: "Thermodynamics",
    owner: "Rita",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-01-15",
  },
  {
    id: 5,
    name: "Calculus I",
    owner: "Manish",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-04-01",
  },
  {
    id: 6,
    name: "Statistics",
    owner: "Kiran",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-03-20",
  },
  {
    id: 7,
    name: "Electromagnetism",
    owner: "Suman",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-02-28",
  },
  {
    id: 8,
    name: "Differential Equations",
    owner: "Nisha",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-01-30",
  },
  {
    id: 9,
    name: "Classical Mechanics",
    owner: "Prakash",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-01-10",
  },
  {
    id: 3,
    name: "Linear Algebra",
    owner: "Bikash",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-02-22",
  },
  {
    id: 4,
    name: "Thermodynamics",
    owner: "Rita",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-01-15",
  },
  {
    id: 5,
    name: "Calculus I",
    owner: "Manish",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-04-01",
  },
  {
    id: 6,
    name: "Statistics",
    owner: "Kiran",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-03-20",
  },
  {
    id: 7,
    name: "Electromagnetism",
    owner: "Suman",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-02-28",
  },
  {
    id: 8,
    name: "Differential Equations",
    owner: "Nisha",
    university: "Pokhara University",
    subject: "Math",
    created: "2025-01-30",
  },
  {
    id: 9,
    name: "Classical Mechanics",
    owner: "Prakash",
    university: "Tribhuvan University",
    subject: "Physics",
    created: "2025-01-10",
  },
];

const universities = ["All", "Pokhara University", "Tribhuvan University"];
const subjects = ["All", "Math", "Physics"];
const rowsPerPage = 7;

const page = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredClassrooms = classRoom.filter((room) => {
    const matchesUniversity =
      selectedUniversity === "All" || room.university === selectedUniversity;
    const matchesSubject =
      selectedSubject === "All" || room.subject === selectedSubject;
    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.owner.toLowerCase().includes(search.toLowerCase());
    return matchesUniversity && matchesSubject && matchesSearch;
  });

  const totalPages = Math.ceil(filteredClassrooms.length / rowsPerPage);
  const paginatedClassrooms = filteredClassrooms.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  React.useEffect(() => {
    setPage(1);
  }, [selectedUniversity, selectedSubject, search]);

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-2 flex items-center gap-2">
        Classroom Admin
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
            <select
              className="px-4 py-2 rounded-xl border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or owner..."
              className="pl-10 pr-4 py-2 rounded-xl border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 text-orange-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-orange-200 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-orange-100">
          <thead className="bg-orange-100 text-orange-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">SN</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Owner</th>
              <th className="px-4 py-3 text-left font-semibold">University</th>
              <th className="px-4 py-3 text-left font-semibold">Subject</th>
              <th className="px-4 py-3 text-left font-semibold">Created</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50">
            {paginatedClassrooms.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No classrooms found.
                </td>
              </tr>
            ) : (
              paginatedClassrooms.map((room, idx) => (
                <tr
                  key={room.id}
                  className={`transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-orange-50" : "bg-white"
                  } hover:bg-orange-100`}
                >
                  <td className="px-4 py-3">
                    {(page - 1) * rowsPerPage + idx + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{room.name}</td>
                  <td className="px-4 py-3">{room.owner}</td>
                  <td className="px-4 py-3">{room.university}</td>
                  <td className="px-4 py-3">{room.subject}</td>
                  <td className="px-4 py-3">{room.created}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
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
    </div>
  );
};

export default page;
