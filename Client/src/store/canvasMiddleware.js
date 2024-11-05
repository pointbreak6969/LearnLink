import canvasService from "../services/canvas.js"
const AUTO_SAVE_DELAY = 1000;
let autoSaveTimeout;
export const canvasMiddleware = (store) => (next) =>(action) => {
    const result = next(action)
    const state = store.getState()
    const autoSaveActions = [
        'canvas/setObjects',
        'canvas/setViewportTransform'
    ];
    if (autoSaveActions.includes(action.types) && state.canvas.currentCanvasId)  {
        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout)
        }
        autoSaveTimeout = setTimeout(()=>{
            canvasService.updateCanvas(state.canvas.currentCanvasId, {
                objects: state.canvas.objects,
                viewportTransform : state.canvas.viewportTransform
            }).catch(error=> {
                console.log("Auto-save failed", error);
            })
        }, AUTO_SAVE_DELAY);
    }
    return result;
}
