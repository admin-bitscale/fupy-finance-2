
import { Home, TrendingUp, CreditCard, Settings, User, PieChart, Receipt, Target } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transações", url: "/transactions", icon: Receipt },
  { title: "Relatórios", url: "/reports", icon: PieChart },
  { title: "Metas", url: "/goals", icon: Target },
  { title: "Contas", url: "/accounts", icon: CreditCard },
]

const settingsItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Perfil", url: "/profile", icon: User },
]

export function AppSidebar() {
  const { state, setOpenMobile } = useSidebar()
  const collapsed = state === "collapsed"
  const isMobile = useIsMobile()

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/30">
      <SidebarContent className="bg-gradient-to-b from-sidebar/95 to-sidebar/90 backdrop-blur-md">
        {/* Logo/Brand */}
        <div className="p-4 sm:p-6 border-b border-sidebar-border/30">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-sidebar-foreground to-sidebar-foreground/80 bg-clip-text text-transparent">Fupy</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-4 flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-sidebar-foreground/70 font-semibold mb-3 px-2">
              Principal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11 rounded-xl">
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group ${
                            isActive 
                              ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-lg backdrop-blur-sm" 
                              : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground text-sidebar-foreground/80 hover:shadow-md"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="text-sm font-medium transition-all duration-200 md:group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Settings */}
        <div className="px-3 py-4 border-t border-sidebar-border/30">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-sidebar-foreground/70 font-semibold mb-3 px-2">
              Configurações
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11 rounded-xl">
                      <NavLink 
                        to={item.url}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group ${
                            isActive 
                              ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-lg backdrop-blur-sm" 
                              : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground text-sidebar-foreground/80 hover:shadow-md"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="text-sm font-medium transition-all duration-200 md:group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
