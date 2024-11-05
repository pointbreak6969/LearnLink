import axios from "axios";
class CanvasService {
    handleError(error) {
        console.error('Canvas Service Error:', error);
        return error.response?.data || {
          message: 'An unexpected error occurred',
          error: error.message
        };
      }
  async createCanvas(name) {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/canvas/createCanvas",
        { name },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  async getCanvas(id) {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/canvas/getCanvas/${id}`, {withCredentials: true}
      );
      return response.data;
    } catch (error) {
        throw this.handleError(error);
    }
  }
  async updateCanvas (id, canvasData) {
    try {
        const response = await axios.put(`http://localhost:5050/api/v1/canvas/updateCanvas/${id}`)
        return response.data;
    } catch (error) {
        throw this.handleError(error)
    }
  }
  //Helper method to seralize canvas objects for storage;
  serializeCanvas(fabricCanvas) {
      return fabricCanvas.toJSON([
        'selectable',
        'evented',
        'lockMovementX',
        'lockMovementY',
        'lockRotation',
        'lockScalingX',
        'lockScalingY',
        'lockUniScaling',
        'hasControls',
        'hasBorders'
      ]);
  }
  // helper method to load canvas from serialized data
  async loadCanvasFromJSON(fabricCanvas, canvasData) {
    return new Promise((resolve)=> {
        fabricCanvas.loadCanvasFromJSON(canvasData, ()=> {
            fabricCanvas.renderAll();
            resolve(fabricCanvas)
        })
    })
  }
}
const canvasService = new CanvasService()
export default canvasService;
