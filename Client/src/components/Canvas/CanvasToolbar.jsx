import React from 'react';
import {
  Type,
  Square,
  Circle,
  Triangle as TriangleIcon,
  Table,
  Minus,
  Undo2,
  Redo2,
  Trash2,
  Hand,
  Pencil,
  Eraser,
  Image as ImageIcon
} from 'lucide-react';

const CanvasToolbar = ({
  onAddText,
  onAddShape,
  onDelete,
  onUndo,
  onRedo,
  activeTool,
  onToolChange
}) => {
  const tools = [
    { id: 'select', icon: Hand, label: 'Select' },
    { id: 'text', icon: Type, label: 'Text', onClick: onAddText },
    { id: 'rectangle', icon: Square, label: 'Rectangle', onClick: () => onAddShape('rectangle') },
    { id: 'circle', icon: Circle, label: 'Circle', onClick: () => onAddShape('circle') },
    { id: 'triangle', icon: TriangleIcon, label: 'Triangle', onClick: () => onAddShape('triangle') },
    { id: 'line', icon: Minus, label: 'Line', onClick: () => onAddShape('line') },
    { id: 'table', icon: Table, label: 'Table', onClick: () => onAddShape('table') },
    { id: 'freehand', icon: Pencil, label: 'Draw', onClick: () => onToolChange('freehand') },
    { id: 'eraser', icon: Eraser, label: 'Eraser', onClick: () => onToolChange('eraser') },
    { id: 'image', icon: ImageIcon, label: 'Image', onClick: () => onToolChange('image') },
  ];

  const actions = [
    { id: 'undo', icon: Undo2, label: 'Undo', onClick: onUndo },
    { id: 'redo', icon: Redo2, label: 'Redo', onClick: onRedo },
    { id: 'delete', icon: Trash2, label: 'Delete', onClick: onDelete },
  ];

  return (
    <div className="p-2 border-b flex items-center space-x-2">
      <div className="flex items-center space-x-1 border-r pr-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={tool.onClick || (() => onToolChange(tool.id))}
              className={`p-2 hover:bg-gray-100 rounded ${
                activeTool === tool.id ? 'bg-gray-100' : ''
              }`}
              title={tool.label}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-1">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="p-2 hover:bg-gray-100 rounded"
              title={action.label}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CanvasToolbar;