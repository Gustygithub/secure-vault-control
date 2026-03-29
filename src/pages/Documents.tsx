import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Search, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";

const documents = [
  { id: "1", name: "Contrato_NDA_2024.pdf", level: "alto" as const, date: "2024-03-15", status: "Activo", size: "2.4 MB" },
  { id: "2", name: "Informe_Financiero_Q4.pdf", level: "crítico" as const, date: "2024-03-14", status: "Activo", size: "5.1 MB" },
  { id: "3", name: "Política_Seguridad_v3.pdf", level: "medio" as const, date: "2024-03-12", status: "Activo", size: "1.8 MB" },
  { id: "4", name: "Acta_Junta_089.pdf", level: "alto" as const, date: "2024-03-10", status: "Certificado", size: "890 KB" },
  { id: "5", name: "Manual_Empleados.pdf", level: "bajo" as const, date: "2024-03-08", status: "Activo", size: "3.2 MB" },
  { id: "6", name: "Auditoría_Interna_2024.pdf", level: "crítico" as const, date: "2024-03-05", status: "Activo", size: "7.6 MB" },
  { id: "7", name: "Contrato_Proveedor_ABC.pdf", level: "medio" as const, date: "2024-03-01", status: "Expirado", size: "1.1 MB" },
  { id: "8", name: "Plan_Contingencia.pdf", level: "alto" as const, date: "2024-02-28", status: "Activo", size: "4.3 MB" },
];

const levelMap = { bajo: "low", medio: "medium", alto: "high", "crítico": "critical" } as const;

const filters = ["Todos", "Bajo", "Medio", "Alto", "Crítico"];

export default function Documents() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const navigate = useNavigate();

  const filtered = activeFilter === "Todos"
    ? documents
    : documents.filter((d) => d.level.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documentos</h1>
          <p className="text-sm text-muted-foreground">Gestión de documentos corporativos</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Upload className="h-4 w-4 mr-2" />
          Subir documento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar documentos..." className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
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
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nombre</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confidencialidad</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tamaño</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc, i) => (
              <motion.tr
                key={doc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => navigate(`/documents/${doc.id}`)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">{doc.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge variant={levelMap[doc.level]}>{doc.level.toUpperCase()}</StatusBadge>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{doc.date}</td>
                <td className="py-3 px-4">
                  <StatusBadge variant={doc.status === "Activo" ? "success" : doc.status === "Certificado" ? "info" : "warning"}>
                    {doc.status}
                  </StatusBadge>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">{doc.size}</td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-card rounded-xl border border-border p-4 shadow-card cursor-pointer hover:shadow-elevated transition-shadow"
            onClick={() => navigate(`/documents/${doc.id}`)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-card-foreground">{doc.name}</span>
              </div>
              <StatusBadge variant={levelMap[doc.level]}>{doc.level.toUpperCase()}</StatusBadge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{doc.date}</span>
              <span>{doc.size}</span>
              <StatusBadge variant={doc.status === "Activo" ? "success" : "warning"}>{doc.status}</StatusBadge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
