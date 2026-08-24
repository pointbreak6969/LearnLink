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
import { FaFilePdf } from 'react-icons/fa'; // PDF icon

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
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start p-4 space-x-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={profilePicture} alt={fullName} />
          <AvatarFallback className="bg-brand-100 text-brand-700">{fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <div>
              <div className="font-medium text-ink-900">{fullName}</div>
              <div className="text-sm text-ink-400">{formatDate(createdAt)}</div>
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
            <h3 className="text-lg font-semibold mb-2 text-ink-900">{title}</h3>
          )}
          {text && (
            <p className="text-ink-600 mb-4">{text}</p>
          )}
          {resource.length > 0 && (
            <div className="flex items-center flex-wrap gap-3">
              {resource.map((url, index) => (
                <div
                  key={index}
                  onClick={() => handleResourceClick(url)}
                  className="flex items-center justify-center p-3 rounded-xl border border-ink-100 hover:border-brand-300 hover:bg-brand-50 transition-colors cursor-pointer"
                >
                  <FaFilePdf className="w-12 h-12 text-red-500" />
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
