// 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// Маленький (50 рублей, 20 калорий).
// Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок 
//(обязательно):
// С сыром (+10 рублей, +20 калорий).
// С салатом (+20 рублей, +5 калорий).
// С картофелем (+15 рублей, +10 калорий).
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и 
// полить майонезом (+20 рублей, +5 калорий). ### 3Напишите программу, рассчитывающую 
// стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из 
// методички, но можно использовать и свою.


class Burger {
    constructor(size, filling, seasoning) {
        this.size = size.toLowerCase();
        this.filling = filling.toLowerCase();
        this.seasoning = seasoning;
        this.totalPrice = 0;
        this.calorieContent = 0;
    }

    summAll() {
        if (this.size == 'большой') {
            this.totalPrice = 100;
            this.calorieContent = 40;
        }
        else {
            this.totalPrice = 50;
            this.calorieContent = 20;
        }
        switch (this.filling) {
            case 'сыр':
                this.totalPrice += 10;
                this.calorieContent += 20;
            case 'салат':
                this.totalPrice += 20;
                this.calorieContent += 5;
            case 'картофель':
                this.totalPrice += 15;
                this.calorieContent += 10;
        }
        for (let item in this.seasoning) {
            switch (item.toLowerCase()) {
                case 'приправа':
                    this.totalPrice += 15;
                case 'майонез':
                    this.totalPrice += 20;
                    this.calorieContent += 5;
            }
        }
        alert(`Стоимость: ${this.totalPrice} Каллорийность: ${this.calorieContent}`);

    }



}

let burgerOne = new Burger('большой', 'Сыр', ['майонез', 'приправа']);
burgerOne.summAll()