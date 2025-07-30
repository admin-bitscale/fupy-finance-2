
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Shield, Clock } from "lucide-react";

interface ContactSidebarProps {
  profileData: {
    email: string;
    phone: string;
    address: string;
    birthDate: string;
  };
}

export function ContactSidebar({ profileData }: ContactSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Mail className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium truncate">{profileData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Phone className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Telefone</p>
                <p className="text-sm font-medium">{profileData.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <MapPin className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Localização</p>
                <p className="text-sm font-medium">{profileData.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Calendar className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Aniversário</p>
                <p className="text-sm font-medium">
                  {new Date(profileData.birthDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Status */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Status da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plano</span>
              <Badge variant="default" className="bg-gradient-to-r from-primary to-secondary">
                Premium
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="outline" className="border-green-500/50 text-green-600 bg-green-500/10">
                Ativo
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Membro desde</span>
              <span className="text-sm font-medium">Jan 2024</span>
            </div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Última atividade: há 2 horas
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
