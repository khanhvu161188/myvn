FROM node:12

WORKDIR /application
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]