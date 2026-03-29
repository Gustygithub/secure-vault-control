import { FileText, Send, AlertTriangle, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const chartData = [
  { mes: "Ene", documentos: 45, solicitudes: 12 },
  { mes: "Feb", documentos: 52, solicitudes: 18 },
  { mes: "Mar", documentos: 61, solicitudes: 15 },
  { mes: "Abr", documentos: 78, solicitudes: 22 },
  { mes: "May", documentos: 89, solicitudes: 28 },
  { mes: "Jun", documentos: 95, solicitudes: 24 },
];

const recentActivity = [
  { action: "Documento subido", detail: "Contrato_NDA_2024.pdf", time: "Hace 5 min", type: "info" as const },
  { action: "Solicitud aprobada", detail: "Juan Pérez — Informe Financiero Q4", time: "Hace 12 min", type: "success" as const },
  { action: "Incidente reportado", detail: "Acceso no autorizado detectado", time: "Hace 30 min", type: "danger" as const },
  { action: "Certificación emitida", detail: "Acta Junta Directiva #089", time: "Hace 1 hora", type: "success" as const },
  { action: "Solicitud pendiente", detail: "María López — Política de Seguridad", time: "Hace 2 horas", type: "warning" as const },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen general de la plataforma</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <StatCard title="Documentos totales" value={1247} icon={FileText} trend={{ value: "+12.5% este mes", positive: true }} />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Solicitudes pendientes" value={23} icon={Send} trend={{ value: "5 nuevas hoy", positive: true }} />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Incidentes activos" value={3} icon={AlertTriangle} trend={{ value: "-2 esta semana", positive: true }} />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Certificaciones" value={456} icon={ShieldCheck} trend={{ value: "+8 este mes", positive: true }} />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">Documentos por mes</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Bar dataKey="documentos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">Solicitudes de acceso</h3>
            <Send className="h-4 w-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Line type="monotone" dataKey="solicitudes" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: "hsl(var(--secondary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-xl border border-border p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-card-foreground">Actividad reciente</h3>
        </div>
        <div className="space-y-3">
          {recentActivity.map((act, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <StatusBadge variant={act.type}>{act.action}</StatusBadge>
                <span className="text-sm text-card-foreground">{act.detail}</span>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{act.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
