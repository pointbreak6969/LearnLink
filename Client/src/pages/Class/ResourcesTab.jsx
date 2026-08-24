import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

import resourceService from "@/services/resource";
import { FaRegFilePdf } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce"; 

const ResourcesTab = ({ classroomId }) => {
  const [resources, SetResources] = useState([]);
  const [title, SetTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedTitle = useDebounce(title, 500); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (debouncedTitle) {
          const response = await resourceService.getResourceByTitle(debouncedTitle);
          SetResources(response);
        } else {
          const response = await resourceService.getClassroomResources(classroomId);
          SetResources(response);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [debouncedTitle, classroomId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Resources</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="mb-4">
          <div className="flex flex-col md:flex-row items-center space-x-2">
            <Input
              placeholder="Resource name to find"
              className="flex-1 mb-2 md:mb-0"
              onChange={(e) => SetTitle(e.target.value)}
            />
          </div>
        </form>
        {loading ? (
          <div className="text-ink-400 text-center py-4">
            Loading resources...
          </div>
        ) : resources.length > 0 ? (
          <ul className="space-y-2">
            {resources.map((resource) => (
              <li
                key={resource.id || resource._id}
                className="flex items-center justify-between border-b border-ink-100 py-2.5"
              >
                <span className="text-ink-800 flex items-center">
                  <FaRegFilePdf className="w-8 h-5 text-red-500 mr-2" /> {resource.title}
                </span>

                <div className="flex gap-2 items-center">
                  <Button
                    variant="link"
                    size="sm"
                    className="flex items-center"
                    aria-label={`Save ${resource.title}`}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    aria-label={`View ${resource.name}`}
                  >
                    View
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-ink-400 text-center py-4">
            No resources found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourcesTab;
