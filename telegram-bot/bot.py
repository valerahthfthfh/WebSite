import json
import os
from flask import Flask, jsonify
from flask_cors import CORS
from threading import Thread
import telebot
from telebot.types import Message, ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove

TOKEN = "8033399130:AAGI_89YLNq-FBrD5CacJK0bBSqtC7hwSdc"
MAIN_ADMIN_ID = 804822685

bot = telebot.TeleBot(TOKEN, parse_mode='HTML')

ADMINS_FILE = 'admins.json'
NEW_USERS_FILE = 'new_users.json'  # Новый файл для хранения новых пользователей

app = Flask(__name__)
CORS(app)


def load_admins():
    if os.path.exists(ADMINS_FILE):
        with open(ADMINS_FILE, 'r') as f:
            return json.load(f)
    return [MAIN_ADMIN_ID]


def save_admins(admins):
    with open(ADMINS_FILE, 'w') as f:
        json.dump(admins, f)


def load_new_users():
    """Загружает список новых пользователей"""
    if os.path.exists(NEW_USERS_FILE):
        with open(NEW_USERS_FILE, 'r') as f:
            return json.load(f)
    return []


def save_new_users(users):
    """Сохраняет список новых пользователей"""
    with open(NEW_USERS_FILE, 'w') as f:
        json.dump(users, f)


def add_new_user(user_id, username):
    """Добавляет пользователя в список новых"""
    users = load_new_users()
    # Проверяем, нет ли уже такого пользователя
    for user in users:
        if user['id'] == user_id:
            return False

    users.append({
        'id': user_id,
        'username': username,
        'date_added': str(message.date)  # Используется при вызове из start_command
    })
    save_new_users(users)
    return True


def remove_new_user(user_id):
    """Удаляет пользователя из списка новых"""
    users = load_new_users()
    users = [user for user in users if user['id'] != user_id]
    save_new_users(users)


def is_admin(user_id):
    admins = load_admins()
    return user_id in admins


def is_main_admin(user_id):
    return user_id == MAIN_ADMIN_ID


def get_user_username(user_id):
    """Получает юзернейм пользователя по его ID"""
    try:
        user = bot.get_chat(user_id)
        if user.username:
            return f"@{user.username}"
        else:
            return "(нет username)"
    except:
        return "(скрыт или не найден)"


def get_total_applications_count():
    """Получает общее количество заявок за всё время"""
    try:
        if os.path.exists('applications.json'):
            with open('applications.json', 'r') as f:
                applications = json.load(f)
                return len(applications)
    except:
        pass
    return 0


@app.route('/get_admins', methods=['GET'])
def get_admins_endpoint():
    admins = load_admins()
    print(f"Запрос списка админов: {admins}")
    return jsonify(admins)


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})


def run_flask():
    app.run(host='0.0.0.0', port=5001, debug=False, use_reloader=False)


def get_admin_keyboard():
    """Создает клавиатуру для администраторов около строки ввода"""
    markup = ReplyKeyboardMarkup(resize_keyboard=True, row_width=3)
    btn1 = KeyboardButton("💻 Админ панель")
    btn2 = KeyboardButton("📊 Статистика")
    markup.add(btn1, btn2)
    return markup


def get_admin_management_keyboard():
    """Создает клавиатуру для управления администраторами около строки ввода"""
    markup = ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
    btn1 = KeyboardButton("➕ Добавить администратора")
    btn2 = KeyboardButton("➖ Удалить администратора")
    btn3 = KeyboardButton("📋 Список администраторов")

    # Добавляем кнопку New, если есть новые пользователи
    new_users = load_new_users()
    if new_users:
        btn_new = KeyboardButton(f"🆕 New ({len(new_users)})")
        markup.add(btn1, btn2, btn_new)
    else:
        markup.add(btn1, btn2)

    btn3 = KeyboardButton("📋 Список администраторов")
    btn4 = KeyboardButton("↩ Назад")
    markup.add(btn3)
    markup.add(btn4)
    return markup


@bot.message_handler(commands=['start'])
def start_command(message):
    user_id = message.from_user.id
    username = message.from_user.username

    # Формируем username для отображения
    username_display = f"@{username}" if username else "(нет username)"

    if is_admin(user_id):
        markup = get_admin_keyboard()
        bot.reply_to(
            message,
            "Вы являетесь администратором, теперь все заявки с сайта будут приходить к вам в чат ✅\n\nИспользуйте кнопки внизу для управления ⤵",
            reply_markup=markup
        )
    else:
        # Отправляем приветственное сообщение пользователю
        bot.reply_to(
            message,
            "Бот для получения заявок с сайта 🤖",
            reply_markup=ReplyKeyboardRemove()
        )

        # Добавляем пользователя в список новых и отправляем уведомление главному админу
        if is_main_admin(MAIN_ADMIN_ID):
            # Сохраняем пользователя
            users = load_new_users()
            # Проверяем, нет ли уже такого пользователя
            user_exists = False
            for user in users:
                if user['id'] == user_id:
                    user_exists = True
                    break

            if not user_exists:
                users.append({
                    'id': user_id,
                    'username': username_display,
                    'date_added': str(message.date)
                })
                save_new_users(users)

                # Отправляем уведомление главному админу с кнопкой New
                try:
                    # Получаем обновленную клавиатуру для главного админа
                    admin_markup = get_admin_management_keyboard()

                    bot.send_message(
                        MAIN_ADMIN_ID,
                        f"🆕 Новый пользователь активировал бота:\n\nID: {user_id}\nUsername: {username_display}",
                        reply_markup=admin_markup
                    )
                except Exception as e:
                    print(f"Ошибка отправки уведомления главному админу: {e}")


@bot.message_handler(func=lambda message: message.text and "🆕 New" in message.text)
def show_new_users(message):
    """Показывает список новых пользователей"""
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    new_users = load_new_users()
    if not new_users:
        bot.send_message(message.chat.id, "Новых пользователей нет")
        return

    user_list = []
    for user in new_users:
        user_list.append(f"ID: {user['id']}\nUsername: {user['username']}")

    markup = get_admin_management_keyboard()
    bot.send_message(
        message.chat.id,
        f"🆕 Новые пользователи:\n\n" + "\n\n".join(user_list),
        reply_markup=markup
    )


@bot.message_handler(func=lambda message: message.text == "📊 Статистика")
def show_statistics(message):
    if not is_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для просмотра статистики")
        return

    total_applications = get_total_applications_count()
    markup = get_admin_keyboard()

    bot.send_message(
        message.chat.id,
        f"📊 Общая статистика:\n\nВсего заявок за всё время: {total_applications}",
        reply_markup=markup
    )


@bot.message_handler(func=lambda message: message.text == "💻 Админ панель")
def admin_management(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для управления администраторами")
        return

    markup = get_admin_management_keyboard()
    bot.send_message(
        message.chat.id,
        "Управление администраторами\n\nВыберите действие:",
        reply_markup=markup
    )


@bot.message_handler(func=lambda message: message.text == "↩ Назад")
def back_to_main(message):
    if is_admin(message.from_user.id):
        markup = get_admin_keyboard()
        bot.send_message(
            message.chat.id,
            "Вы являетесь администратором, теперь все заявки с сайта будут приходить к вам в чат ✅\n\nИспользуйте кнопки внизу для управления ⤵",
            reply_markup=markup
        )


@bot.message_handler(func=lambda message: message.text == "➕ Добавить администратора")
def add_admin_request(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    markup = ReplyKeyboardMarkup(resize_keyboard=True, row_width=1)
    cancel_btn = KeyboardButton("❌ Отмена")
    markup.add(cancel_btn)

    bot.send_message(
        message.chat.id,
        "➕ Добавление администратора\n\nВведите Telegram ID пользователя, которого хотите добавить:",
        reply_markup=markup
    )
    bot.register_next_step_handler(message, process_add_admin)


@bot.message_handler(func=lambda message: message.text == "❌ Отмена")
def cancel_action(message):
    admin_management(message)


@bot.message_handler(func=lambda message: message.text == "➖ Удалить администратора")
def remove_admin_request(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    admins = load_admins()
    markup = ReplyKeyboardMarkup(resize_keyboard=True, row_width=1)

    for admin_id in admins:
        if admin_id != MAIN_ADMIN_ID:
            username = get_user_username(admin_id)
            btn_text = f"❌ Удалить {admin_id} {username}"
            markup.add(KeyboardButton(btn_text))

    cancel_btn = KeyboardButton("↩ Назад")
    markup.add(cancel_btn)

    bot.send_message(
        message.chat.id,
        "➖ Удаление администратора\n\nВыберите администратора для удаления:",
        reply_markup=markup
    )


@bot.message_handler(func=lambda message: message.text and message.text.startswith("❌ Удалить "))
def process_remove_admin(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    try:
        # Извлекаем ID из текста (формат: "❌ Удалить 123456789 @username")
        parts = message.text.split()
        user_id = int(parts[2])
        username = parts[3] if len(parts) > 3 else "(нет username)"

        admins = load_admins()

        if user_id == MAIN_ADMIN_ID:
            bot.reply_to(message, "❌ Нельзя удалить главного администратора")
        elif user_id in admins:
            admins.remove(user_id)
            save_admins(admins)
            bot.reply_to(message, f"✅ Пользователь {user_id} {username} удален из администраторов")
            print(f"Администратор {user_id} удален. Текущий список: {admins}")
        else:
            bot.reply_to(message, f"❌ Пользователь {user_id} не является администратором")

        remove_admin_request(message)

    except (ValueError, IndexError):
        bot.reply_to(message, "❌ Ошибка при удалении администратора")


@bot.message_handler(func=lambda message: message.text == "📋 Список администраторов")
def list_admins(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    admins = load_admins()
    admin_lines = []

    for admin_id in admins:
        username = get_user_username(admin_id)
        if admin_id == MAIN_ADMIN_ID:
            admin_lines.append(f"{admin_id} {username} (главный)")
        else:
            admin_lines.append(f"{admin_id} {username}")

    admin_list = "\n".join(admin_lines)
    markup = get_admin_management_keyboard()

    bot.send_message(
        message.chat.id,
        f"📋 Список администраторов:\n\n{admin_list}",
        reply_markup=markup
    )


def process_add_admin(message):
    if message.text == "❌ Отмена":
        admin_management(message)
        return

    try:
        user_id = int(message.text.strip())
        admins = load_admins()

        if user_id in admins:
            bot.reply_to(message, f"❌ Пользователь {user_id} уже является администратором")
        else:
            admins.append(user_id)
            save_admins(admins)

            username = get_user_username(user_id)
            bot.reply_to(message, f"✅ Пользователь {user_id} {username} добавлен в администраторы")
            print(f"Администратор {user_id} добавлен. Текущий список: {admins}")

            # Удаляем пользователя из списка новых, если он там был
            remove_new_user(user_id)

            # Получаем username главного администратора для уведомления
            main_admin_username = get_user_username(MAIN_ADMIN_ID)

            # Отправляем уведомление новому администратору
            try:
                # Первое сообщение
                bot.send_message(
                    user_id,
                    f"Главный администратор {main_admin_username} добавил вас в администраторы ‼"
                )

                # Второе сообщение с клавиатурой
                markup = get_admin_keyboard()
                bot.send_message(
                    user_id,
                    "Вы являетесь администратором, теперь все заявки с сайта будут приходить к вам в чат ✅\n\nИспользуйте кнопки внизу для управления ⤵",
                    reply_markup=markup
                )
            except Exception as e:
                print(f"Не удалось отправить уведомление пользователю {user_id}: {e}")

        admin_management(message)

    except ValueError:
        bot.reply_to(message, "❌ Ошибка: введите корректный Telegram ID (только цифры)")
        admin_management(message)


# Оставляем команды для обратной совместимости
@bot.message_handler(commands=['add_admin'])
def add_admin_command(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    try:
        user_id = int(message.text.split()[1])
        admins = load_admins()

        if user_id in admins:
            bot.reply_to(message, f"Пользователь {user_id} уже является администратором")
        else:
            admins.append(user_id)
            save_admins(admins)

            username = get_user_username(user_id)
            bot.reply_to(message, f"Пользователь {user_id} {username} добавлен в администраторы")
            print(f"Администратор {user_id} добавлен. Текущий список: {admins}")

            # Удаляем пользователя из списка новых, если он там был
            remove_new_user(user_id)

            # Получаем username главного администратора для уведомления
            main_admin_username = get_user_username(MAIN_ADMIN_ID)

            # Отправляем уведомление новому администратору
            try:
                # Первое сообщение
                bot.send_message(
                    user_id,
                    f"Главный администратор {main_admin_username} добавил вас в администраторы ‼"
                )

                # Второе сообщение с клавиатурой
                markup = get_admin_keyboard()
                bot.send_message(
                    user_id,
                    "Вы являетесь администратором, теперь все заявки с сайта будут приходить к вам в чат ✅\n\nИспользуйте кнопки внизу для управления ⤵",
                    reply_markup=markup
                )
            except Exception as e:
                print(f"Не удалось отправить уведомление пользователю {user_id}: {e}")

    except (IndexError, ValueError):
        bot.reply_to(message, "Использование: /add_admin TELEGRAM_ID")


@bot.message_handler(commands=['remove_admin'])
def remove_admin_command(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    try:
        user_id = int(message.text.split()[1])
        admins = load_admins()

        if user_id == MAIN_ADMIN_ID:
            bot.reply_to(message, "Нельзя удалить главного администратора")
        elif user_id in admins:
            admins.remove(user_id)
            save_admins(admins)

            username = get_user_username(user_id)
            bot.reply_to(message, f"Пользователь {user_id} {username} удален из администраторов")
            print(f"Администратор {user_id} удален. Текущий список: {admins}")
        else:
            bot.reply_to(message, f"Пользователь {user_id} не является администратором")

    except (IndexError, ValueError):
        bot.reply_to(message, "Использование: /remove_admin TELEGRAM_ID")


@bot.message_handler(commands=['list_admins'])
def list_admins_command(message):
    if not is_main_admin(message.from_user.id):
        bot.reply_to(message, "У вас нет прав для этой команды")
        return

    admins = load_admins()
    admin_lines = []

    for admin_id in admins:
        username = get_user_username(admin_id)
        if admin_id == MAIN_ADMIN_ID:
            admin_lines.append(f"{admin_id} {username} (главный)")
        else:
            admin_lines.append(f"{admin_id} {username}")

    admin_list = "\n".join(admin_lines)
    bot.reply_to(message, f"Список администраторов:\n{admin_list}")


if __name__ == '__main__':
    flask_thread = Thread(target=run_flask, daemon=True)
    flask_thread.start()

    print("Бот успешно запущен")
    print(f"Flask сервер запущен на порту 5001")
    print(f"Текущий список администраторов: {load_admins()}")
    bot.polling(none_stop=True)