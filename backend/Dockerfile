FROM python:3.13-alpine

WORKDIR /app

# Install dependencies using apk instead of apt-get
RUN apk update && apk add --no-cache \
    build-base \
    mariadb-dev \
    gcc \
    musl-dev \
    libffi-dev \
    && rm -rf /var/cache/apk/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apk add --no-cache mysql-client



# Copy the rest of the backend code
COPY . .

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["sh", "-c", "python scripts/init_db.py && python -m flask run --host=0.0.0.0"]

