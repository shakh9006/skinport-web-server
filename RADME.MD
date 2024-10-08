# Skinport Item Purchase API

Это API позволяет получать информацию о предметах с платформы Skinport, а также осуществлять покупки предметов
пользователями с учетом их баланса.

## Технологии

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **Redis**
- **Prisma**
- **Docker**
- **CI/CD** (GitHub Actions)
- **Jest** (юнит и e2e тестирование)

## Установка

1. **Клонировать репозиторий:**
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```

2. **Перейти в директорию проекта:**
    ```bash
       cd your-repo-name
     ```
3. **Запустить Docker контейнеры:**
    ```bash
       docker-compose up -d --build
     ```

## Эндпоинты

### 1. Получение списка предметов

- **URL**: `/api/v1/items`
- **Метод**: `GET`
- **Описание**: Возвращает массив объектов с предметами и их минимальными ценами.


- **Ответ:**
  ```json
  [
    {
      "name": "abc",
      "tradablePrice": 50.00,
      "nonTradablePrice": 45.00
    },
    {
      "name": "abc2",
      "tradablePrice": 30.00,
      "nonTradablePrice": 25.00
    }
  ]
  ```

### 2. Процесс покупки предмета

- **URL**: `/api/v1/purchase`
- **Метод**: `POST`
- **Описание**: Возвращает массив объектов с предметами и их минимальными ценами.
- **Тело запроса:**:
  ```json
    {
      "userId": 1,
      "itemId": "item-id",
      "price": 100
    }
  ```

- **Ответ:**
  ```json
    {
       "message": "Purchase successful"
    }
  ```


## Тестирование

### Для запуска тестов используйте следующую команду:
```bash
   npm run test
 ```