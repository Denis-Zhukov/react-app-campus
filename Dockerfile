FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 8000

ENV CI=true
CMD ["npm", "start"]