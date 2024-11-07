import { Button } from "../ui/button";
import { Download } from "lucide-react";

export const ExportButton = ({ canvasRef }) => {
    const handleExport = () => {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = 'canvas-drawing.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <div className="fixed top-4 right-4 z-10">
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    );
  };