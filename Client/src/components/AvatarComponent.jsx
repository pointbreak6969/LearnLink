import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
const AvatarComponent = ({ profilePicture, fullName }) => {
  return (
    <Avatar className="h-10 w-10 flex-shrink-0">
      <AvatarImage src={profilePicture} />
      <AvatarFallback className="bg-brand-100 text-brand-700 font-medium">
        {fullName
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};
export default AvatarComponent;
