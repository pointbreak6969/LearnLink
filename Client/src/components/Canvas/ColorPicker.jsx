import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Palette } from 'lucide-react';
import { setCurrentColor } from '../../store/canvasSlice.js';

const ColorPicker = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector(state => state.canvas.currentColor);
  
  const colors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#008000', // Dark Green
    '#FFC0CB', // Pink
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg">
      <div className="flex items-center mb-2">
        <Palette size={16} className="mr-2" />
        <span className="text-sm font-medium">Colors</span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => dispatch(setCurrentColor(color))}
            className={`w-8 h-8 rounded-full border-2 ${
              currentColor === color ? 'border-blue-500' : 'border-gray-200'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="mt-2">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => dispatch(setCurrentColor(e.target.value))}
          className="w-full h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ColorPicker;