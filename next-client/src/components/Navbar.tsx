"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import authService from "@/services/auth";
export default function Navbar() {
  const router = useRouter();
  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
  
  console.log("Current User:", currentUser.data);
  
  const handleNavigation = () => {
    if (currentUser.data) {
      router.push("/classroom");
    } else {
      router.push("/");
    }
  };
  return (
    <div>
      {/* Top Banner */}
      <div className="bg-orange-900 text-white text-xs py-1 px-4">
        <div className="container mx-auto text-center">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <span className="float-right">-&gt;</span>
        </div>
      </div>

      <header className="bg-gradient-to-b from-orange-500 to bg-red-400 text-white py-2">
        <div className="flex justify-around items-center  md:hidden">
          <div className="text-2xl font-bold" aria-label="Logo">
            <button className="ml-8" onClick={handleNavigation}>
              L-earn
            </button>
          </div>
          {/* <div>
            <SidebarProvider>
            <AppSidebar  /> 
          
              <SidebarTrigger  />
            </SidebarProvider>
          </div> */}
        </div>

        <div className="hidden container mx-auto px-15 md:flex justify-around items-center">
          <div className="text-2xl font-bold" aria-label="Logo">
            <button onClick={handleNavigation}>L-earn</button>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4 text-lg">
            <ul className="flex space-x-4">
              {!currentUser.data && (
                <Link href="/" className="cursor-pointer hover:text-orange-200">
                  Home
                </Link>
              )}
              <Link
                href="/courses"
                className="cursor-pointer hover:text-orange-200"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="cursor-pointer hover:text-orange-200"
              >
                About Us
              </Link>
              {
                 currentUser.data ? (
                   <>
                     <Link
                       href="/classroom"
                       className="cursor-pointer hover:text-orange-200"
                     >
                       Classroom
                     </Link>
                     <Link
                       href="/searchclassrooms"
                       className="cursor-pointer hover:text-orange-200"
                     >
                       Search
                     </Link>
                   </>
                 ) : null
              }
            </ul>
          </nav>

          <div className="space-x-2 hidden md:block">
            {!currentUser.data ? (
              <>
                <Button
                  variant="ghost"
                  className="border-white text-lg hover:bg-orange-600"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="default"
                  className="border-white text-white text-lg hover:bg-orange-600 bg-orange-500"
                >
                  <Link href="/signin">Log In</Link>
                </Button>
              </>
            ) : (
              <div className="mr-auto">
                <UserAvatar />
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
