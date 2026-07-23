import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_', 'HTTPS', 'SSL_KEY_FILE', 'SSL_CRT_FILE', 'PORT']);
  
  const envWithProcess = {
    'process.env': '{}',
  };
  
  for (const [key, val] of Object.entries(env)) {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
      envWithProcess[`process.env.${key}`] = JSON.stringify(val);
    }
  }
  
  envWithProcess['process.env.NODE_ENV'] = JSON.stringify(mode);
  envWithProcess['process.env.PUBLIC_URL'] = JSON.stringify('');

  // Setup HTTPS if specified in .env
  const isHttps = env.HTTPS === 'true';
  const sslKeyPath = env.SSL_KEY_FILE ? path.resolve(process.cwd(), env.SSL_KEY_FILE) : null;
  const sslCertPath = env.SSL_CRT_FILE ? path.resolve(process.cwd(), env.SSL_CRT_FILE) : null;
  
  const httpsConfig = isHttps && sslKeyPath && sslCertPath && fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)
    ? {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath),
      }
    : undefined;

  const port = env.PORT ? parseInt(env.PORT, 10) : 3000;

  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
    define: envWithProcess,
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
        'utils': path.resolve(__dirname, './src/utils'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port,
      open: true,
      https: httpsConfig,
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff'
      }
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@fortawesome') || id.includes('phosphor-react') || id.includes('react-icons')) {
                return 'vendor-icons';
              }
              if (id.includes('bootstrap') || id.includes('react-bootstrap')) {
                return 'vendor-bootstrap';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer';
              }
              if (id.includes('xstate') || id.includes('@xstate')) {
                return 'vendor-xstate';
              }
              return 'vendor';
            }
          }
        }
      }
    },
  };
});
