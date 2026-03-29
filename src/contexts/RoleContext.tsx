import { createContext, useContext, useState, ReactNode } from "react";

export type AppRole = "admin" | "usuario" | "cliente";

interface RoleUser {
  name: string;
  email: string;
  initials: string;
  role: AppRole;
  roleLabel: string;
}

const roleUsers: Record<AppRole, RoleUser> = {
  admin: { name: "Carlos Rodríguez", email: "carlos.r@empresa.com", initials: "CR", role: "admin", roleLabel: "Administrador" },
  usuario: { name: "Ana Martínez", email: "ana.m@empresa.com", initials: "AM", role: "usuario", roleLabel: "Usuario" },
  cliente: { name: "María López", email: "maria.l@cliente.com", initials: "ML", role: "cliente", roleLabel: "Cliente" },
};

interface RoleContextType {
  role: AppRole;
  user: RoleUser;
  setRole: (role: AppRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AppRole>("admin");
  return (
    <RoleContext.Provider value={{ role, user: roleUsers[role], setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
