import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Sun,
  Moon,
  Monitor,
  Globe, 
  Download,
  Upload,
  Trash2,
  Save,
  MessageCircle,
  Mail,
  Smartphone
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SharedManagement } from "@/components/settings/shared-management"
import { useUserSettings } from "@/hooks/useUserSettings"
import React from "react"

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { settings, loading, updateSettings } = useUserSettings()
  
  const [localSettings, setLocalSettings] = useState({
    currency: settings?.currency || "BRL",
    language: settings?.language || "pt-BR",
    notifications: settings?.notifications || {
      email: true,
      push: false,
      whatsapp: true,
      transactions: true,
      goals: true,
      reports: false
    },
    auto_backup: settings?.auto_backup || true
  })

  // Update local settings when settings are loaded
  React.useEffect(() => {
    if (settings) {
      setLocalSettings({
        currency: settings.currency,
        language: settings.language,
        notifications: settings.notifications,
        auto_backup: settings.auto_backup
      })
    }
  }, [settings])
  
  const handleSaveSettings = async () => {
    await updateSettings(localSettings)
  }

  const handleExportData = () => {
    console.log("Exportar dados")
  }

  const handleImportData = () => {
    console.log("Importar dados")
  }

  const handleDeleteAccountData = () => {
    console.log("Excluir dados da conta")
  }

  const updateNotification = (key: string, value: boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Configurações
          </h1>
          <p className="text-muted-foreground text-lg">
            Personalize sua experiência e gerencie suas preferências
          </p>
        </div>
        <Button className="gap-2 shadow-md hover:shadow-lg transition-all" onClick={handleSaveSettings}>
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notificações</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Channels */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground">Receba notificações por email</p>
                    </div>
                  </div>
                  <Switch
                    checked={localSettings.notifications.email}
                    onCheckedChange={(checked) => updateNotification('email', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Push</Label>
                      <p className="text-sm text-muted-foreground">Alertas instantâneos no navegador</p>
                    </div>
                  </div>
                  <Switch
                    checked={localSettings.notifications.push}
                    onCheckedChange={(checked) => updateNotification('push', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">Notificações via WhatsApp</p>
                    </div>
                  </div>
                  <Switch
                    checked={localSettings.notifications.whatsapp}
                    onCheckedChange={(checked) => updateNotification('whatsapp', checked)}
                  />
                </div>
              </div>

              <Separator />

              {/* Notification Types */}
              <div className="space-y-4">
                <h4 className="font-medium">Tipos de Notificação</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Transações</Label>
                    <p className="text-sm text-muted-foreground">Alertas de novas transações</p>
                  </div>
                  <Switch
                    checked={localSettings.notifications.transactions}
                    onCheckedChange={(checked) => updateNotification('transactions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Metas</Label>
                    <p className="text-sm text-muted-foreground">Progresso e lembretes de metas</p>
                  </div>
                  <Switch
                    checked={localSettings.notifications.goals}
                    onCheckedChange={(checked) => updateNotification('goals', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Relatórios</Label>
                    <p className="text-sm text-muted-foreground">Relatórios mensais automáticos</p>
                  </div>
                  <Switch
                    checked={localSettings.notifications.reports}
                    onCheckedChange={(checked) => updateNotification('reports', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shared Management - Using the new component */}
          <SharedManagement />

          {/* Security */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Segurança</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" placeholder="Digite sua senha atual" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" placeholder="Digite sua nova senha" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" placeholder="Confirme sua nova senha" />
              </div>

              <Button variant="outline" className="w-full">
                Alterar Senha
              </Button>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">Backup diário dos seus dados</p>
                </div>
                <Switch
                  checked={localSettings.auto_backup}
                  onCheckedChange={(checked) => 
                    setLocalSettings(prev => ({ ...prev, auto_backup: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SettingsIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium">Usuário</h3>
                <p className="text-sm text-muted-foreground">usuario@email.com</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano:</span>
                  <Badge variant="default">Premium</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Membro desde:</span>
                  <span>Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Último acesso:</span>
                  <span>Hoje</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance - Moved to right column */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                <CardTitle>Aparência</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="flex gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="flex-1 gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    <span className="sr-only">Claro</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="flex-1 gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    <span className="sr-only">Escuro</span>
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="flex-1 gap-2"
                  >
                    <Monitor className="h-4 w-4" />
                    <span className="sr-only">Sistema</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select 
                  value={localSettings.language} 
                  onValueChange={(value) => setLocalSettings(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Select 
                  value={localSettings.currency} 
                  onValueChange={(value) => setLocalSettings(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                    <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Dados</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleExportData}
              >
                <Download className="h-4 w-4" />
                Exportar Dados
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleImportData}
              >
                <Upload className="h-4 w-4" />
                Importar Dados
              </Button>
            </CardContent>
          </Card>

          {/* Account Deletion - New Card */}
          <Card className="shadow-md border-destructive/20">
            <CardContent className="pt-6">
              <Button 
                variant="destructive" 
                className="w-full gap-2" 
                onClick={handleDeleteAccountData}
              >
                <Trash2 className="h-4 w-4" />
                Excluir Dados de Conta
              </Button>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Esta ação não pode ser desfeita
              </p>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Sobre o App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versão:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última atualização:</span>
                <span>22/07/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desenvolvedor:</span>
                <span>Fupy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}