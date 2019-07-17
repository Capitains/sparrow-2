export class Document {
    /*** Document in DTS
     *
     * @param id : Id of the document
     * @param resolver : Resolver to navigate
     * @param xml : XML representation of the document (Optional)
     * @param ref : Navigation of the document (Optional)
     */
    constructor(id, resolver, xml, ref) {
        this.resolver = resolver;
        this.id = id;
        this.ref = ref;
        this.xml = xml;
    }
}