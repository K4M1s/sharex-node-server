FROM node:16

WORKDIR /usr/src/app

ARG USER_ID
ARG GROUP_ID

RUN groupmod -g 6969 node \
  && usermod -u 6969 -g 6969 node

RUN if [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ]; then \
    userdel -f www-data &&\
    if getent group www-data ; then groupdel www-data; fi &&\
    groupadd -g ${GROUP_ID} www-data &&\
    useradd -l -u ${USER_ID} -g www-data www-data &&\
    install -d -m 0755 -o www-data -g www-data /home/www-data &&\
    chown --changes --silent --no-dereference --recursive ${USER_ID}:${GROUP_ID} /usr/src/app\
;fi

USER www-data

CMD [ "npm", "run", "start" ]