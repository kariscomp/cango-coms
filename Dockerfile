FROM node:8

# Add Dependancies - Useful for CodeShip
# Moving over to Google Cloud Build Though
# RUN apk --no-cache add git \
#     libc6-compat \
#     krb5-dev

# Create app directory
RUN mkdir -p /usr/src/cango-coms
WORKDIR /usr/src/cango-coms

# Useful for debuging fan outs, errors
ENV DEBUG loopback:connector:swagger

# Install app dependencies
COPY package*.json /usr/src/cango-coms/
RUN npm install

# Bundle app source
COPY . /usr/src/cango-coms/

EXPOSE 3003

# Kubernetes Also Has Health Check, Investigate both
HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://localhost:3003/vitals/docker || exit 1

CMD ["node", "."]