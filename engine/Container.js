;(function () {
    'use strict';

    class Container extends GameEngine.DisplayObject {
        constructor (args = {}) {
            super(args);
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
            context.save();
            context.translate(this.x, this.y);
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context);
            }
            context.restore();
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Container = Container;
})();