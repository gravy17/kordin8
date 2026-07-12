FROM node:18-alpine

ENV NODE_ENV=production
ENV PORT=80

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm ci --omit=dev

COPY --chown=node:node . .

RUN npm run build

EXPOSE 80

ENTRYPOINT ["npm", "run", "start"]