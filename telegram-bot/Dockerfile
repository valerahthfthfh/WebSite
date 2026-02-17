FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY bot.py .
COPY admins.json* .
COPY new_users.json* .
COPY applications.json* .

EXPOSE 5001

CMD ["python", "bot.py"]