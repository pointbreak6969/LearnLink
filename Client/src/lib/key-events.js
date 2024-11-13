import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

export const handleCopy = (canvas) => {
  const activeObjects = canvas.getActiveObjects();
  if (activeObjects.length > 0) {
    const serializedObjects = activeObjects.map((obj) => obj.toObject());
    localStorage.setItem("clipboard", JSON.stringify(serializedObjects));
  }
  return activeObjects;
};

export const handlePaste = (canvas) => {
  if (!canvas || !(canvas instanceof fabric.Canvas)) {
    console.error("Invalid canvas object. Aborting paste operation.");
    return;
  }

  const clipboardData = localStorage.getItem("clipboard");
  if (clipboardData) {
    try {
      const parsedObjects = JSON.parse(clipboardData);
      parsedObjects.forEach((objData) => {
        fabric.util.enlivenObjects(
          [objData],
          (enlivenedObjects) => {
            enlivenedObjects.forEach((enlivenedObj) => {
              enlivenedObj.set({
                left: enlivenedObj.left || 0 + 20,
                top: enlivenedObj.top || 0 + 20,
                objectId: uuidv4(),
                fill: "#aabbcc",
              });
              canvas.add(enlivenedObj);
            });
            canvas.renderAll();
          },
          "fabric"
        );
      });
    } catch (error) {
      console.error("Error parsing clipboard data:", error);
    }
  }
};

export const handleDelete = (canvas) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;
  
  activeObjects.forEach((obj) => {
    canvas.remove(obj);
  });
  
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const handleKeyDown = ({ e, canvas, undo, redo }) => {
  // Copy (Ctrl/Cmd + C)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 67) {
    handleCopy(canvas);
  }
  
  // Paste (Ctrl/Cmd + V)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 86) {
    handlePaste(canvas);
  }
  
  // Cut (Ctrl/Cmd + X)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 88) {
    handleCopy(canvas);
    handleDelete(canvas);
  }
  
  // Undo (Ctrl/Cmd + Z)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 90) {
    undo();
  }
  
  // Redo (Ctrl/Cmd + Y)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 89) {
    redo();
  }
  
  // Prevent default action for forward slash
  if (e.keyCode === 191 && !e.shiftKey) {
    e.preventDefault();
  }
};