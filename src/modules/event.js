class Event {
    constructor(system) {
        this.#system = system;
    }

    #system;
    #events;

    initial({events}) {
        this.#events = events;
        for(const id in events) {
            const event = events[id];
            if(!event.branch) continue;
            event.branch = event.branch.map(b=>{
                b = b.split(':');
                b[1] = Number(b[1]);
                return b;
            });
        }
        return this.count;
    }

    get count() {
        return Object.keys(this.#events).length;
    }

    check(eventId) {
        const { include, exclude, NoRandom } = this.get(eventId);
        if(NoRandom) return false;
        if(exclude && this.#system.check(exclude)) return false;
        if(include) return this.#system.check(include);
        return true;
    }

    get(eventId) {
        const event = this.#events[eventId];
        if(!event) throw new Error(`[ERROR] No Event[${eventId}]`);
        return this.#system.clone(event);
    }

    information(eventId) {
        const { event: description, grade, choices, postEvent } = this.get(eventId)
        return { description, grade, choices, postEvent };
    }

    do(eventId) {
        const { effect, branch, event: description, postEvent, grade, choices } = this.get(eventId);
        if(branch)
            for(const [cond, next] of branch)
                if(this.#system.check(cond))
                    return { effect, next, description, grade, choices };
        return { effect, postEvent, description, grade, choices };
    }

}

export default Event;
