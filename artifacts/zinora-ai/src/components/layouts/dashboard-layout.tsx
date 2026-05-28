import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, MessageSquare, Settings, CreditCard, Book, BarChart3, Users, Plug, User, Bell, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: MessageSquare, label: "Conversations", path: "/conversations" },
    { icon: Settings, label: "AI Settings", path: "/ai-settings" },
    { icon: Book, label: "Knowledge Base", path: "/knowledge" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: Plug, label: "Integrations", path: "/integrations" },
    { icon: CreditCard, label: "Billing", path: "/billing" },
  ];

  const bottomNavItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: HelpCircle, label: "Support", path: "/support" },
  ];

  return (
    <div className="min-h-screen flex w-full bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r bg-sidebar text-sidebar-foreground flex flex-col hidden md:flex h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link href="/">
            <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                Z
              </div>
              <span>Zinora AI</span>
            </div>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start ${location === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
                onClick={() => setLocation(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-sidebar-border space-y-1">
          {bottomNavItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`w-full justify-start ${location === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
              onClick={() => setLocation(item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={logout}>
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background flex items-center px-6 sticky top-0 z-10 justify-between md:justify-end">
          <div className="md:hidden font-bold">Zinora AI</div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Search</Button>
            <Button variant="ghost" size="icon" onClick={() => setLocation("/notifications")}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setLocation("/profile")}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
