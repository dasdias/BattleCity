;(function () {
    'use strict';

    class Container {
        constructor () {
            this.displayObjects = [];
        }
        // метод добавления объектов которые нужно будет рисовать
        add (displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject);
            }
        }

        remove () {}

        // обходим все объекты и применяем к ним метод draw
        draw (canvas, context) {
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context);
            }
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Container = Container;
})();