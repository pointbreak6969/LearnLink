export const drawPath = (ctx, path) => {
  const { tool, settings, points } = path;
  ctx.lineWidth = settings.width;
  (ctx.lineCap = "round"), (ctx.lineJoin = "round");
  switch (tool) {
    case "pencil":
      return drawPencilPath(ctx, points);
    case "eraser":
      return drawEraserPath(ctx, points);
    case "rectangle":
      return drawRectanglePath(ctx, points);
    case "circle":
      return drawCirclePath(ctx, points);
    default:
      return;
  }
};
function drawPencilPath(ctx, points) {
  ctx.strokeStyle = "#0000";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}
function drawEraserPath(ctx, points) {
  ctx.strokeStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}
function drawRectanglePath(ctx, points) {
  ctx.strokeStyle = "#000000";
  const [start, end] = [points[0], points[points.length - 1]];
  ctx.beginPath();
  ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
  ctx.stroke();
}
function drawCirclePath(ctx, points) {
  ctx.strokeStyle = "#000000";
  const [centerPoint, radiusPoint] = [points[0], points[points.length - 1]];
  const radius = Math.sqrt(
    Math.pow(radiusPoint.x - centerPoint.x, 2) +
      Math.pow(radiusPoint.y - centerPoint.y, 2)
  );
  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, radius, 0, Math.PI * 2);
  ctx.stroke();
}
