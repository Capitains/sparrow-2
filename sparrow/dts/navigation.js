import { Metadata } from "./metadata.js";


'use strict';


export class Reference {
    constructor(start, end) {
        this.start = start;
        this.end = end;

    }

    uriRepresentation() {
        /**
         * URI representation of a reference
         */
        if (this.start && this.end) {
            return "start="+this.start+"&end=" + this.end;
        } else {
            return "ref="+this.start;
        }
    }
}

export class Navigation {
    constructor(document_id, resolver, data) {
        this.resolver = resolver;
        this.id = document_id;
        this.metadata = new Metadata(data["dts:metadata"], data["dts:dublincore"]);

        this.ref = new Reference(
            data["ref"] || data["start"],
            data["end"]
        );
        this.metadata = null;
    }
}

export class NavigationGroup {
    constructor(document_id, resolver, data, ref) {
        this.resolver = resolver;
        this.id = document_id;
        this.ref = ref;

        this.members = data["member"].map(
            member => new Navigation(this.id, this.resolver, member)
        );
    }
}