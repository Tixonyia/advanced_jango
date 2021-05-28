ДЗ не сделал. Запары по всем фронтам. Прошу поставить "хорошо" (итоговая влияет на GB), а с webpackом разобраться обязуюсь как со временем полегче будет.
На второе задание ответ: либо флаг --wath при вызове в консоле, либо установить сервер разработки, выполните следующую команду:
npm install webpack-dev-server --save-dev. И изменить package.json "scripts" : {
// ...
"dev": "webpack-dev-server --mode development --open",
"build": "webpack --mode production"
}
Запуск npm run dev
