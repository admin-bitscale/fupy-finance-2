
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, X } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "view" | "edit" | "admin";
}

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onSave: (member: Member) => void;
}

export function EditMemberModal({ isOpen, onClose, member, onSave }: EditMemberModalProps) {
  const [formData, setFormData] = useState<Member>({
    id: "",
    name: "",
    email: "",
    phone: "",
    avatar: "",
    role: "view"
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleSave = () => {
    onSave(formData);
  };

  const handleInputChange = (field: keyof Member, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Membro</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-border">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Foto do Perfil</h4>
              <p className="text-sm text-muted-foreground">
                Clique no ícone da câmera para alterar a foto
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Digite o e-mail"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+55 11 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Nível de Acesso</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Visualizar - Apenas leitura</SelectItem>
                  <SelectItem value="edit">Editar - Pode modificar transações</SelectItem>
                  <SelectItem value="admin">Administrador - Acesso completo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
            <Button variant="outline" onClick={onClose} className="gap-2">
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
