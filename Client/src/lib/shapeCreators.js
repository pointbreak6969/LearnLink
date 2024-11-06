import * as fabric from 'fabric';

export const createShape = (type, props) => {
  const commonProps = {
    left: 100,
    top: 100,
    fill: props.currentFill || "transparent",
    stroke: props.currentColor || "#000000",
    strokeWidth: 2,
    ...props
  };

  switch (type) {
    case "rectangle":
      return new fabric.Rect({
        ...commonProps,
        width: 100,
        height: 100,
      });

    case "circle":
      return new fabric.Circle({
        ...commonProps,
        radius: 50,
      });

    case "triangle":
      return new fabric.Triangle({
        ...commonProps,
        width: 100,
        height: 100,
      });

    case "line":
      return new fabric.Line([50, 50, 150, 50], {
        ...commonProps,
        fill: props.currentColor || "#000000",
      });

    default:
      return null;
  }
};

export const createTableShape = (dimensions, currentColor) => {
  const { rows, cols, cellSize } = dimensions;
  const tableGroup = [];

  // Create cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = new fabric.Rect({
        left: j * cellSize,
        top: i * cellSize,
        width: cellSize,
        height: cellSize,
        fill: "transparent",
        stroke: currentColor || "#000000",
        strokeWidth: 1,
      });
      tableGroup.push(cell);
    }
  }

  return new fabric.Group(tableGroup, {
    left: 100,
    top: 100,
  });
};