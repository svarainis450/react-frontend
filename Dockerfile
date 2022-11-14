FROM --platform=linux/amd64 node:16.4.0-alpine as builder

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

# FROM --platform=linux/amd64 node:16.4.0-alpine

# WORKDIR /app
# RUN npm install -g serve
# COPY --from=builder ./build ./build
