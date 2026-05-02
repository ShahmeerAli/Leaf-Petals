# FROM node:22-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# # Install project dependencies
# RUN npm install

# # Copy the rest of your application code
# COPY . .
# ENV MONGODB_URI="mongodb://dummy-string-to-pass-build-check"
# ENV NEXTAUTH_SECRET="my_super_secret_plant_shop_key_2026"
# ENV NEXT_PUBLIC_API_URL="http://127.0.0.1:8080"
# # Build the Next.js application for production
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 8081

# # Define the command to run your app
# # Start the app and bind it to 0.0.0.0 to accept external connections
# CMD ["npm", "start", "--", "-H", "0.0.0.0"]

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# These must be present at Build Time so the frontend knows where to fetch plants
ENV MONGODB_URI="mongodb://leaf-petals-db:27017/LeafPetals"
ENV NEXTAUTH_SECRET="my_super_secret_plant_shop_key_2026"
# Standardizing on port 8081
ENV NEXT_PUBLIC_API_URL="http://localhost:8081"

RUN npm run build
EXPOSE 8081

# This bypasses the package.json port 8080 and forces 8081
CMD ["npx", "next", "start", "-p", "8081", "-H", "0.0.0.0"]