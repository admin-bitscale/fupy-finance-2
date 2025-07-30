
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-lg">
          <CardHeader className="text-center space-y-6 pb-8 pt-10">
            <motion.div 
              className="flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-primary-foreground font-bold text-2xl">F</span>
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <CardTitle className="text-3xl font-bold text-foreground">
                Bem-vindo de volta!
              </CardTitle>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                Entre com suas credenciais para acessar sua conta
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 px-8 pb-10">
            <form onSubmit={handleSubmit}>
              <motion.div 
                className="space-y-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
                    E-mail
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-12 h-14 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  disabled={!email || !password || loading}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground mr-3"></div>
                      Entrando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <ArrowRight className="mr-3 h-5 w-5" />
                      Entrar
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
            
            <div className="text-center pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <button 
                  onClick={() => navigate('/register')}
                  className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors duration-200"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
