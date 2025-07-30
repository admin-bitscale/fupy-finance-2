
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Terms = () => {
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
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground text-left">
                    Termos de Uso
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
                  Aceitação dos Termos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ao utilizar o Fupy, você concorda com estes termos de uso. 
                  Se você não concordar com qualquer parte destes termos, não poderá usar nosso serviço.
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
                  Descrição do Serviço
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  O Fupy é uma plataforma de gestão financeira pessoal que oferece 
                  ferramentas para controle de receitas, despesas, metas financeiras e relatórios.
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
                  Conta do Usuário
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Você é responsável por manter a confidencialidade de sua conta e senha. 
                  Você concorda em aceitar responsabilidade por todas as atividades que 
                  ocorrem sob sua conta.
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
                  Privacidade e Segurança
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seus dados financeiros são criptografados e armazenados com segurança. 
                  Não compartilhamos suas informações pessoais com terceiros sem seu consentimento.
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
                  Pagamentos e Assinaturas
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Os pagamentos são processados de forma segura através do Stripe. 
                  As assinaturas são renovadas automaticamente até o cancelamento.
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
                  Limitações de Responsabilidade
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  O Fupy não se responsabiliza por decisões financeiras tomadas 
                  com base nas informações fornecidas pela plataforma.
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
                  Modificações
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamos o direito de modificar estes termos a qualquer momento. 
                  As alterações serão notificadas por e-mail.
                </p>
              </motion.section>
              
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-muted/30 backdrop-blur-sm rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">8</span>
                  </span>
                  Contato
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Para dúvidas sobre estes termos, entre em contato através do e-mail: 
                  <span className="text-primary font-medium ml-1">suporte@fupy.com</span>
                </p>
              </motion.section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
