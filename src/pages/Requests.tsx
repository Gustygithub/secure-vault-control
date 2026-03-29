import { Send, Check, X, Clock, Mail, KeyRound, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const initialRequests = [
  { id: 1, user: "Juan Pérez", company: "DHL Express", document: "Informe_Financiero_Q4.pdf", date: "2024-03-15", reason: "Revisión trimestral de resultados", status: "Pendiente" as const },
  { id: 2, user: "María López", company: "FedEx Logistics", document: "Política_Seguridad_v3.pdf", date: "2024-03-14", reason: "Actualización de políticas internas", status: "Pendiente" as const },
  { id: 3, user: "Carlos García", company: "Maersk", document: "Contrato_NDA_2024.pdf", date: "2024-03-13", reason: "Due diligence con proveedor", status: "Aprobado" as const },
  { id: 4, user: "Ana Rodríguez", company: "DHL Express", document: "Auditoría_Interna_2024.pdf", date: "2024-03-12", reason: "Preparación de informe de auditoría", status: "Rechazado" as const },
  { id: 5, user: "Luis Hernández", company: "UPS Supply Chain", document: "Plan_Contingencia.pdf", date: "2024-03-11", reason: "Actualización del BCP", status: "Pendiente" as const },
];

const statusVariant = { Pendiente: "warning", Aprobado: "success", Rechazado: "danger" } as const;

export default function Requests() {
  const [requests, setRequests] = useState(initialRequests);
  const [accessDialog, setAccessDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof initialRequests[0] | null>(null);
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleAction = (id: number, action: "Aprobado" | "Rechazado") => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
  };

  const openAccessDialog = (req: typeof initialRequests[0]) => {
    setSelectedRequest(req);
    setAccessDialog(true);
    setPin("");
    setEmail("");
  };

  const handlePinSubmit = () => {
    if (pin.length === 6) {
      toast({ title: "PIN enviado", description: `Verificando acceso para ${selectedRequest?.document}` });
      setAccessDialog(false);
    }
  };

  const handleEmailSubmit = () => {
    if (email.trim()) {
      toast({ title: "Enlace enviado", description: `Se envió un enlace de acceso a ${email}` });
      setAccessDialog(false);
    }
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
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> {req.company}
                  </span>
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
              <div className="flex gap-2">
                {req.status === "Pendiente" && (
                  <>
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleAction(req.id, "Aprobado")}>
                      <Check className="h-4 w-4 mr-1" /> Aprobar
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleAction(req.id, "Rechazado")}>
                      <X className="h-4 w-4 mr-1" /> Rechazar
                    </Button>
                  </>
                )}
                {req.status === "Aprobado" && (
                  <Button size="sm" variant="outline" onClick={() => openAccessDialog(req)}>
                    <KeyRound className="h-4 w-4 mr-1" /> Solicitar acceso
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Access Dialog */}
      <Dialog open={accessDialog} onOpenChange={setAccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar acceso al documento</DialogTitle>
            <DialogDescription>
              Verificación requerida para acceder a <strong>{selectedRequest?.document}</strong>
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="pin" className="mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pin" className="gap-1.5"><KeyRound className="h-3.5 w-3.5" /> Código PIN</TabsTrigger>
              <TabsTrigger value="email" className="gap-1.5"><Mail className="h-3.5 w-3.5" /> Correo electrónico</TabsTrigger>
            </TabsList>
            <TabsContent value="pin" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Ingrese el código de 6 dígitos</Label>
                <p className="text-xs text-muted-foreground">Se envió un código al administrador del documento</p>
                <div className="flex justify-center py-2">
                  <InputOTP maxLength={6} value={pin} onChange={setPin}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={handlePinSubmit} disabled={pin.length !== 6}>
                Verificar PIN
              </Button>
            </TabsContent>
            <TabsContent value="email" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="access-email">Correo del administrador</Label>
                <p className="text-xs text-muted-foreground">Se enviará un enlace de acceso temporal al correo indicado</p>
                <Input id="access-email" type="email" placeholder="admin@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={handleEmailSubmit} disabled={!email.trim()}>
                <Mail className="h-4 w-4 mr-2" /> Enviar enlace
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
