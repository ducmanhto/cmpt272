import { Pig } from "./pig-models";

interface PigControllerInterface {
    add(p: Pig): void
    getAll(): Pig[]
    delete(p: Pig): void
}

export class PigController implements PigControllerInterface {
    pigs: Pig[]

    constructor() {
        this.pigs = []
    }

    add(p: Pig): void {
        this.pigs.push(p)
        localStorage.pigsArray = JSON.stringify(this.pigs)
    }

    getAll(): Pig[] {
        return JSON.parse(localStorage.pigsArray)
    }

    delete(p: Pig): void {
        const index = this.pigs.findIndex(pig => pig.id === p.id)
        this.pigs.splice(index, 1)
        localStorage.pigsArray = JSON.stringify(this.pigs)
    }
}