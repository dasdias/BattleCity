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
                displayObject.setParent(this);
            }
        }

        remove (displayObject) {
            if (this.displayObjects.includes(displayObject)) {
                const index = this.displayObjects.indexOf(displayObject);
                this.displayObjects.splice(index, 1);
                displayObject.setParent(null);
            }
        }

        // обходим все объекты и применяем к ним метод draw
        draw (canvas, context) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(-this.rotation);
            context.scale(this.scaleX, this.scaleY);

            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context);
            }
            context.restore();
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Container = Container;
})();