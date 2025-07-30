
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Camera, Crown } from "lucide-react";

interface ProfileHeaderProps {
  profileData: {
    name: string;
    profession: string;
    email: string;
  };
  isEditing: boolean;
  onEditToggle: () => void;
  onImageUpload: () => void;
}

export function ProfileHeader({ profileData, isEditing, onEditToggle, onImageUpload }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-md shadow-xl">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
        
        <CardContent className="relative p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1 animate-pulse opacity-75">
                <div className="bg-background rounded-full w-full h-full" />
              </div>
              <Avatar className="relative h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-2xl">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Foto do perfil" className="object-cover" />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <Button
                  size="sm"
                  variant="default"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 shadow-lg hover:scale-110 transition-transform"
                  onClick={onImageUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {profileData.name}
                  </h1>
                  <Crown className="h-5 w-5 text-yellow-500" />
                </div>
                
                <p className="text-lg text-muted-foreground font-medium">
                  {profileData.profession}
                </p>
                
                <p className="text-sm text-muted-foreground">
                  {profileData.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Badge variant="default" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md">
                  <Crown className="h-3 w-3 mr-1" />
                  Membro Premium
                </Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-600 bg-green-500/10">
                  Verificado
                </Badge>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex sm:flex-col gap-2">
              <Button 
                className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-secondary" 
                onClick={onEditToggle}
              >
                <Edit className="h-4 w-4" />
                {isEditing ? "Salvar" : "Editar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
