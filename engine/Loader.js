;
(function () {
    'use strict';

    class Loader {
        constructor() {

            this.loadOrder = {
                images: [],
                jsons: []
            }
            this.resources = {
                images: [],
                jsons: []
            }

        }

        // метод добавления имени картинки и путь к ней
        addImage(name, src) {
            this.loadOrder.images.push({name, src});
        }
        // Метод добавления json и путь к файлу
        addJson(name, address) {
            this.loadOrder.jsons.push({name, address});
        }

        // метод загрузки
        load(callback) {
            const promises = [];

            // перебираем все изображения в loadOrder
            for (const imageData of this.loadOrder.images) {
                const {name, src} = imageData;
                const promise = Loader
                    .loadImage(src)

                    // когда изображение будет загружено, записываем его в resources 
                    .then(image => {
                        this.resources.images[name] = image;

                        // затем удаляем изображения из loadOrder.images
                        if (this.loadOrder.images.includes(imageData)) {

                            const index = this.loadOrder.images.indexOf(imageData);
                            this.loadOrder.images.splice(index, 1);
                        }
                    });
                promises.push(promise);
            }
            // загружаем json
            for (const jsonData of this.loadOrder.jsons) {
                const {name, address} = jsonData;
                const promise = Loader
                    .loadJson(address)
                    .then(json => {
                        this.resources.jsons[name] = json;
                        if (this.loadOrder.jsons.includes(jsonData)) {

                            const index = this.loadOrder.images.indexOf(jsonData);
                            this.loadOrder.jsons.splice(index, 1);
                        }
                    });
                promises.push(promise);
            }
            // когда выполняться все промисы запускаем колбек функцию
            Promise.all(promises).then(() => callback());
        }

        // создаём статический метод. Этот метод виден только самому классу, но не его экземплярам
        static loadImage(src) {
            return new Promise((resolve, reject) => {
                try {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.src = src;
                } catch (err) {
                    reject(err);
                }
            });
        }

        static loadJson (address) {
            return new Promise((resolve, reject) => {
                fetch(address)
                    .then(result => result.json())
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            });
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Loader = Loader;
})();