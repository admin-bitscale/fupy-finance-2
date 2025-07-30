import { useState } from "react"
import { motion } from "framer-motion"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileForm } from "@/components/profile/profile-form"
import { ContactSidebar } from "@/components/profile/contact-sidebar"
import { useUserProfile } from "@/hooks/useUserProfile"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const { profile, loading, updateProfile } = useUserProfile()

  const handleSaveProfile = async () => {
    if (!profile) return
    
    await updateProfile(profile)
    setIsEditing(false)
  }

  const handleImageUpload = () => {
    console.log("Upload de imagem")
  }

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile()
    } else {
      setIsEditing(true)
    }
  }

  const handleUpdateData = (updatedData: any) => {
    // This will be handled by the ProfileForm component
    // The actual update will happen when saving
  }

  if (loading) {
    return (
      <motion.div 
        className="space-y-4 sm:space-y-6 min-h-screen pb-4 sm:pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Carregando perfil...</p>
        </div>
      </motion.div>
    )
  }

  if (!profile) {
    return (
      <motion.div 
        className="space-y-4 sm:space-y-6 min-h-screen pb-4 sm:pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">Erro ao carregar perfil</p>
        </div>
      </motion.div>
    )
  }

  // Transform profile data to match component expectations
  const profileData = {
    name: profile.full_name || "Usuário",
    email: profile.user_id || "", // This should come from auth context
    phone: profile.phone || "",
    address: profile.address || "",
    bio: profile.bio || "",
    birthDate: profile.birth_date || "",
    profession: profile.profession || "",
    company: profile.company || ""
  }

  return (
    <motion.div 
      className="space-y-4 sm:space-y-6 min-h-screen pb-4 sm:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl rounded-2xl border border-border/40 shadow-xl" />
        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Meu Perfil
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProfileHeader 
          profileData={profileData}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onImageUpload={handleImageUpload}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Form - Takes up 2 columns on large screens */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ProfileForm 
            profileData={profileData}
            isEditing={isEditing}
            onUpdateData={handleUpdateData}
          />
        </motion.div>

        {/* Contact Sidebar - Takes up 1 column on large screens */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ContactSidebar profileData={profileData} />
        </motion.div>
      </div>
    </motion.div>
  )
}