import axios from 'axios';

// Configuração base da API
const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para debugging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição enviada:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data);
    
    // Tratar diferentes tipos de erro
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout - Verifique se a API está rodando na porta 5000');
    }
    if (error.response?.status === 404) {
      throw new Error('API não encontrada - Verifique se está rodando em localhost:5000');
    }
    if (error.response?.status >= 500) {
      throw new Error('Erro interno do servidor');
    }
    
    return Promise.reject(error);
  }
);

// Serviços da API para Séries
export const seriesAPI = {
  // Buscar todas as séries
  getAllSeries: async () => {
    try {
      console.log('📡 Buscando todas as séries...');
      const response = await api.get('/series');
      
      console.log('📊 Dados recebidos da API:', response.data);
      
      // Verificar se retornou um array
      if (!Array.isArray(response.data)) {
        console.warn('⚠️ API não retornou um array:', response.data);
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar séries:', error);
      throw new Error('Erro ao carregar séries: ' + error.message);
    }
  },

  // Buscar série por ID
  getSerieById: async (id) => {
    try {
      console.log('🔍 Buscando série por ID:', id);
      const response = await api.get(`/series/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar série:', error);
      throw new Error('Erro ao buscar série: ' + error.message);
    }
  },

  // Criar nova série
  createSerie: async (serieData) => {
    try {
      console.log('➕ Criando nova série:', serieData);
      const response = await api.post('/series', serieData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar série:', error);
      throw new Error('Erro ao criar série: ' + error.message);
    }
  },

  // Atualizar série
  updateSerie: async (id, serieData) => {
    try {
      console.log('✏️ Atualizando série:', id, serieData);
      const response = await api.put(`/series/${id}`, serieData);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar série:', error);
      throw new Error('Erro ao atualizar série: ' + error.message);
    }
  },

  // Deletar série
  deleteSerie: async (id) => {
    try {
      console.log('🗑️ Deletando série:', id);
      const response = await api.delete(`/series/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao deletar série:', error);
      throw new Error('Erro ao deletar série: ' + error.message);
    }
  },

  // Testar conexão com a API
  testConnection: async () => {
    try {
      console.log('🔌 Testando conexão com a API...');
      const response = await api.get('/');
      console.log('✅ API está funcionando!', response.data);
      return true;
    } catch (error) {
      console.error('❌ API não está funcionando:', error.message);
      return false;
    }
  }
};

// Utilitários para validação de dados
export const seriesValidation = {
  validateSerieData: (data) => {
    const errors = {};
    
    if (!data.titulo || data.titulo.trim() === '') {
      errors.titulo = 'Título é obrigatório';
    }
    
    if (!data.numeroTemporadas || data.numeroTemporadas <= 0) {
      errors.numeroTemporadas = 'Número de temporadas deve ser maior que 0';
    }
    
    if (!data.dataLancamento) {
      errors.dataLancamento = 'Data de lançamento é obrigatória';
    }
    
    if (!data.diretor || data.diretor.trim() === '') {
      errors.diretor = 'Diretor é obrigatório';
    }
    
    if (!data.produtora || data.produtora.trim() === '') {
      errors.produtora = 'Produtora é obrigatória';
    }
    
    if (!data.categoria || data.categoria.trim() === '') {
      errors.categoria = 'Categoria é obrigatória';
    }
    
    if (!data.dataAssistida) {
      errors.dataAssistida = 'Data que assistiu é obrigatória';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

// Constantes para categorias
export const CATEGORIES = [
  'Drama',
  'Comédia', 
  'Ação',
  'Suspense',
  'Terror',
  'Ficção Científica',
  'Fantasia',
  'Romance',
  'Documentário',
  'Animação',
  'Crime',
  'Mistério',
  'Aventura',
  'Western',
  'Guerra',
  'Musical',
  'Biografia',
  'Esporte',
  'Família',
  'Outros'
];

export default api;
