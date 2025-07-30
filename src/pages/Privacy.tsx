
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-lg">
            <CardHeader className="text-center space-y-6 pb-8 pt-10">
              <motion.div 
                className="flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl mr-4">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground text-left">
                    Política de Privacidade
                  </CardTitle>
                  <p className="text-muted-foreground text-sm text-left mt-2">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-8 text-foreground px-8 pb-10">
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">1</span>
                  </span>
                  Informações que Coletamos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Coletamos informações pessoais como nome, e-mail e número de telefone 
                  quando você se cadastra. Também coletamos dados sobre seu uso da plataforma 
                  para melhorar nossos serviços.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">2</span>
                  </span>
                  Como Usamos suas Informações
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos suas informações para fornecer e melhorar nossos serviços, 
                  processar pagamentos, enviar comunicações importantes e personalizar 
                  sua experiência na plataforma.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">3</span>
                  </span>
                  Compartilhamento de Dados
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais 
                  com terceiros, exceto quando necessário para o funcionamento do serviço 
                  (como processamento de pagamentos via Stripe).
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">4</span>
                  </span>
                  Segurança dos Dados
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais para 
                  proteger suas informações contra acesso não autorizado, alteração, 
                  divulgação ou destruição.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">5</span>
                  </span>
                  Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência de navegação, 
                  manter você conectado e analisar o uso da plataforma. Você pode 
                  desabilitar os cookies nas configurações do seu navegador.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">6</span>
                  </span>
                  Seus Direitos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Você tem o direito de acessar, corrigir ou excluir suas informações 
                  pessoais. Também pode solicitar a portabilidade dos dados ou se 
                  opor ao processamento de determinadas informações.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">7</span>
                  </span>
                  Retenção de Dados
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mantemos suas informações pessoais apenas pelo tempo necessário 
                  para cumprir os propósitos descritos nesta política, a menos que 
                  seja exigido por lei manter por mais tempo.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">8</span>
                  </span>
                  Alterações nesta Política
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar esta política de privacidade periodicamente. 
                  Notificaremos você sobre mudanças significativas por e-mail ou 
                  através de um aviso na plataforma.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-muted/30 backdrop-blur-sm rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">9</span>
                  </span>
                  Contato
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre esta política de privacidade, entre em contato: 
                  <span className="text-primary font-medium ml-1">privacidade@fupy.com</span>
                </p>
              </motion.section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
