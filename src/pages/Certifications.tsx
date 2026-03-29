import { useState } from "react";
import { ShieldCheck, Search, CheckCircle2, XCircle, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion, AnimatePresence } from "framer-motion";

const certifications = [
  { code: "SV-CERT-2024-001", document: "Acta_Junta_089.pdf", date: "2024-03-15", hash: "a7ffc6f8bf1ed766...f8434a" },
  { code: "SV-CERT-2024-002", document: "Contrato_NDA_2024.pdf", date: "2024-03-14", hash: "2cf24dba5fb0a30e...8b9824" },
  { code: "SV-CERT-2024-003", document: "Política_Seguridad_v3.pdf", date: "2024-03-12", hash: "e3b0c44298fc1c14...b855a2" },
];

export default function Certifications() {
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyResult, setVerifyResult] = useState<"valid" | "invalid" | null>(null);

  const handleVerify = () => {
    if (!verifyCode.trim()) return;
    const found = certifications.some((c) => c.code.toLowerCase() === verifyCode.trim().toLowerCase());
    setVerifyResult(found ? "valid" : "invalid");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Certificaciones</h1>
        <p className="text-sm text-muted-foreground">Verificación y certificación de documentos</p>
      </div>

      {/* Verification section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Verificar documento</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Ingrese el código de verificación o hash SHA-256 para validar la autenticidad del documento.
        </p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ej: SV-CERT-2024-001"
              value={verifyCode}
              onChange={(e) => { setVerifyCode(e.target.value); setVerifyResult(null); }}
              className="pl-9"
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            />
          </div>
          <Button onClick={handleVerify} className="gradient-primary text-primary-foreground">
            <Search className="h-4 w-4 mr-2" />
            Verificar
          </Button>
        </div>
        <AnimatePresence>
          {verifyResult && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                verifyResult === "valid"
                  ? "bg-success/10 border border-success/20"
                  : "bg-destructive/10 border border-destructive/20"
              }`}
            >
              {verifyResult === "valid" ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-semibold text-success">✔ Documento válido</p>
                    <p className="text-sm text-muted-foreground">La certificación ha sido verificada exitosamente.</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-semibold text-destructive">✖ Documento no encontrado</p>
                    <p className="text-sm text-muted-foreground">No se encontró una certificación con ese código.</p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Certifications list */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-card-foreground">Certificaciones emitidas</h3>
        </div>
        <div className="divide-y divide-border">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <StatusBadge variant="success">Certificado</StatusBadge>
                  <span className="font-mono text-sm font-semibold text-card-foreground">{cert.code}</span>
                </div>
                <p className="text-sm text-muted-foreground">{cert.document}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-xs text-muted-foreground">{cert.date}</p>
                <p className="text-xs font-mono text-muted-foreground">{cert.hash}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
