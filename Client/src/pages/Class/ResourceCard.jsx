import React from 'react';
import { MoreVertical, Share, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const formatDate = (mongoDate) => {
  const date = new Date(mongoDate);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const ResourceCard = ({
  title,
  text,
  resource = [],
  createdAt,
  fullName,
  profilePicture,
}) => {
  const handleResourceClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start p-4 space-x-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={profilePicture} alt={fullName} />
          <AvatarFallback>{fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div>
              <div className="font-medium">{fullName}</div>
              <div className="text-sm text-gray-500">{formatDate(createdAt)}</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {title && (
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
          )}
          {text && (
            <p className="text-gray-600 mb-4">{text}</p>
          )}
          {resource.length > 0 && (
            <div className="space-y-2">
              {resource.map((url, index) => (
                <div
                  key={index}
                  onClick={() => handleResourceClick(url)}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="text-blue-600 hover:text-blue-800 truncate max-w-md">
                    {url}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;