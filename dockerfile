FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Inject variables so the Next.js frontend bakes them into the HTML
ENV MONGODB_URI="mongodb://leaf-petals-db:27017/LeafPetals"
ENV NEXTAUTH_SECRET="my_super_secret_plant_shop_key_2026"
ENV NEXT_PUBLIC_API_URL="http://127.0.0.1:8081"

RUN npm run build

# Let Next.js use its default port 3000 internally
EXPOSE 3000
CMD ["npm", "start"]