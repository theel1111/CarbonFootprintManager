FROM python:3.13-alpine

# Install dependencies using apk instead of apt-get
RUN apk update && apk add --no-cache \
    build-base \
    mariadb-dev \
    gcc \
    musl-dev \
    libffi-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /app

ENV FLASK_APP=app.py \
    FLASK_ENV=development \
    FLASK_DEBUG=1

COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install Flask-Migrate

COPY . .

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
