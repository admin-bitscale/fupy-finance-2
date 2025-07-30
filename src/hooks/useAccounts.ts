import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  bank?: string;
  account_number?: string;
  is_active: boolean;
  color: string;
  created_at: string;
  updated_at: string;
}

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchAccounts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar contas",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (accountData: Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'is_active'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([{ ...accountData, user_id: user.id, is_active: true }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Conta criada com sucesso!",
        description: `A conta ${accountData.name} foi criada.`,
      });

      await fetchAccounts();
      return { data };
    } catch (error) {
      console.error('Error creating account:', error);
      return { error };
    }
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao atualizar conta",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Conta atualizada com sucesso!",
      });

      await fetchAccounts();
      return { data };
    } catch (error) {
      console.error('Error updating account:', error);
      return { error };
    }
  };

  const deleteAccount = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erro ao deletar conta",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Conta deletada com sucesso!",
      });

      await fetchAccounts();
      return { success: true };
    } catch (error) {
      console.error('Error deleting account:', error);
      return { error };
    }
  };

  const getAccountsSummary = () => {
    const activeAccounts = accounts.filter(account => account.is_active);
    
    const totalBalance = activeAccounts
      .filter(account => account.type !== 'credit')
      .reduce((sum, account) => sum + Number(account.balance), 0);
    
    const totalDebt = Math.abs(activeAccounts
      .filter(account => account.type === 'credit')
      .reduce((sum, account) => sum + Number(account.balance), 0));
    
    return {
      totalBalance,
      totalDebt,
      activeCount: activeAccounts.length,
      totalCount: accounts.length
    };
  };
  useEffect(() => {
    fetchAccounts();
  }, [user]);

  return {
    accounts,
    loading,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountsSummary,
    refetch: fetchAccounts,
  };
};