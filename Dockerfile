FROM mhart/alpine-node:8.7.0

# Work dir
WORKDIR /viarail/app

# Copies the project files
COPY . /viarail/app

# 2. Transpiles the application.
RUN npm install npm run debug

EXPOSE 3000

CMD ["npm", "start"]