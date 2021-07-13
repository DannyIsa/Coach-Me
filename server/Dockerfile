FROM node:14
WORKDIR /Coach-Me/server
RUN npm i
COPY . .
ENV PORT=3001
ENV SQL_HOST_PRODUCTION=coach-me.ccfk50vgies3.us-east-1.rds.amazonaws.com
ENV SQL_PASSWORD_PRODUCTION=CoachMe1999
ENV SQL_DATA_BASE_PRODUCTION=coach-me
ENV SQL_USERNAME_PRODUCTION=admin
EXPOSE 3001
CMD [ "node", "index.js" ]

