import React, { useState, useEffect } from 'react';
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Trash,
} from 'lucide-react';

const ClassroomPending = [
  {
    id: 101,
    name: 'Advanced Thermodynamics',
    owner: 'Rita',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-10',
    code:'sdsdsds',
    description: 'An advanced course covering thermodynamic systems and laws.',
    status: 'Pending',
  },
  {
    id: 102,
    name: 'Discrete Mathematics',
    owner: 'Ashim',
    university: 'Pokhara University',
    subject: 'Math',
    created: '2025-04-12',
    code:'sdsdsds',
    description: 'Course on logic, set theory, combinatorics, graph theory.',
    status: 'Pending',
  },
  {
    id: 103,
    name: 'Optics',
    owner: 'Sita',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-14',
    code:'sdsdsds',
    description: 'Study of light properties, lenses, and optical instruments.',
     status: 'Pending',
  },
  {
    id: 104,
    name: 'Numerical Methods',
    owner: 'Manish',
    university: 'Pokhara University',
    subject: 'Math',
    created: '2025-04-15',code:'sdsdsds',
    description: 'Techniques for solving mathematical problems numerically.',
    status: 'Pending',
  },
  {
    id: 105,
    name: 'Classical Mechanics',
    owner: 'Prakash',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-16',
    description: 'Fundamentals of motion, forces, and energy.',
    code:'sdsdsds',
    status: 'Pending',
  },
  {
    id: 101,
    name: 'Advanced Thermodynamics',
    owner: 'Rita',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-10',
    code:'sdsdsds',
    description: 'An advanced course covering thermodynamic systems and laws.',
    status: 'Pending',
  },
  {
    id: 102,
    name: 'Discrete Mathematics',
    owner: 'Ashim',
    university: 'Pokhara University',
    subject: 'Math',
    created: '2025-04-12',
    code:'sdsdsds',
    description: 'Course on logic, set theory, combinatorics, graph theory.',
    status: 'Pending',
  },
  {
    id: 103,
    name: 'Optics',
    owner: 'Sita',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-14',
    code:'sdsdsds',
    description: 'Study of light properties, lenses, and optical instruments.',
     status: 'Pending',
  },
  {
    id: 104,
    name: 'Numerical Methods',
    owner: 'Manish',
    university: 'Pokhara University',
    subject: 'Math',
    created: '2025-04-15',code:'sdsdsds',
    description: 'Techniques for solving mathematical problems numerically.',
    status: 'Pending',
  },
  {
    id: 105,
    name: 'Classical Mechanics',
    owner: 'Prakash',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-16',
    description: 'Fundamentals of motion, forces, and energy.',
    code:'sdsdsds',
    status: 'Pending',
  },
  {
    id: 101,
    name: 'Advanced Thermodynamics',
    owner: 'Rita',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-10',
    code:'sdsdsds',
    description: 'An advanced course covering thermodynamic systems and laws.',
    status: 'Pending',
  },
  {
    id: 102,
    name: 'Discrete Mathematics',
    owner: 'Ashim',
    university: 'Pokhara University',
    subject: 'Math',
    created: '2025-04-12',
    code:'sdsdsds',
    description: 'Course on logic, set theory, combinatorics, graph theory.',
    status: 'Pending',
  },
  {
    id: 103,
    name: 'Optics',
    owner: 'Sita',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-14',
    code:'sdsdsds',
    description: 'Study of light properties, lenses, and optical instruments.',
     status: 'Pending',
  },
  {
    id: 104,
    name: 'Numerical Methods',
    owner: 'Manish',
    university: 'Pokhara University',
    subject: 'Math',
    created: '2025-04-15',code:'sdsdsds',
    description: 'Techniques for solving mathematical problems numerically.',
    status: 'Pending',
  },
  {
    id: 105,
    name: 'Classical Mechanics',
    owner: 'Prakash',
    university: 'Tribhuvan University',
    subject: 'Physics',
    created: '2025-04-16',
    description: 'Fundamentals of motion, forces, and energy.',
    code:'sdsdsds',
    status: 'Pending',
  },
];

const universities = ['All', 'Pokhara University', 'Tribhuvan University'];
const subjects = ['All', 'Math', 'Physics'];
const rowsPerPage = 7;

const PendingClassroomAdmin = () => {
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const filteredClassrooms = ClassroomPending.filter((room) => {
    const matchesUniversity =
      selectedUniversity === 'All' || room.university === selectedUniversity;
    const matchesSubject =
      selectedSubject === 'All' || room.subject === selectedSubject;
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

  useEffect(() => {
    setPage(1);
  }, [selectedUniversity, selectedSubject, search]);

  const openModal = (classroom) => {
    setSelectedClassroom(classroom);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedClassroom(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      
      <h1 className="text-3xl font-bold text-orange-600 mb-4 flex items-center gap-2">
        Pending Classroom Approvals
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
                  No pending classrooms found.
                </td>
              </tr>
            ) : (
              paginatedClassrooms.map((room, idx) => (
                <tr
                  key={room.id}
                  className={`transition-all duration-200 ${
                    idx % 2 === 0 ? 'bg-orange-50' : 'bg-white'
                  } hover:bg-orange-100`}
                >
                  <td className="px-4 py-3">{(page - 1) * rowsPerPage + idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{room.name}</td>
                  <td className="px-4 py-3">{room.owner}</td>
                  <td className="px-4 py-3">{room.university}</td>
                  <td className="px-4 py-3">{room.subject}</td>
                  <td className="px-4 py-3">{room.created}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openModal(room)}
                      className="bg-transparent text-gray-900 px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    
                    </button>
                    <button
                      onClick={() => openModal(room)}
                      className="bg-transparent text-red-500 px-2 py-1 rounded-md flex items-center gap-1 transition"
                      title="View Details"
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
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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

      {modalOpen && selectedClassroom && (
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
              className="text-2xl font-bold text-orange-600 mb-4"
            >
              {selectedClassroom.name}
            </h2>
            <div id="modal-description" className="space-y-3 text-gray-700">
              <p>
                <strong>Owner:</strong> {selectedClassroom.owner}
              </p>
              <p>
                <strong>University:</strong> {selectedClassroom.university}
              </p>
              <p>
                <strong>Subject:</strong> {selectedClassroom.subject}
              </p>
              <p>
                <strong>Created on:</strong> {selectedClassroom.created}
              </p>
              <p>
                <strong>Code :</strong> {selectedClassroom.code}
              </p>
              <p>
                <strong>Status:</strong> {selectedClassroom.status}
              </p>
              <p>
                <strong>Description:</strong> {selectedClassroom.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingClassroomAdmin;
