
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Edit, Phone, Mail, Trash2, UserPlus } from "lucide-react";
import { EditMemberModal } from "./edit-member-modal";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "view" | "edit" | "admin";
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@exemplo.com",
    phone: "+55 11 99999-9999",
    role: "view"
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao@exemplo.com",
    phone: "+55 11 88888-8888",
    role: "edit"
  }
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "admin":
      return <Badge variant="default">Administrador</Badge>;
    case "edit":
      return <Badge variant="secondary">Editar</Badge>;
    case "view":
      return <Badge variant="outline">Visualizar</Badge>;
    default:
      return <Badge variant="outline">Visualizar</Badge>;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-blue-500/10 border-blue-500/20";
    case "edit":
      return "bg-green-500/10 border-green-500/20";
    case "view":
      return "bg-gray-500/10 border-gray-500/20";
    default:
      return "bg-gray-500/10 border-gray-500/20";
  }
};

export function SharedManagement() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleSaveMember = (updatedMember: Member) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setIsEditModalOpen(false);
    setEditingMember(null);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Gestão Compartilhada</CardTitle>
            </div>
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Adicionar Membro
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Membros Autorizados</h4>
              <span className="text-xs text-muted-foreground">
                {members.length} membro{members.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${getRoleColor(member.role)}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-foreground">{member.name}</h5>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{member.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getRoleBadge(member.role)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditMember(member)}
                            className="h-8 gap-1 text-xs"
                          >
                            <Edit className="h-3 w-3" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveMember(member.id)}
                            className="h-8 gap-1 text-xs text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remover
                          </Button>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Membro desde Jan 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {members.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Nenhum membro adicionado ainda</p>
              <p className="text-xs">Convide membros para compartilhar o acesso</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={editingMember}
        onSave={handleSaveMember}
      />
    </>
  );
}
