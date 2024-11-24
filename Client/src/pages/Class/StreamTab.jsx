import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Upload, X, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import resourceService from "@/services/resource";
import { useState } from "react";
import ResourceCard from "./ResourceCard";
const StreamTab = ({ classroomId }) => {
  const classCode = classroomId.classCode;
  const [announcements, setAnnouncements] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      text: "",
      files: [],
    },
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    if (fields.length + newFiles.length > 20) {
      toast.error("Can't upload more than 20 files at once");
      return;
    }
    newFiles.forEach((file) => {
      append({ file });
    });
  };
  const onSubmit = async (data) => {
    // Show uploading toast
    const loadingToast = toast.loading("Uploading resources...");

    try {
      const files = data.files.map((fileObj) => fileObj.file);
      const response = await resourceService.createResource({
        title: data.title,
        text: data.text,
        files,
        classroomId: classCode,
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success message
      toast.success("Resources added successfully");

      // Reset form
      reset();
      setIsExpanded(false);
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error message
      toast.error(error.message || "Failed to add resources");
    }
  };
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const resources = await resourceService.getClassroomResources(
          classCode
        );
        if (resources) {
          setAnnouncements(resources);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);
  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  return (
    <div>
      {/* Announcement Input */}
      {isExpanded ? (
        <Card className="mb-6 shadow-lg rounded-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Enter resource title"
                    className={cn("mb-2", errors.title && "border-red-500")}
                  />
                  {errors.title && (
                    <span className="text-sm text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label htmlFor="text" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="text"
                    {...register("text", {
                      required: "Description is required",
                    })}
                    placeholder="Describe your resources"
                    className={cn(
                      "min-h-[120px]",
                      errors.text && "border-red-500"
                    )}
                  />
                  {errors.text && (
                    <span className="text-sm text-red-500">
                      {errors.text.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="files" className="text-sm font-medium">
                    Resources
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        id="files"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      />
                      <Label
                        htmlFor="files"
                        className="flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload Resources</span>
                      </Label>
                      {fields.length > 0 && (
                        <span className="text-sm text-gray-500">
                          {fields.length} file{fields.length !== 1 ? "s" : ""}{" "}
                          selected
                        </span>
                      )}
                    </div>

                    {/* File List */}
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between p-2 border rounded-lg"
                        >
                          <span className="text-sm truncate">
                            {field.file.name} (
                            {(field.file.size / 1024 / 1024).toFixed(2)}MB)
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setIsExpanded(false);
                    }}
                    className="rounded-lg"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Uploading..." : "Share Resources"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6 shadow-lg rounded-lg">
          <CardContent className="pt-6">
            <Textarea
              placeholder="Share resources with your class"
              className="border border-gray-300 rounded-lg"
              onClick={() => setIsExpanded(true)}
            />
          </CardContent>
        </Card>
      )}

      {/* Announcements */}

      <div>
        {announcements.length > 0 ? (
          announcements.map((resource) => (
            <ResourceCard
              key={resource._id}
              createdAt={resource.createdAt}
              resource={resource.resource}
              fullName={resource.result.fullName}
              profilePicture={resource.result.profileDetails.profilePicture.url}
              text={resource.text}
              title={resource.title}
            />
          ))
        ) : isExpanded ? null : (
          <Card className="bg-white/50 backdrop-blur-sm border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <PlusCircle className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                No resources shared yet
              </CardTitle>
              <p className="text-gray-500 max-w-sm">
                Be the first one to share valuable resources with the community.
                Your contribution could help others learn and grow.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setIsExpanded(true);
                }}
              >
                Share a Resource
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StreamTab;
