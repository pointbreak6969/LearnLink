import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Clock, Edit, Trash2, Upload } from "lucide-react";

const Resources = () => {
  const [Resources, setResources] = useState([
    {
      id: 1,
      title: "Uploaded Resource 1",
      thumbnail: "https://pngimg.com/d/dwarf_PNG70.png",
      date: "2024-01-01",
      approved: true,
    },
    {
      id: 2,
      title: "Uploaded Resource 2",
      thumbnail: "https://pngimg.com/d/dwarf_PNG71.png",
      date: "2024-01-02",
      approved: false,
    },
    {
      id: 3,
      title: "Uploaded Resource 3",
      thumbnail: "https://pngimg.com/d/dwarf_PNG72.png",
      date: "2024-01-03",
      approved: true,
    },
    {
      id: 4,
      title: "Uploaded Resource 4",
      thumbnail: "https://pngimg.com/d/dwarf_PNG73.png",
      date: "2024-01-04",
      approved: false,
    },
    {
      id: 5,
      title: "Uploaded Resource 5",
      thumbnail: "https://pngimg.com/d/dwarf_PNG74.png",
      date: "2024-01-05",
      approved: true,
    },
    {
      id: 6,
      title: "Uploaded Resource 6",
      thumbnail: "https://pngimg.com/d/dwarf_PNG75.png",
      date: "2024-01-06",
      approved: false,
    },
    {
      id: 7,
      title: "Uploaded Resource 7",
      thumbnail: "https://pngimg.com/d/dwarf_PNG76.png",
      date: "2024-01-07",
      approved: true,
    },
    {
      id: 8,
      title: "Uploaded Resource 8",
      thumbnail: "https://pngimg.com/d/dwarf_PNG77.png",
      date: "2024-01-08",
      approved: false,
    },
    {
      id: 9,
      title: "Uploaded Resource 9",
      thumbnail: "https://pngimg.com/d/dwarf_PNG78.png",
      date: "2024-01-09",
      approved: true,
    },
    {
      id: 10,
      title: "Uploaded Resource 10",
      thumbnail: "https://pngimg.com/d/dwarf_PNG79.png",
      date: "2024-01-10",
      approved: false,
    },
  ]);

  return (
    <div>
        <Card className="animate-fade-in-up ">
          <CardHeader>
            <div className="flex justify-between items-center ">
              <CardTitle className="text-xl font-semibold text-[#FF9500]">
                Your Resources
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {Resources.map((resource) => (
                <Card
                  key={resource.id}
                  className="overflow-hidden hover:scale-105 transition-all duration-300 rounded-lg shadow-md"
                >
                  <CardHeader className="p-0">
                    {/* Image adjusted to be smaller */}
                    <img
                      src={resource.thumbnail}
                      alt={`Thumbnail for ${resource.title}`}
                      className="w-24 h-24 object-cover mx-auto mt-4 rounded-md"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-base font-semibold mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> Uploaded on:{" "}
                      {resource.date}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge
                        variant={resource.approved ? "success" : "secondary"}
                      >
                        {resource.approved ? "Approved" : "Pending"}
                      </Badge>
                      <div>
                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 flex items-center gap-1 text-xs"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default Resources;
