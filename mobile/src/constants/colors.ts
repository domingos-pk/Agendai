/**
 * Paleta de cores oficial do Agendai
 * Azul médico vibrante + neutros limpos
 */
export const Colors = {
  // Primária
  primary: '#2563EB',       // Azul principal (botões, links, ativo)
  primaryLight: '#EFF6FF',  // Azul muito claro (backgrounds de destaque)
  primaryDark: '#1D4ED8',   // Azul escuro (pressed state)

  // Backgrounds
  background: '#FFFFFF',    // Fundo geral
  surface: '#F3F4F6',       // Inputs, cards cinza suave

  // Textos
  textPrimary: '#111827',   // Títulos, texto principal
  textSecondary: '#6B7280', // Subtítulos, placeholders, legendas

  // Bordas
  border: '#E5E7EB',

  // Estados
  white: '#FFFFFF',
  black: '#111827',

  // Feedback
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
} as const;
