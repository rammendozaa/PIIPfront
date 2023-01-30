FROM node:12.22.9

WORKDIR /app
COPY . /app
ENV NODE_ENV development
ENV HOST_URL 0.0.0.0:1234
ENV ESLINT_NO_DEV_ERRORS true
RUN yarn install --silent --ignore-engines
CMD yarn start