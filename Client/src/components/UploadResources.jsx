import React, { useState } from 'react'

import { TabsContent} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { Label } from "@/components/ui/label";
import { Textarea } from './ui/textarea';
import { Clock, Edit, Trash2, Upload } from 'lucide-react';
import { Input } from './ui/input';

const UploadResources = () => {
    
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({ title: "", description: "", file: null });
    const [uploadedResources, setUploadedResources] = useState([
        { id: 1, title: "Uploaded Resource 1", thumbnail: "https://img.freepik.com/free-vector/colorful-notepad_53876-67695.jpg", date: "2024-01-01", approved: true }
      ]);
     
  return (
    <div>
        <TabsContent value="uploaded">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-[#FF9500]">Uploaded Resources</CardTitle>
                  <Dialog open={isAddResourceDialogOpen} onOpenChange={setIsAddResourceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#FF9500] text-white hover:bg-[#E68600] transition-all duration-300 hover:scale-105">
                        <Upload className="mr-2" /> Add New Resource
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Resource</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            
                            value={newResource.title}
                            onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={newResource.description}
                            onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="file" className="text-right">
                            File
                          </Label>
                          <Input
                            id="file"
                            type="file"
                            onChange={(e) => setNewResource({...newResource, file: e.target.files[0]})}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" >Add Resource</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                          className="w-full h-40 object-cover"
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