FROM python:3.11-slim

WORKDIR /app

# Копируем файл с зависимостями
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код бота
COPY bot.py .
COPY admins.json* .
COPY new_users.json* .
COPY applications.json* .

# Открываем порт (если используете Flask)
EXPOSE 5001

# Запускаем бота
CMD ["python", "bot.py"]