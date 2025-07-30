
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/layout/search-bar";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <SidebarProvider>
      <MobileNavigationHandler />
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Fixed Header with Glass Effect - 2 Rows */}
          <motion.header 
            className="fixed top-0 right-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-md"
            style={{
              width: isMobile ? '100%' : 'calc(100% - var(--sidebar-width, 16rem))',
              left: isMobile ? '0' : 'var(--sidebar-width, 16rem)'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/2 to-secondary/2" />
            
            {/* Row 1: Menu Button (mobile) + Profile, Theme Toggle */}
            <div className="relative z-10 flex items-center justify-between h-12 px-3 sm:px-4 lg:px-6 border-b border-border/10">
              {/* Menu button for mobile */}
              <div className="flex items-center">
                {isMobile && (
                  <SidebarTrigger className="h-8 w-8 mr-2" />
                )}
                {!isMobile && <div className="w-2" />}
              </div>
              
              {/* Centered elements - flexible spacing */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 flex-1">
                <div className="relative">
                  <ProfileDropdown />
                </div>
                <ThemeToggle />
              </div>
              
              {/* Right spacer */}
              <div className="w-2" />
            </div>

            {/* Row 2: Search Bar - Centered */}
            <div className="relative z-10 flex items-center justify-center h-14 px-3 sm:px-4 lg:px-6">
              <div className="w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <SearchBar />
              </div>
            </div>
          </motion.header>

          {/* Main Content with top padding for fixed header (2 rows = 104px) */}
          <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-primary/2 pt-[104px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-full"
            >
              {/* Background patterns */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="relative z-10 p-3 sm:p-4 lg:p-6">
                {children}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Component to handle mobile navigation auto-close
function MobileNavigationHandler() {
  const { setOpen } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [location.pathname, isMobile, setOpen]);

  return null;
}
