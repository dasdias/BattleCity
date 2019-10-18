;(function () {
    'use strict';

    class Sprite extends GameEngine.DisplayObject {
        constructor(texture, args = {}) {
            super(args);
            this.texture = texture;

            // frame указывает какая часть изображения будет отображаться
            const frame = args.frame || {};

            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture.width,
                height: frame.height || texture.height
            };    
            if (args.width === undefined) {
                this.width = this.frame.width;
            }  
            if (args.height === undefined) {
                this.height = this.frame.height;
            }  
        }

       

        draw(canvas, context) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(-this.rotation);
            context.scale(this.scaleX, this.scaleY);

            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                this.absoluteX - this.scaleX,
                this.absoluteY - this.scaleY,
                this.width,
                this.height
            );
            context.restore();
        }
    }

    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})();