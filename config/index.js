export const config = {
  url: 'mongodb://localhost:27017/',
  dbName: 'contentstack-persistent-db',
  options: {
    // 
  },
  port: 3000,
  locales: [
    {
      code: 'en-us',
      relative_url_prefix: '/'
    },
    {
      code: 'es-es',
      relative_url_prefix: '/es/'
    },
    {
      code: 'fr-fr',
      relative_url_prefix: '/fr/'
    }
  ]
}