FROM node:20.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx tsc

RUN npm run copy-templates

CMD ["npm", "start"]