Component({
    externalClasses: ["l-class", "l-class-self", "l-self-class"],
    options: {
        addGlobalClass: !0
    },
    properties: {
        name: String,
        color: {
            type: String,
            value: "#3963bc"
        },
        size: {
            type: String,
            value: "40"
        }
    },
    ready: function () {
        this.properties.name || console.error("请传入Icon组件的name属性")
    },
    methods: {}
});