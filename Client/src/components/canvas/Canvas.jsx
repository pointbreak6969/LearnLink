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



  const handleActiveElement = (elem) => {
    setActiveElement(elem);

    // Reset drawing mode
    if (fabricRef.current) {
      fabricRef.current.isDrawingMode = false;
    }

    switch (elem?.value) {
      case "delete":
        handleDelete(fabricRef.current);
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
      });
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({ options });
    });

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({ options });
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
        })
      );
    };
  }, [canvasRef, fabricRef]);

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
          });
        }}
        handleActiveElement={handleActiveElement}
      />
      <div
        className="relative flex h-full w-full flex-1 items-center justify-center"
        id="canvas"
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Canvas;
