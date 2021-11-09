# latest LTS NodeJS Version
FROM node:16.12-slim 
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm ci --silent
RUN npm install pm2 -g
EXPOSE 8080
# run Node process using pm2 process manager for 24/7 uptime
CMD ["pm2-runtime", "start", "ecosystem.config.js"]