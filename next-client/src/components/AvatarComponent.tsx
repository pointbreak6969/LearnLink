import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
interface AvatarComponentProps {
  profilePicture?: string;
  fullName?: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({
  profilePicture,
  fullName,
}) => {
  return (
    <Avatar className="h-10 w-10 flex-shrink-0">
      <AvatarImage src={profilePicture} />
      <AvatarFallback>
        {fullName
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};
export default AvatarComponent;
