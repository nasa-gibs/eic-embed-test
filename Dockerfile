FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# docker build -t eic-embed-image .
# docker run -p 5173:5173 eic-embed-image