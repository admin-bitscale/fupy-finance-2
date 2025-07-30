/*
  # Inserir categorias padrão

  1. Categorias de Despesas
    - Alimentação, Transporte, Moradia, Saúde, Lazer, Educação, Compras, Utilidades

  2. Categorias de Receitas  
    - Salário, Freelance, Investimentos, Vendas, Outros

  3. Observações
    - Estas categorias serão criadas automaticamente para novos usuários
    - Função trigger para criar categorias padrão ao criar perfil
*/

-- Função para criar categorias padrão para novos usuários
CREATE OR REPLACE FUNCTION create_default_categories_for_user(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Categorias de Despesas
  INSERT INTO categories (user_id, name, type, color, icon) VALUES
    (user_id, 'Alimentação', 'expense', '#f97316', '🍽️'),
    (user_id, 'Transporte', 'expense', '#3b82f6', '🚗'),
    (user_id, 'Moradia', 'expense', '#8b5cf6', '🏠'),
    (user_id, 'Saúde', 'expense', '#ef4444', '🏥'),
    (user_id, 'Lazer', 'expense', '#06b6d4', '🎮'),
    (user_id, 'Educação', 'expense', '#84cc16', '📚'),
    (user_id, 'Compras', 'expense', '#f59e0b', '🛍️'),
    (user_id, 'Utilidades', 'expense', '#6b7280', '⚡'),
    (user_id, 'Outros', 'expense', '#9ca3af', '📦');

  -- Categorias de Receitas
  INSERT INTO categories (user_id, name, type, color, icon) VALUES
    (user_id, 'Salário', 'income', '#22c55e', '💼'),
    (user_id, 'Freelance', 'income', '#3b82f6', '💻'),
    (user_id, 'Investimentos', 'income', '#8b5cf6', '📈'),
    (user_id, 'Vendas', 'income', '#f59e0b', '💰'),
    (user_id, 'Outros', 'income', '#6b7280', '💵');
END;
$$ LANGUAGE plpgsql;

-- Função para criar conta padrão para novos usuários
CREATE OR REPLACE FUNCTION create_default_account_for_user(user_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO accounts (user_id, name, type, balance, currency, bank, account_number, is_active, color) VALUES
    (user_id, 'Conta Principal', 'checking', 0, 'BRL', 'Banco', '****0000', true, '#3b82f6');
END;
$$ LANGUAGE plpgsql;

-- Função para criar configurações padrão para novos usuários
CREATE OR REPLACE FUNCTION create_default_settings_for_user(user_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO user_settings (user_id, currency, language, theme, notifications, auto_backup) VALUES
    (user_id, 'BRL', 'pt-BR', 'system', '{"email": true, "push": false, "whatsapp": true, "transactions": true, "goals": true, "reports": false}'::jsonb, true);
END;
$$ LANGUAGE plpgsql;

-- Função para criar perfil padrão para novos usuários
CREATE OR REPLACE FUNCTION create_default_profile_for_user(user_id uuid, email text)
RETURNS void AS $$
BEGIN
  INSERT INTO user_profiles (user_id, full_name) VALUES
    (user_id, COALESCE(split_part(email, '@', 1), 'Usuário'));
END;
$$ LANGUAGE plpgsql;

-- Função principal para configurar dados padrão do usuário
CREATE OR REPLACE FUNCTION setup_new_user()
RETURNS trigger AS $$
BEGIN
  -- Criar perfil padrão
  PERFORM create_default_profile_for_user(NEW.id, NEW.email);
  
  -- Criar categorias padrão
  PERFORM create_default_categories_for_user(NEW.id);
  
  -- Criar conta padrão
  PERFORM create_default_account_for_user(NEW.id);
  
  -- Criar configurações padrão
  PERFORM create_default_settings_for_user(NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar setup quando um novo usuário é criado
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION setup_new_user();