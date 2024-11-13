import React, { useState } from 'react';
import { Circle, Square, Type, ImageIcon, Pencil, Eraser, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Toolbar = ({ activeElement, handleActiveElement, imageInputRef, handleImageUpload }) => {
    const tools = [
      {
        name: "Select",
        value: "select",
        icon: <MousePointer className="h-4 w-4" />
      },
      {
        name: "Rectangle",
        value: "rectangle",
        icon: <Square className="h-4 w-4" />
      },
      {
        name: "Circle",
        value: "circle",
        icon: <Circle className="h-4 w-4" />
      },
      {
        name: "Text",
        value: "text",
        icon: <Type className="h-4 w-4" />
      },
      {
        name: "Image",
        value: "image",
        icon: <ImageIcon className="h-4 w-4" />
      },
      {
        name: "Freeform",
        value: "freeform",
        icon: <Pencil className="h-4 w-4" />
      }
    ];
  
    return (
      <div className="absolute top-5 left-5 z-10">
        <nav className="flex select-none items-center bg-white border rounded-lg shadow-sm p-2 gap-1">
          {tools.map((tool) => (
            <Button
              key={tool.value}
              variant={activeElement.value === tool.value ? "default" : "ghost"}
              size="icon"
              onClick={() => handleActiveElement(tool)}
              className="w-8 h-8"
            >
              <div className={`${activeElement.value === tool.value ? "text-white" : "text-gray-600"}`}>
                {tool.icon}
              </div>
            </Button>
          ))}
          <input 
            type="file"
            className="hidden"
            ref={imageInputRef}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </nav>
      </div>
    );
  };
  
  export default Toolbar;