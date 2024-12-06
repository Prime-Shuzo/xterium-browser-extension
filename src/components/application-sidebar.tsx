import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import IndexChangePassword from "@/pages/application/change-password";
import IndexPages from "@/pages";
import { cn } from "@/lib/utils";
import XteriumLogo from "data-base64:/assets/app-logo/xterium-logo.png";
import {
  Check,
  ChevronsUpDown,
  ChevronUp,
  Coins,
  DollarSign,
  MessageCircle,
  Network,
  User,
  Wallet,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
 
const applicationItems = [
  {
    title: "Balance",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Tokens",
    url: "#",
    icon: Coins,
  },
  {
    title: "Network Status",
    url: "#",
    icon: Network,
  },
  {
    title: "ImUrAi",
    url: "#",
    icon: MessageCircle,
  },
];
 
const setupItems = [
  {
    title: "Wallets",
    url: "#",
    icon: Wallet,
  },
];
 
const ApplicationSidebar = ({ onSetCurrentPage }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  const { setTheme } = useTheme();
  const [activeItem, setActiveItem] = useState<string>("");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <img src={XteriumLogo} className="w-full p-4" alt="Xterium Logo" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {applicationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => {
                        setActiveItem(item.title);
                        onSetCurrentPage(item.title);
                      }}
                    >
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center space-x-2 p-3 text-sm",
                          activeItem === item.title
                            ? "text-purple bg-sidebar-accent"
                            : "" 
                        )}
                      >
                        <div
                          className={cn(
                            "rounded ", 
                            activeItem === item.title
                              ? "text-white bg-[var(--sidebar-icon-background)]" 
                              : "bg-transparent primary"
                          )}
                        >
                          <item.icon
                            className={cn(
                              activeItem === item.title
                                ? "primary" 
                                : "primary" ,
                              "rounded",
                              "px-1"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            activeItem === item.title
                              ? "text-purple"
                              : "primary" 
                          )}
                        >
                          {item.title}
                        </span>
                        {activeItem === item.title && (
                          <div className="absolute right-2 w-1 h-4 rounded active-item" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Setup</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {setupItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => {
                        setActiveItem(item.title); 
                        onSetCurrentPage(item.title);
                      }}
                    >
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center space-x-2 p-3 text-sm",
                          activeItem === item.title
                            ? "text-purple bg-sidebar-accent" 
                            : "" 
                        )}
                      >
                        <div
                          className={cn(
                            "rounded ", 
                            activeItem === item.title
                              ? "primary bg-[var(--sidebar-icon-background)]" 
                              : "bg-transparent primary" 
                          )}
                        >
                          <item.icon
                            className={cn(
                              activeItem === item.title
                                ? "primary" 
                                : "primary" ,
                              "rounded",
                              "px-1"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            activeItem === item.title
                              ? "text-purple" 
                              : "primary"
                          )}
                        >
                          {item.title}
                        </span>
                        {activeItem === item.title && (
                          <div className="absolute right-2 w-1 h-4 rounded active-item" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleDrawer}>
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSetCurrentPage("login")}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <IndexChangePassword
        isDrawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default ApplicationSidebar;