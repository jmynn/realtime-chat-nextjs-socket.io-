## Getting Started

Потребуется docker

```bash
# 1]
docker-compose up -d
# [Для подключения к БД, чтобы ручками работать с mongosh]
docker-compose exec mongo mongo -u sa -p testpassword
# 2] 
yarn
# or
npm i
# 3]
yarn dev
# or
npm run dev
```
4]
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*Функционал*
- Авторизация
- Общение через сокеты
- Создание постов на своей стене
- Вомзожность лайкать посты свои и своих друзей(те, с которыми вы общаетесь)
- Поиск собеседников по имени или почте
