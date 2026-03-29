import { useState } from "react";
import { AlertTriangle, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";

const incidents = [
  { id: 1, title: "Acceso no autorizado a documento confidencial", status: "Abierto", assignee: "Carlos Rodríguez", priority: "critical" as const, date: "2024-03-15" },
  { id: 2, title: "Fallo en la verificación de hash SHA-256", status: "En progreso", assignee: "Ana Martínez", priority: "high" as const, date: "2024-03-14" },
  { id: 3, title: "Permiso expirado no revocado automáticamente", status: "En progreso", assignee: "Luis Hernández", priority: "medium" as const, date: "2024-03-13" },
  { id: 4, title: "Documento corrupto detectado en storage", status: "Cerrado", assignee: "María López", priority: "high" as const, date: "2024-03-10" },
  { id: 5, title: "Timeout en generación de certificación", status: "Abierto", assignee: "Juan Pérez", priority: "low" as const, date: "2024-03-09" },
];

const statusFilters = ["Todos", "Abierto", "En progreso", "Cerrado"];
const statusVariant = { Abierto: "danger", "En progreso": "warning", Cerrado: "success" } as const;

export default function Incidents() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filtered = activeFilter === "Todos" ? incidents : incidents.filter((i) => i.status === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Incidentes</h1>
          <p className="text-sm text-muted-foreground">Sistema de gestión de incidentes documentales</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Reportar incidente
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((f) => (
          <Button
            key={f}
            variant={activeFilter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(f)}
            className={activeFilter === f ? "gradient-primary text-primary-foreground" : ""}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((inc, i) => (
          <motion.div
            key={inc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge variant={inc.priority}>{inc.priority.toUpperCase()}</StatusBadge>
                  <StatusBadge variant={statusVariant[inc.status as keyof typeof statusVariant]}>{inc.status}</StatusBadge>
                </div>
                <h3 className="font-semibold text-card-foreground">{inc.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{inc.assignee}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{inc.date}</span>
                </div>
              </div>
              <span className="text-sm font-mono text-muted-foreground">INC-{String(inc.id).padStart(4, "0")}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
