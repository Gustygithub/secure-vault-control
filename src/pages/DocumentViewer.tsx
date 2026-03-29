import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Send, FileText, Lock, Hash, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";

const docData: Record<string, { name: string; level: string; hash: string; date: string; owner: string; status: string; size: string }> = {
  "1": { name: "Contrato_NDA_2024.pdf", level: "ALTO", hash: "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a", date: "2024-03-15", owner: "Carlos Rodríguez", status: "Activo", size: "2.4 MB" },
  "2": { name: "Informe_Financiero_Q4.pdf", level: "CRÍTICO", hash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824", date: "2024-03-14", owner: "Ana Martínez", status: "Activo", size: "5.1 MB" },
};

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doc = docData[id || "1"] || docData["1"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/documents")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">{doc.name}</h1>
          <p className="text-sm text-muted-foreground">Visor de documento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PDF Viewer area */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="bg-muted/30 border-b border-border px-4 py-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-card-foreground">Vista previa</span>
          </div>
          <div className="h-[600px] flex items-center justify-center bg-muted/10">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Vista previa del documento PDF</p>
              <p className="text-xs text-muted-foreground">{doc.name} · {doc.size}</p>
            </div>
          </div>
        </div>

        {/* Metadata panel */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-4">
            <h3 className="font-semibold text-card-foreground">Metadata</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Nivel de seguridad</p>
                  <StatusBadge variant={doc.level === "CRÍTICO" ? "critical" : "high"}>{doc.level}</StatusBadge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Fecha de subida</p>
                  <p className="text-sm text-card-foreground">{doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Propietario</p>
                  <p className="text-sm text-card-foreground">{doc.owner}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Hash SHA-256</p>
                  <p className="text-xs font-mono text-card-foreground break-all">{doc.hash}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full gradient-primary text-primary-foreground">
              <Send className="h-4 w-4 mr-2" />
              Solicitar acceso
            </Button>
            <Button variant="outline" className="w-full">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Certificar documento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
