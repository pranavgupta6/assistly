# You can use most Debian-based base images
FROM node:21-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install dependencies and customize sandbox
WORKDIR /home/user

# Create Next.js app directly in /home/user with increased memory
RUN NODE_OPTIONS="--max-old-space-size=4096" npx --yes create-next-app@16.0.1 nextjs-app --yes

# Change to the nextjs-app directory for shadcn setup
WORKDIR /home/user/nextjs-app

RUN NODE_OPTIONS="--max-old-space-size=4096" npx --yes shadcn@3.5.0 init --yes -b neutral --force
RUN NODE_OPTIONS="--max-old-space-size=4096" npx --yes shadcn@3.5.0 add --all --yes

# Now move everything to /home/user and clean up
WORKDIR /home/user
RUN mv nextjs-app/* . && \
    mv nextjs-app/.* . 2>/dev/null || true && \
    rm -rf nextjs-app

# Copy and set permissions for compile script AFTER moving files
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Set working directory back to /home/user where the app now lives
WORKDIR /home/user