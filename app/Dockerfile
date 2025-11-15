FROM node:18-alpine AS dev_image

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .

RUN npm install

# add app
COPY . .

CMD ["npm", "start"]


FROM node:18-alpine AS prod_image

WORKDIR /front/oxygenbnb

COPY --from=dev_image /app/dist/ /app/dist/

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]