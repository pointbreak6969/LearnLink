import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

export const handleCopy = (canvas) => {
  const activeObjects = canvas.getActiveObjects();
  if (activeObjects.length > 0) {
    // Clear any existing clipboard data first
    localStorage.removeItem("clipboard");
    // Store new clipboard data
    const serializedObjects = activeObjects.map((obj) => obj.toObject());
    localStorage.setItem("clipboard", JSON.stringify(serializedObjects));
  }
  return activeObjects;
};

export const handlePaste = (canvas, syncShapeInStorage) => {
  if (!canvas || !(canvas instanceof fabric.Canvas)) {
    console.error("Invalid canvas object. Aborting paste operation.");
    return;
  }

  // Clear any active selection first to prevent duplicate selection issues
  canvas.discardActiveObject();

  const clipboardData = localStorage.getItem("clipboard");
  if (clipboardData) {
    try {
      const parsedObjects = JSON.parse(clipboardData);
      parsedObjects.forEach((objData) => {
        // convert the plain javascript objects retrieved from localStorage into fabricjs objects (deserialization)
        fabric.util.enlivenObjects(
          [objData],
          (enlivenedObjects) => {
            enlivenedObjects.forEach((enlivenedObj) => {
              // Offset the pasted objects to avoid overlap with existing objects
              enlivenedObj.set({
                left: enlivenedObj.left || 0 + 20,
                top: enlivenedObj.top || 0 + 20,
                objectId: uuidv4(),
                fill: "#aabbcc",
              });

              canvas.add(enlivenedObj);
              syncShapeInStorage(enlivenedObj);
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
export const handleDelete = (canvas, deleteShapeFromStorage) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;
  if (activeObjects.isEditing) return;
  if (activeObjects.length > 0) {
    activeObjects.forEach((obj) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
};
export const handleKeyDown = ({ e, canvas, syncShapeInStorage, deleteShapeFromStorage}) => {
  // Copy (Ctrl/Cmd + C)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 67) {
    handleCopy(canvas);
  }

  // Paste (Ctrl/Cmd + V)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 86) {
    handlePaste(canvas, syncShapeInStorage);
  }

  // Cut (Ctrl/Cmd + X)
  if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 88) {
    handleCopy(canvas);
    handleDelete(canvas, deleteShapeFromStorage);
  }

  // Delete (Delete key or Backspace)
  // if (e.keyCode === 46) {
  //   handleDelete(canvas);

  // }

  // Undo (Ctrl/Cmd + Z)
  // if ((e?.ctrlKey || e?.metaKey) && e.keyCode === 90) {
  //   undo();
  // }

  // Redo (Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z)
  // if (
  //   (e?.ctrlKey || e?.metaKey) &&
  //   (e.keyCode === 89 || (e.shiftKey && e.keyCode === 90))
  // ) {
  //   redo();
  // }

  // Prevent default action for forward slash
  // if (e.keyCode === 191 && !e.shiftKey) {
  //   e.preventDefault();
  // }
};
