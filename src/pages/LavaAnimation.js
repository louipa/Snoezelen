export function lavaAnimation() {
    let stop = true;
    let metaballs;
    let sizeFactor = 1;

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.magnitude = x * x + y * y;
            this.computed = 0;
            this.force = 0;
        }

        add(vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        }
    }

    class Ball {
        constructor(environment) {
            const speedFactor = 0.2 + Math.random() * 0.25;
            const sizeVariation = 0.1;
            const maxSizeVariation = 1.5;

            this.velocity = new Vector(
                (Math.random() > 0.5 ? 1 : -1) * speedFactor,
                (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
            );
            this.position = new Vector(
                0.2 * environment.width +
                    Math.random() * environment.width * 0.6,
                0.2 * environment.height +
                    Math.random() * environment.height * 0.6
            );
            this.basesize =
                environment.minDimension / 30 +
                (Math.random() * (maxSizeVariation - sizeVariation) +
                    sizeVariation) *
                    (environment.minDimension / 30);
            this.size = this.basesize * sizeFactor;
            this.width = environment.width;
            this.height = environment.height;
        }

        move() {
            if (this.position.x >= this.width - this.size) {
                if (this.velocity.x > 0) this.velocity.x = -this.velocity.x;
                this.position.x = this.width - this.size;
            } else if (this.position.x <= this.size) {
                if (this.velocity.x < 0) this.velocity.x = -this.velocity.x;
                this.position.x = this.size;
            }

            if (this.position.y >= this.height - this.size) {
                if (this.velocity.y > 0) this.velocity.y = -this.velocity.y;
                this.position.y = this.height - this.size;
            } else if (this.position.y <= this.size) {
                if (this.velocity.y < 0) this.velocity.y = -this.velocity.y;
                this.position.y = this.size;
            }

            this.position = this.position.add(this.velocity);
        }

        changeSize() {
            this.size = sizeFactor * this.basesize;
        }
    }

    class Metaballs {
        constructor(width, height, ballCount, color1, color2, context) {
            this.step = 5;
            this.width = width;
            this.height = height;
            this.minDimension = Math.min(width, height);
            this.sx = Math.floor(width / this.step);
            this.sy = Math.floor(height / this.step);
            this.paint = false;
            this.metaFill = this.createGradient(
                width,
                height,
                width,
                color1,
                color2,
                context
            );
            this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
            this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
            this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
            this.ix = [
                1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1
            ];
            this.grid = [];
            this.balls = [];
            this.iteration = 0;
            this.sign = 1;
            this.context = context;

            for (let i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
                this.grid[i] = new Vector(
                    (i % (this.sx + 2)) * this.step,
                    Math.floor(i / (this.sx + 2)) * this.step
                );
            }

            for (let i = 0; i < ballCount; i++) {
                this.balls[i] = new Ball(this);
            }
        }

        createGradient(x, y, radius, color1, color2, context) {
            const gradient = context.createRadialGradient(
                x / 1,
                y / 1,
                0,
                x / 1,
                y / 1,
                radius
            );
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            return gradient;
        }

        computeForce(x, y, index) {
            let forceValue;
            const gridIndex = index || x + y * (this.sx + 2);

            if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
                forceValue = 0.6 * this.sign;
            } else {
                forceValue = 0;
                const gridPoint = this.grid[gridIndex];
                for (let ball of this.balls) {
                    forceValue +=
                        (ball.size * ball.size) /
                        (-2 * gridPoint.x * ball.position.x -
                            2 * gridPoint.y * ball.position.y +
                            ball.position.magnitude +
                            gridPoint.magnitude);
                }
                forceValue *= this.sign;
            }

            this.grid[gridIndex].force = forceValue;
            return forceValue;
        }

        marchingSquares(point) {
            const [i, s, h] = point;
            const gridIndex = i + s * (this.sx + 2);

            if (this.grid[gridIndex].computed === this.iteration) return false;

            let state = 0;
            for (let a = 0; a < 4; a++) {
                const adjacentIndex =
                    i + this.ix[a + 12] + (s + this.ix[a + 16]) * (this.sx + 2);
                let adjacentForce = this.grid[adjacentIndex].force;
                if (
                    !adjacentForce ||
                    (adjacentForce > 0 && this.sign < 0) ||
                    (adjacentForce < 0 && this.sign > 0)
                ) {
                    adjacentForce = this.computeForce(
                        i + this.ix[a + 12],
                        s + this.ix[a + 16],
                        adjacentIndex
                    );
                }
                if (Math.abs(adjacentForce) > 1) state += Math.pow(2, a);
            }

            if (state === 15) return [i, s - 1, false];
            let caseIndex;
            if (state === 5) {
                caseIndex = h === 2 ? 3 : 1;
            } else if (state === 10) {
                caseIndex = h === 3 ? 0 : 2;
            } else {
                caseIndex = this.mscases[state];
                this.grid[gridIndex].computed = this.iteration;
            }

            const stepRatio =
                this.step /
                (Math.abs(
                    Math.abs(
                        this.grid[
                            i +
                                this.plx[4 * caseIndex + 2] +
                                (s + this.ply[4 * caseIndex + 2]) *
                                    (this.sx + 2)
                        ].force
                    ) - 1
                ) /
                    Math.abs(
                        Math.abs(
                            this.grid[
                                i +
                                    this.plx[4 * caseIndex + 3] +
                                    (s + this.ply[4 * caseIndex + 3]) *
                                        (this.sx + 2)
                            ].force
                        ) - 1
                    ) +
                    1);

            this.context.lineTo(
                this.grid[
                    i +
                        this.plx[4 * caseIndex] +
                        (s + this.ply[4 * caseIndex]) * (this.sx + 2)
                ].x +
                    this.ix[caseIndex] * stepRatio,
                this.grid[
                    i +
                        this.plx[4 * caseIndex + 1] +
                        (s + this.ply[4 * caseIndex + 1]) * (this.sx + 2)
                ].y +
                    this.ix[caseIndex + 4] * stepRatio
            );

            this.paint = true;
            return [
                i + this.ix[caseIndex + 4],
                s + this.ix[caseIndex + 8],
                caseIndex
            ];
        }

        renderMetaballs() {
            this.iteration++;
            this.sign = -this.sign;
            this.paint = false;
            this.context.fillStyle = this.metaFill;
            this.context.beginPath();

            for (let ball of this.balls) {
                ball.move();
            }

            for (let ball of this.balls) {
                let point = [
                    Math.round(ball.position.x / this.step),
                    Math.round(ball.position.y / this.step),
                    false
                ];
                do {
                    point = this.marchingSquares(point);
                } while (point);

                if (this.paint) {
                    this.context.fill();
                    this.context.closePath();
                    this.context.beginPath();
                    this.paint = false;
                }
            }
        }

        recalculateForces() {
            for (let x = 0; x <= this.sx; x++) {
                for (let y = 0; y <= this.sy; y++) {
                    const index = x + y * (this.sx + 2);
                    this.computeForce(x, y, index);
                }
            }
        }
    }

    const screen = {
        element: null,
        callback: null,
        context: null,
        width: 0,
        height: 0,
        left: 0,
        top: 0,

        init(elementId, callback, resize) {
            this.element = document.getElementById(elementId);
            this.callback = callback || null;

            if (this.element.tagName === 'CANVAS') {
                this.context = this.element.getContext('2d');
            }

            window.addEventListener('resize', this.resize.bind(this), false);
            this.element.onselectstart = () => false;
            this.element.ondrag = () => false;

            if (resize) this.resize();
            return this;
        },

        resize() {
            let elem = this.element;
            this.width = elem.offsetWidth;
            this.height = elem.offsetHeight;
            this.left = 0;
            this.top = 0;

            while (elem) {
                this.left += elem.offsetLeft;
                this.top += elem.offsetTop;
                elem = elem.offsetParent;
            }

            if (this.context) {
                this.element.width = this.width;
                this.element.height = this.height;
            }

            if (this.callback) this.callback();
        }
    };

    if (document.getElementById('lamp-anim')) {
        const screenConfig = screen.init('lamp-anim', null, true);
        const canvasContext = screenConfig.context;

        metaballs = new Metaballs(
            screenConfig.width,
            screenConfig.height,
            10,
            '#ff0000',
            '#0040ff',
            canvasContext
        );

        const animationFrame = () => {
            if (stop) return;
            requestAnimationFrame(animationFrame);
            canvasContext.clearRect(
                0,
                0,
                screenConfig.width,
                screenConfig.height
            );
            metaballs.renderMetaballs();
        };

        const setBallNumber = (ballNumber) => {
            const currentBallNumber = metaballs.balls.length;
            console.log(currentBallNumber, ballNumber);
            if (ballNumber == currentBallNumber) return;

            const difnumber = ballNumber - currentBallNumber;

            for (let i = 0; i < Math.abs(difnumber); i++) {
                if (difnumber > 0) {
                    metaballs.balls.push(new Ball(metaballs));
                } else {
                    metaballs.balls.pop();
                }
            }

            metaballs.recalculateForces();
        };

        const setBallSize = (factor) => {
            if (factor == sizeFactor) return;
            sizeFactor = factor;
            for (let ball of metaballs.balls) {
                ball.changeSize();
            }
            metaballs.recalculateForces();
        };

        screenConfig.resize();
        return {
            run: animationFrame,
            changeState: () => (stop = !stop),
            setBallNumber: setBallNumber,
            setBallSize: setBallSize
        };
    }
}
