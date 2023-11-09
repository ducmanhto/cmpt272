export abstract class Pig {
    static num = 0
    id: number

    constructor(public category: string, public name: string, public breed: string, public height: number, public weight: number, public personality: string, public ability: any) {
        this.id = Pig.num
        Pig.num++
    }
}

export class Grey extends Pig {
    swimming: number

    constructor(cat: string, n: string, b: string, h: number, w: number, p: string, sw: number) {
        super(cat, n, b, h, w, p, sw)
        this.swimming = sw
    }
}
export class Chesnut extends Pig {
    language: string

    constructor(cat: string, n: string, b: string, h: number, w: number, p: string, ability: string) {
        super(cat, n, b, h, w, p, ability)
        this.language = ability
    }
}

export class White extends Pig {
    running: number

    constructor(cat: string, n: string, b: string, h: number, w: number, p: string, ability: number) {
        super(cat, n, b, h, w, p, ability)
        this.running = ability
    }
}

export class Black extends Pig {
    strength: number

    constructor(cat: string, n: string, b: string, h: number, w: number, p: string, ability: number) {
        super(cat, n, b, h, w, p, ability)
        this.strength = ability
    }
}
