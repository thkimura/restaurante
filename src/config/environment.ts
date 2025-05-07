interface Environment {
  WHATSAPP_NUMBER: string;
  FACEBOOK_URL: string;
  INSTAGRAM_URL: string;
  APP_URL: string;
}

const environment: Environment = {
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER || '5511930209535',
  FACEBOOK_URL: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/saborcaseiro',
  INSTAGRAM_URL: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/saborcaseiro',
  APP_URL: import.meta.env.VITE_APP_URL || 'https://saborcaseiro.com.br',
};

export default environment;