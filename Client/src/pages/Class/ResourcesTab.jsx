import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const ResourcesTab = ({ resources = [] }) => {
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false);

  const handleAddResource = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="animate-fade-in shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Resources</span>

          <Dialog
            open={isAddResourceDialogOpen}
            onOpenChange={setIsAddResourceDialogOpen}
          >
            <DialogTrigger asChild>
              <Button varient="default">
                <Upload className="mr-2" />
                Upload
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
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <Input id="file" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Resource</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddResource} className="mb-4">
          <div className="flex flex-col md:flex-row items-center space-x-2">
            <Input
              placeholder="Resource name to find"
              className="flex-1 border border-gray-300 rounded-lg mb-2 md:mb-0"
            />
          </div>
        </form>
        <ul className="space-y-2">
          {resources.map((resource) => (
            <li
              key={resource.id}
              className="flex items-center justify-between border-b py-2 animate-fade-in"
            >
              <span className="text-gray-800">
                {resource.name} ({resource.type})
              </span>
              <div className="flex gap-2 items-center">
                <Button
                  variant="link"
                  size="sm"
                  className="text-[#FF9500] flex items-center hover:underline"
                  aria-label={`Save ${resource.name}`}
                >
                  <Save className="h-5 w-5 text-[#FF9500] mr-1" />
                  Save
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-[#FF9500] hover:underline"
                  aria-label={`View ${resource.name}`}
                >
                  View
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;