'use strict';

import { Metadata } from "./metadata.js";

export class Collection {
    constructor(json, resolver=null, context=null, parent=undefined) {
        this.id = json["@id"];
        this.resolver = resolver;
        this.title = json["title"];
        this.description = json["description"];
        this.children = [];
        this.parent = parent;
        this.type = json["@type"];
        this.metadata = new Metadata(json["dts:metadata"], json["dts:dublincore"]);

        if (json["member"]) {
            this.children = json.member.map(
                member => {
                    return new Collection(member, this.resolver, undefined, this);
                }
            );
        }
    }

    async getDocument(ref, mimetype) {
        // This way, it does not take into account the document link and it should.
        // This really is a first try at having a base library.
        // If I had time, I would probably have a check on a property this.documentRoute
        //   as a Resource might have a navigation route or document route from
        //   another distributor
        return this.resolver.getDocument(
            this.id,
            ref,
            mimetype
        )
    }
    async getNavigation(ref, level=1) {
        // Same rationale as this.getDocument
        return this.resolver.getNavigation(
            this.id,
            ref,
            level
        )
    }
}