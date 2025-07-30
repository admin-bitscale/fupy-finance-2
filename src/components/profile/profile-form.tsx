
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Building } from "lucide-react";

interface ProfileFormProps {
  profileData: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    profession: string;
    company: string;
    address: string;
    bio: string;
  };
  isEditing: boolean;
  onUpdateData: (data: any) => void;
}

export function ProfileForm({ profileData, isEditing, onUpdateData }: ProfileFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Nome Completo
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => onUpdateData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
                className={isEditing ? "border-primary/50 focus:border-primary" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => onUpdateData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                className={isEditing ? "border-primary/50 focus:border-primary" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => onUpdateData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                className={isEditing ? "border-primary/50 focus:border-primary" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Data de Nascimento
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={profileData.birthDate}
                onChange={(e) => onUpdateData({ ...profileData, birthDate: e.target.value })}
                disabled={!isEditing}
                className={isEditing ? "border-primary/50 focus:border-primary" : ""}
              />
            </div>
          </div>

          <Separator />

          {/* Professional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Informações Profissionais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="profession" className="flex items-center gap-2 text-sm font-medium">
                  <Briefcase className="h-4 w-4" />
                  Profissão
                </Label>
                <Input
                  id="profession"
                  value={profileData.profession}
                  onChange={(e) => onUpdateData({ ...profileData, profession: e.target.value })}
                  disabled={!isEditing}
                  className={isEditing ? "border-primary/50 focus:border-primary" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                  <Building className="h-4 w-4" />
                  Empresa
                </Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) => onUpdateData({ ...profileData, company: e.target.value })}
                  disabled={!isEditing}
                  className={isEditing ? "border-primary/50 focus:border-primary" : ""}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Location & Bio */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4" />
                Endereço
              </Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => onUpdateData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                className={isEditing ? "border-primary/50 focus:border-primary" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">Biografia</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => onUpdateData({ ...profileData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className={isEditing ? "border-primary/50 focus:border-primary resize-none" : "resize-none"}
                placeholder="Conte um pouco sobre você..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
