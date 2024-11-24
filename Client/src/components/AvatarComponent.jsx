import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
const AvatarComponent = ({ profilePicture, fullName }) => {
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
