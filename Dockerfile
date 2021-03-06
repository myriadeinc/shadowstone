FROM node:12.18.3-buster-slim
WORKDIR /usr/src/app
EXPOSE 12345
EXPOSE 9990
RUN chown -R node:node /usr/src/app
USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm install --quiet
COPY . /usr/src/app

# We don't run "npm start" because we don't want npm to manage the SIGTERM signal
CMD [ "node", "src/main.js" ]