FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .
ENV MONGODB_URI="mongodb://dummy-string-to-pass-build-check"
ENV NEXTAUTH_SECRET="my_super_secret_plant_shop_key_2026"
ENV NEXT_PUBLIC_API_URL="http://127.0.0.1:8080"
# Build the Next.js application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 8081

# Define the command to run your app
# Start the app and bind it to 0.0.0.0 to accept external connections
CMD ["npm", "start", "--", "-H", "0.0.0.0"]