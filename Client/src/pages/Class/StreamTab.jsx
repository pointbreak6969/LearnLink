import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, FileText } from "lucide-react";

const StreamTab = ({ announcements = [] }) => {
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* Announcement Input */}
      <Card className="mb-6 shadow-lg rounded-lg">
        <CardContent className="pt-6">
          <form onSubmit={handlePostAnnouncement}>
            <div className="flex flex-col md:flex-row items-center space-x-4 mb-4">
              <Avatar className="mb-2 md:mb-0">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="Announce something to your class"
                className="flex-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white rounded-lg"
              >
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Announcements */}
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="mb-6 shadow-lg rounded-lg">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt={announcement.user}
                  />
                  <AvatarFallback>{announcement.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#FF9500]">
                    {announcement.user}
                  </h3>
                  <p className="text-sm text-gray-500">{announcement.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <p className="mb-4">{announcement.content}</p>
            {announcement.attachment && (
              <Card className="bg-gray-100 rounded-lg">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-gray-200 p-2 rounded">
                    <FileText className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{announcement.attachment.name}</p>
                    <p className="text-sm text-gray-500">
                      {announcement.attachment.type}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StreamTab;