import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Courses",
    url: "/courses",
  },
  {
    title: "About Us",
    url: "/about",
  },

  {
    title: "Contact",
    url: "/contact",
  },
  {
    title: "Classroom",
    url: "/classroom",
  },
  {
    title: "Search Classrooms",
    url: "/searchclassrooms",
  },
  {
    title: "Reward",
    url: "/reward",
  },
];

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const userProfile = useSelector(
    (state) => state.profile?.profileDetails?.profilePicture?.url
  );

  return (
    <Sidebar
      side="right"
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {" "}
              <Link to={"/login"} ocClick={() => setSidebarOpen(false)}>
                Login{" "}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {" "}
              <Link to={"/signup"}> Signup</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={"/profile"} a className="flex">
              <img src={userProfile} className="h-10 w-10 rounded-full" />
              <p className="mt-2 ml-2">Profile</p>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
