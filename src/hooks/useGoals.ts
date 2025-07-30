import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Goal {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchGoals = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar metas",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setGoals((data || []) as Goal[]);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (goalData: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{ ...goalData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao criar meta",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Meta criada com sucesso!",
        description: `A meta ${goalData.name} foi criada.`,
      });

      await fetchGoals();
      return { data };
    } catch (error) {
      console.error('Error creating goal:', error);
      return { error };
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao atualizar meta",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Meta atualizada com sucesso!",
      });

      await fetchGoals();
      return { data };
    } catch (error) {
      console.error('Error updating goal:', error);
      return { error };
    }
  };

  const deleteGoal = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erro ao deletar meta",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Meta deletada com sucesso!",
      });

      await fetchGoals();
      return { success: true };
    } catch (error) {
      console.error('Error deleting goal:', error);
      return { error };
    }
  };

  const updateGoalProgress = async (id: string, amount: number) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return { error: 'Goal not found' };

    return updateGoal(id, { current_amount: goal.current_amount + amount });
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  return {
    goals,
    loading,
    createGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    refetch: fetchGoals,
  };
};