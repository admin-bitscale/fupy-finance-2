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
  status: 'completed' | 'pending' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface TransactionWithDetails extends Transaction {
  account?: {
    id: string;
    name: string;
    type: string;
  };
  category?: {
    id: string;
    name: string;
    color: string;
    icon?: string;
  };
}
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          account:accounts(id, name, type),
          category:categories(id, name, color, icon)
        `)
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

      setTransactions((data || []) as TransactionWithDetails[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...transactionData, user_id: user.id, status: 'completed' }])
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
      case 'Hoje':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case '7 dias atrás':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
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

  const getTransactionSummary = (period: string = 'Este mês') => {
    const periodTransactions = getTransactionsByPeriod(period);
    
    const income = periodTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const expenses = periodTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance, count: periodTransactions.length };
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
    getTransactionSummary,
    refetch: fetchTransactions,
  };
};