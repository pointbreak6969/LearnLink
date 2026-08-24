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

export function AppSidebar({ sidebarOpen, setSidebarOpen}) {
  const userProfile=useSelector((state)=>state.profile?.profileDetails?.profilePicture?.url)

  return (
    <Sidebar side="right"  open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild><Link to={'/login'} onClick={()=>setSidebarOpen(false)}>Login</Link></SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild><Link to={'/signup'}>Signup</Link></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent >
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
      <SidebarSeparator/>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={'/profile'} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-brand-50">
              <img src={userProfile} className="h-9 w-9 rounded-full object-cover bg-ink-100"/>
              <p className="font-medium text-ink-800">Profile</p>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
