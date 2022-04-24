FROM mhart/alpine-node:12
COPY . .
#RUN apk update && apk add bash
RUN npm install
EXPOSE 80
CMD [ "npm", "start" ]