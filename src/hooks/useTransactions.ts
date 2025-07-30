import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id?: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: string;
  notes?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar transações",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setTransactions((data || []) as Transaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...transactionData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao criar transação",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Transação criada com sucesso!",
        description: `Transação de ${transactionData.type === 'income' ? 'entrada' : 'saída'} registrada.`,
      });

      await fetchTransactions();
      return { data };
    } catch (error) {
      console.error('Error creating transaction:', error);
      return { error };
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao atualizar transação",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Transação atualizada com sucesso!",
      });

      await fetchTransactions();
      return { data };
    } catch (error) {
      console.error('Error updating transaction:', error);
      return { error };
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erro ao deletar transação",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Transação deletada com sucesso!",
      });

      await fetchTransactions();
      return { success: true };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return { error };
    }
  };

  const getTransactionsByPeriod = (period: string) => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'Este mês':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'Último mês':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'Últimos 3 meses':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case 'Este ano':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return transactions;
    }

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate;
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByPeriod,
    refetch: fetchTransactions,
  };
};