FROM node:20-alpine as build
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm i
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80