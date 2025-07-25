"use client";
import { LifeBuoy, LogOut, Settings, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeletion";
export default function UserAvatar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
  const { mutate: logoutUser } = useMutation({
    mutationFn: authService.logoutUser,
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
        >
          {isPending ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              <AvatarImage src={currentUser?.profilePicture} className="h-full w-full object-cover" />
              <AvatarFallback className="flex items-center justify-center h-full w-full bg-primary text-primary-foreground font-semibold">
                {currentUser?.fullName
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/profile");
            }}
          >
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/reward");
            }}
          >
            <CreditCard />
            <span>Rewards</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/contact");
          }}
        >
          <LifeBuoy />
          <span>Contact</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutUser()}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
