
FROM nginx:1.13.5-alpine
LABEL authors="Newemann <newmannhu@qq.com>"

COPY ./_nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./_nginx/ssl/* /etc/nginx/ssl/

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]
