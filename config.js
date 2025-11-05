/**
 * Configuration Management
 * This file handles loading configuration from various sources
 */

const Config = (() => {
  // Default configuration (fallback)
  const defaults = {
    PROJECT_REF: '',
    SUPABASE_KEY: '',
    TG_BOT: ''
  };

  // Try to load from environment variables (if using a bundler)
  const fromEnv = {
    PROJECT_REF: typeof process !== 'undefined' ? process.env.SUPABASE_PROJECT_REF : null,
    SUPABASE_KEY: typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY : null,
    TG_BOT: typeof process !== 'undefined' ? process.env.TELEGRAM_BOT_USERNAME : null
  };

  // Load from localStorage (for runtime configuration)
  const fromStorage = {
    PROJECT_REF: localStorage.getItem('SUPABASE_PROJECT_REF'),
    SUPABASE_KEY: localStorage.getItem('SUPABASE_ANON_KEY'),
    TG_BOT: localStorage.getItem('TELEGRAM_BOT_USERNAME')
  };

  // Merge configurations (priority: storage > env > defaults)
  const config = {
    PROJECT_REF: fromStorage.PROJECT_REF || fromEnv.PROJECT_REF || defaults.PROJECT_REF,
    SUPABASE_KEY: fromStorage.SUPABASE_KEY || fromEnv.SUPABASE_KEY || defaults.SUPABASE_KEY,
    TG_BOT: fromStorage.TG_BOT || fromEnv.TG_BOT || defaults.TG_BOT
  };

  // Generate Supabase URL
  config.SUPABASE_URL = config.PROJECT_REF 
    ? `https://${config.PROJECT_REF}.supabase.co/rest/v1/books?select=*`
    : '';

  // Validation
  const isValid = () => {
    return config.PROJECT_REF && config.SUPABASE_KEY && config.TG_BOT;
  };

  // Save configuration to localStorage
  const save = (newConfig) => {
    if (newConfig.PROJECT_REF) {
      localStorage.setItem('SUPABASE_PROJECT_REF', newConfig.PROJECT_REF);
      config.PROJECT_REF = newConfig.PROJECT_REF;
    }
    if (newConfig.SUPABASE_KEY) {
      localStorage.setItem('SUPABASE_ANON_KEY', newConfig.SUPABASE_KEY);
      config.SUPABASE_KEY = newConfig.SUPABASE_KEY;
    }
    if (newConfig.TG_BOT) {
      localStorage.setItem('TELEGRAM_BOT_USERNAME', newConfig.TG_BOT);
      config.TG_BOT = newConfig.TG_BOT;
    }
    // Regenerate URL
    config.SUPABASE_URL = `https://${config.PROJECT_REF}.supabase.co/rest/v1/books?select=*`;
  };

  // Clear configuration
  const clear = () => {
    localStorage.removeItem('SUPABASE_PROJECT_REF');
    localStorage.removeItem('SUPABASE_ANON_KEY');
    localStorage.removeItem('TELEGRAM_BOT_USERNAME');
    config.PROJECT_REF = '';
    config.SUPABASE_KEY = '';
    config.TG_BOT = '';
    config.SUPABASE_URL = '';
  };

  return {
    get: () => ({ ...config }),
    isValid,
    save,
    clear
  };
})();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Config;
}
