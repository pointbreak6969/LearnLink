const drawPencilPath = (ctx, points) => {
  if (!points || points.length === 0) return;
  
  ctx.strokeStyle = '#000000';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  if (points.length === 1) {
    ctx.lineTo(points[0].x + 0.1, points[0].y + 0.1);
  } else {
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
  }
  ctx.stroke();
};

const drawEraserPath = (ctx, points) => {
  if (!points || points.length === 0) return;
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  if (points.length === 1) {
    ctx.lineTo(points[0].x + 0.1, points[0].y + 0.1);
  } else {
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
  }
  ctx.stroke();
};

const drawRectanglePath = (ctx, points) => {
  if (!points || points.length < 2) return;
  
  ctx.strokeStyle = '#000000';
  const [start, end] = [points[0], points[points.length - 1]];
  ctx.beginPath();
  ctx.rect(
    Math.min(start.x, end.x),
    Math.min(start.y, end.y),
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y)
  );
  ctx.stroke();
};

const drawCirclePath = (ctx, points) => {
  if (!points || points.length < 2) return;
  
  ctx.strokeStyle = '#000000';
  const [centerPoint, radiusPoint] = [points[0], points[points.length - 1]];
  const radius = Math.sqrt(
    Math.pow(radiusPoint.x - centerPoint.x, 2) + 
    Math.pow(radiusPoint.y - centerPoint.y, 2)
  );
  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, radius, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawPath = (ctx, path) => {
  const { tool, settings, points } = path;
  if (!points || points.length === 0) return;
  
  ctx.lineWidth = settings.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  switch (tool) {
    case 'pencil':
      drawPencilPath(ctx, points);
      break;
    case 'eraser':
      drawEraserPath(ctx, points);
      break;
    case 'rectangle':
      drawRectanglePath(ctx, points);
      break;
    case 'circle':
      drawCirclePath(ctx, points);
      break;
    default:
      break;
  }
};

// Helper function to get mouse position
export const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};
