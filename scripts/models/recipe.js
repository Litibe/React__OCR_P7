// eslint-disable-next-line no-unused-vars

class Recipe {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
        this._img = data.img;
    }

    get id() { return this._id; }

    get name() { return this._name; }

    get servings() { return `${this._servings} portions`; }

    get ingredients() { return this._ingredients; }

    get time() { return `${this._time} min`; }

    get description() { return this._description; }

    get appliance() { return this._appliance; }

    get ustensils() { return this._ustensils; }

    get img() {
        if (this._img === undefined) {
            return 'assets/writing-pad-ga9730ec45_1280.jpg';
        }
        return `assets/${this._img}`;
    }
}
