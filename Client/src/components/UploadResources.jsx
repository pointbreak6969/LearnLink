import React, { useState } from 'react'

import { TabsContent} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { Label } from "@/components/ui/label";
import { Textarea } from './ui/textarea';
import { Clock, Edit, Trash2, Upload } from 'lucide-react';
import { Input } from './ui/input';

const UploadResources = () => {
    
    const [uploadedResources, setUploadedResources] = useState([
        { id: 1, title: "Uploaded Resource 1", thumbnail: "https://pngimg.com/d/dwarf_PNG70.png", date: "2024-01-01", approved: true }
      ]);
     
  return (
    <div>
        <TabsContent value="uploaded">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-[#FF9500]">Uploaded Resources</CardTitle>
                 
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {uploadedResources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="p-0">
                        <img
                          src={resource.thumbnail}
                          alt={`Thumbnail for ${resource.title}`}
                          className="aspect-auto object-cover w-36"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> Uploaded on: {resource.date}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant={resource.approved ? "success" : "secondary"}>
                            {resource.approved ? "Approved" : "Pending"}
                          </Badge>
                          <div>
                           
                            <Button variant="ghost" className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>


    </div>
  )
}

export default UploadResources