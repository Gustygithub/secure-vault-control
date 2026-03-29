import { ClipboardList, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";

const logs = [
  { id: 1, action: "LOGIN", user: "admin@securevault.com", detail: "Inicio de sesión exitoso", ip: "192.168.1.45", date: "2024-03-15 14:32:10" },
  { id: 2, action: "UPLOAD", user: "carlos.r@empresa.com", detail: "Contrato_NDA_2024.pdf subido", ip: "10.0.0.22", date: "2024-03-15 14:28:05" },
  { id: 3, action: "ACCESS", user: "juan.p@empresa.com", detail: "Acceso a Informe_Financiero_Q4.pdf", ip: "10.0.0.18", date: "2024-03-15 14:15:33" },
  { id: 4, action: "APPROVE", user: "admin@securevault.com", detail: "Solicitud #12 aprobada", ip: "192.168.1.45", date: "2024-03-15 13:50:00" },
  { id: 5, action: "CERTIFY", user: "ana.m@empresa.com", detail: "Certificación SV-CERT-2024-003 emitida", ip: "10.0.0.30", date: "2024-03-15 13:22:18" },
  { id: 6, action: "REJECT", user: "admin@securevault.com", detail: "Solicitud #11 rechazada", ip: "192.168.1.45", date: "2024-03-15 12:45:22" },
  { id: 7, action: "DELETE", user: "admin@securevault.com", detail: "Documento_temporal.pdf eliminado", ip: "192.168.1.45", date: "2024-03-15 11:30:00" },
];

const actionVariant: Record<string, "info" | "success" | "warning" | "danger" | "neutral"> = {
  LOGIN: "info", UPLOAD: "success", ACCESS: "neutral", APPROVE: "success", CERTIFY: "success", REJECT: "warning", DELETE: "danger",
};

export default function Audit() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Auditoría</h1>
          <p className="text-sm text-muted-foreground">Registro completo de acciones en la plataforma</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar logs
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acción</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Usuario</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Detalle</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">IP</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha / Hora</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3 px-4"><StatusBadge variant={actionVariant[log.action]}>{log.action}</StatusBadge></td>
                  <td className="py-3 px-4 text-sm font-mono text-card-foreground">{log.user}</td>
                  <td className="py-3 px-4 text-sm text-card-foreground">{log.detail}</td>
                  <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{log.ip}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">{log.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
