import React, { useState } from 'react';
import { X } from 'lucide-react';

const TableModal = ({ onClose, onCreateTable }) => {
  const [dimensions, setDimensions] = useState({
    rows: 3,
    cols: 3,
    cellSize: 50
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTable(dimensions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Create Table</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Rows
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={dimensions.rows}
                onChange={(e) => setDimensions(prev => ({
                  ...prev,
                  rows: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Columns
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={dimensions.cols}
                onChange={(e) => setDimensions(prev => ({
                  ...prev,
                  cols: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Cell Size (px)
              </label>
              <input
                type="number"
                min="20"
                max="200"
                step="10"
                value={dimensions.cellSize}
                onChange={(e) => setDimensions(prev => ({
                  ...prev,
                  cellSize: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableModal;