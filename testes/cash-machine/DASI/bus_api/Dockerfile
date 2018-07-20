FROM ruby:2.4.3-stretch
LABEL mantainer='Aholibama Soto <dsotoib@gmail.com>'

RUN apt-get update -qq && apt-get install -y build-essential \
default-libmysqlclient-dev git && \
apt-get autoclean && apt-get clean

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

COPY . .