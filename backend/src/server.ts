import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Xedom Lab Backend API is running on port ${env.PORT}`);
  console.log(`📡 URL: http://localhost:${env.PORT}`);
  console.log(`🩺 Health: http://localhost:${env.PORT}/api/health`);
  console.log(`⚙️  Environment: ${env.NODE_ENV}`);
  console.log('====================================================');
});
