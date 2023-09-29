# Using the alpine Nginx image as the base image since it's smaller
FROM nginx:alpine

# Removing the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copying my custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/

# Copying my static website content to the container
COPY . /usr/share/nginx/html

# Start Nginx in the foreground in order for me to watch the process 
CMD ["nginx", "-g", "daemon off;"]
