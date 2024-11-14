import { useEffect, useRef, useState } from "react";
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectMoving,
  handleCanvasZoom,
  handlePathCreated,
  handleResize,
  initializeFabric,
} from "@/lib/canvas";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import Toolbar from "./Toolbar";
import { handleImageUpload } from "@/lib/shapes";
const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef(null);
  const selectedShapeRef = useRef(null);
  const activeObjectRef = useRef(null);
  const imageInputRef = useRef(null);

  const [activeElement, setActiveElement] = useState({
    name: "Select",
    value: "select",
    icon: null,
  });
  const syncShapeInStorage = (object) => {
    // if the passed object is null, return
    if (!object) return;

    const { objectId } = object;

    // Convert Fabric object into JSON format for storage
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    // Get existing canvas objects from localStorage or initialize an empty object
    const canvasObjects =
      JSON.parse(localStorage.getItem("canvasObjects")) || {};

    // Update or add the current shape data in the canvas objects map
    canvasObjects[objectId] = shapeData;

    // Save updated canvas objects back to localStorage
    localStorage.setItem("canvasObjects", JSON.stringify(canvasObjects));
  };
  const deleteShapeFromStorage = (shapeId) => {
    // Retrieve the current canvas objects from localStorage
    const canvasObjects =
      JSON.parse(localStorage.getItem("canvasObjects")) || {};

    // Check if the shapeId exists and delete it
    if (canvasObjects[shapeId]) {
      delete canvasObjects[shapeId];
    }

    // Save the updated canvas objects back to localStorage
    localStorage.setItem("canvasObjects", JSON.stringify(canvasObjects));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload({
        file,
        canvas: fabricRef,
        shapeRef,
        syncShapeInStorage,
      });
    }
  };
  const handleActiveElement = (elem) => {
    setActiveElement(elem);

    // Reset drawing mode
    if (fabricRef.current) {
      fabricRef.current.isDrawingMode = false;
    }

    switch (elem?.value) {
      case "trash":
        handleDelete(fabricRef.current, deleteShapeFromStorage);
        break;
      case "image":
        imageInputRef.current?.click();
        isDrawing.current = false;
        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false;
        }
        break;
      default:
        selectedShapeRef.current = elem?.value;
        break;
    }
  };

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        setActiveElement,
        syncShapeInStorage,
      });
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({ options, syncShapeInStorage });
    });

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({ options, syncShapeInStorage });
    });

    canvas.on("object:moving", (options) => {
      handleCanvasObjectMoving({ options });
    });

    canvas.on("mouse:wheel", (options) => {
      handleCanvasZoom({
        options,
        canvas,
      });
    });

    window.addEventListener("resize", () => {
      handleResize({ canvas: fabricRef.current });
    });

    window.addEventListener("keydown", (e) =>
      handleKeyDown({
        e,
        canvas: fabricRef.current,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    );

    return () => {
      canvas.dispose();

      window.removeEventListener("resize", () => {
        handleResize({ canvas: null });
      });

      window.removeEventListener("keydown", (e) =>
        handleKeyDown({
          e,
          canvas: fabricRef.current,
          syncShapeInStorage,
          deleteShapeFromStorage,
        })
      );
    };
  }, [canvasRef]);
  // useEffect(() => {
  //   renderCanvas({
  //     fabricRef,
  //     canvasObjects,
  //     activeObjectRef,
  //   });
  // }, [canvasObjects]);
  return (
    <div className="h-screen overflow-hidden">
      <Toolbar
        imageInputRef={imageInputRef}
        activeElement={activeElement}
        handleImageUpload={(e) => {
          e.stopPropagation();
          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef,
            shapeRef,
            syncShapeInStorage,
          });
        }}
        handleActiveElement={handleActiveElement}
      />
      <div
        className="relative flex h-full w-full flex-1 items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop} id="canvas"
      >
        <canvas ref={canvasRef}  />
      </div>
    </div>
  );
};

export default Canvas;
