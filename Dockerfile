FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY prisma ./prisma

# Run Prisma generate
RUN npx prisma generate

# Copy app source code

COPY src ./src
COPY app.js .
COPY index.js .
COPY .env . 

# Optional: expose port and define default command
EXPOSE 5000
CMD ["node", "index.js"]
