import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, Shield, LogOut, Settings, User, ChevronDown, ArrowRightLeft, Moon, Sun, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useRole, type AppRole } from "@/contexts/RoleContext";
import { useTheme } from "@/contexts/ThemeContext";
import { StatusBadge } from "@/components/ui/status-badge";

const roleBadgeVariant: Record<AppRole, "info" | "success" | "neutral" | "warning"> = {
  admin: "info",
  usuario: "success",
  cliente: "neutral",
  notario: "warning",
};

export function DashboardLayout() {
  const navigate = useNavigate();
  const { role, user, setRole } = useRole();
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 gap-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2 md:hidden">
                <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm text-foreground">SecureVault</span>
              </div>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos, solicitudes..."
                  className="pl-9 w-72 h-9 bg-muted/50 border-transparent focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8" title={theme === "light" ? "Modo oscuro" : "Modo claro"}>
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              {/* Role Switcher (demo) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
                    <ArrowRightLeft className="h-3 w-3" />
                    <span className="hidden sm:inline">Demo:</span>
                    <StatusBadge variant={roleBadgeVariant[role]}>{user.roleLabel}</StatusBadge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">Cambiar vista (demo)</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRole("admin")} className={`cursor-pointer ${role === "admin" ? "bg-accent" : ""}`}>
                    <Shield className="mr-2 h-4 w-4 text-primary" /> Administrador
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRole("usuario")} className={`cursor-pointer ${role === "usuario" ? "bg-accent" : ""}`}>
                    <User className="mr-2 h-4 w-4 text-secondary" /> Usuario
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRole("cliente")} className={`cursor-pointer ${role === "cliente" ? "bg-accent" : ""}`}>
                    <User className="mr-2 h-4 w-4 text-muted-foreground" /> Cliente
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRole("notario")} className={`cursor-pointer ${role === "notario" ? "bg-accent" : ""}`}>
                    <Scale className="mr-2 h-4 w-4 text-warning" /> Notario/Certificador
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 h-9">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{user.initials}</span>
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground leading-tight">{user.name}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{user.company} · {user.roleLabel}</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground font-medium">{user.company}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mi perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => navigate("/")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
