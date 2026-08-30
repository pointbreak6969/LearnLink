import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Clock, FileText, Trash2, Loader2 } from "lucide-react";
import resourceService from "@/services/resource";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      const res = await resourceService.getUserUploadedResources();
      setResources(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await resourceService.deleteResource(id);
      toast.success("Resource deleted successfully");
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.message || "Failed to delete resource");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recent";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-ink-500 bg-white rounded-2xl border border-brand-200">
        <Loader2 className="w-7 h-7 animate-spin mx-auto text-brand-500 mb-2" />
        <span>Loading resources...</span>
      </div>
    );
  }

  return (
    <div>
      <Card className="animate-fade-in-up border-brand-200 shadow-sm rounded-2xl bg-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-ink-900">
              Your Shared Resources ({resources.length})
            </CardTitle>
            <Button asChild size="sm" className="bg-brand-600 hover:bg-brand-700 text-white text-xs">
              <Link to="/classroom">Upload in Classroom</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {resources.length === 0 ? (
            <div className="text-center py-10 text-ink-500">
              <FileText className="w-10 h-10 text-brand-400 mx-auto mb-2" />
              <p className="font-semibold text-ink-800">No resources shared yet</p>
              <p className="text-xs text-ink-500 mt-1">Upload study materials in your classroom to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <Card
                  key={resource._id}
                  className="overflow-hidden transition-all duration-300 hover:border-brand-300 hover:shadow-md flex flex-col justify-between"
                >
                  <CardHeader className="p-0">
                    <div className="h-20 flex items-center justify-center bg-brand-50/80">
                      <FileText className="h-8 w-8 text-brand-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold mb-1 text-ink-900 truncate">
                        {resource.title || "Untitled File"}
                      </h3>
                      <p className="text-xs text-ink-500 mb-3 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(resource.createdAt)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-brand-100">
                      <Badge variant="outline" className="text-[10px] bg-brand-50 text-brand-700 border-brand-200">
                        {Array.isArray(resource.resource) ? `${resource.resource.length} File(s)` : "Document"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === resource._id}
                        onClick={() => handleDelete(resource._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 px-2 text-xs flex items-center gap-1"
                      >
                        {deletingId === resource._id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;
