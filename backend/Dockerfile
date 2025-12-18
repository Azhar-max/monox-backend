FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy app source
COPY . .

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (res) => {if(res.statusCode!==200) process.exit(1)})"

# Start the application
CMD ["npm", "start"]
=======
CMD ["node", "server.js"]
>>>>>>> 45b1529243db8e0cf7b725340a1ae0c2cc90143f
