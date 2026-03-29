import { Send, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";
import { useState } from "react";

const initialRequests = [
  { id: 1, user: "Juan Pérez", document: "Informe_Financiero_Q4.pdf", date: "2024-03-15", reason: "Revisión trimestral de resultados", status: "Pendiente" as const },
  { id: 2, user: "María López", document: "Política_Seguridad_v3.pdf", date: "2024-03-14", reason: "Actualización de políticas internas", status: "Pendiente" as const },
  { id: 3, user: "Carlos García", document: "Contrato_NDA_2024.pdf", date: "2024-03-13", reason: "Due diligence con proveedor", status: "Aprobado" as const },
  { id: 4, user: "Ana Rodríguez", document: "Auditoría_Interna_2024.pdf", date: "2024-03-12", reason: "Preparación de informe de auditoría", status: "Rechazado" as const },
  { id: 5, user: "Luis Hernández", document: "Plan_Contingencia.pdf", date: "2024-03-11", reason: "Actualización del BCP", status: "Pendiente" as const },
];

const statusVariant = { Pendiente: "warning", Aprobado: "success", Rechazado: "danger" } as const;

export default function Requests() {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id: number, action: "Aprobado" | "Rechazado") => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Solicitudes de Acceso</h1>
        <p className="text-sm text-muted-foreground">Gestión de solicitudes de acceso a documentos</p>
      </div>

      <div className="space-y-3">
        {requests.map((req, i) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-card-foreground">{req.user}</span>
                  <StatusBadge variant={statusVariant[req.status]}>{req.status}</StatusBadge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Solicita acceso a <span className="font-medium text-card-foreground">{req.document}</span>
                </p>
                <p className="text-xs text-muted-foreground">{req.reason}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {req.date}
                </p>
              </div>
              {req.status === "Pendiente" && (
                <div className="flex gap-2">
                  <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleAction(req.id, "Aprobado")}>
                    <Check className="h-4 w-4 mr-1" /> Aprobar
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleAction(req.id, "Rechazado")}>
                    <X className="h-4 w-4 mr-1" /> Rechazar
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
