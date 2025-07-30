import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchCategories = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (error) {
        toast({
          title: "Erro ao carregar categorias",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData: Omit<Category, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ ...categoryData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao criar categoria",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Categoria criada com sucesso!",
        description: `A categoria ${categoryData.name} foi criada.`,
      });

      await fetchCategories();
      return { data };
    } catch (error) {
      console.error('Error creating category:', error);
      return { error };
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erro ao atualizar categoria",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Categoria atualizada com sucesso!",
      });

      await fetchCategories();
      return { data };
    } catch (error) {
      console.error('Error updating category:', error);
      return { error };
    }
  };

  const deleteCategory = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erro ao deletar categoria",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Categoria deletada com sucesso!",
      });

      await fetchCategories();
      return { success: true };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { error };
    }
  };

  const getCategoriesByType = (type: 'income' | 'expense') => {
    return categories.filter(category => category.type === type);
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  return {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByType,
    refetch: fetchCategories,
  };
};