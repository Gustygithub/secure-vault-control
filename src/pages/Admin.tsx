import { Users, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";

const users = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos.r@empresa.com", role: "Admin", status: "Activo", lastLogin: "2024-03-15" },
  { id: 2, name: "Ana Martínez", email: "ana.m@empresa.com", role: "Revisor", status: "Activo", lastLogin: "2024-03-15" },
  { id: 3, name: "Juan Pérez", email: "juan.p@empresa.com", role: "Usuario", status: "Activo", lastLogin: "2024-03-14" },
  { id: 4, name: "María López", email: "maria.l@empresa.com", role: "Usuario", status: "Activo", lastLogin: "2024-03-13" },
  { id: 5, name: "Luis Hernández", email: "luis.h@empresa.com", role: "Revisor", status: "Inactivo", lastLogin: "2024-02-28" },
];

const roleVariant: Record<string, "info" | "warning" | "neutral"> = { Admin: "info", Revisor: "warning", Usuario: "neutral" };

export default function Admin() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel Administrador</h1>
          <p className="text-sm text-muted-foreground">Gestión de usuarios y roles</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Agregar usuario
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nombre</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rol</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Último acceso</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4"><StatusBadge variant={roleVariant[user.role]}>{user.role}</StatusBadge></td>
                  <td className="py-3 px-4">
                    <StatusBadge variant={user.status === "Activo" ? "success" : "neutral"}>{user.status}</StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{user.lastLogin}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
