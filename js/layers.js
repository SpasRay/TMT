addLayer("A", {
    name: "ws", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "^_^", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF9900",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "笑容", // Name of prestige currency
    baseResource: "ws能量", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('A', 13)) mult = mult.times(upgradeEffect('A', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "按S进行重置以获取笑容", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title: "pjsk，启动！",
            description: "每秒补充1点WS能量。Wonderhoi！",
            cost: new Decimal(1),
        },
        12:{
            title: "小小的奇幻舞台",
            description: "每秒补充2点ws能量",
            cost: new Decimal(2),
        },
        13:{
            title: "凤凰仙境乐园",
            description: "每秒产生5点ws能量，再基于ws能量提升笑容获取量",
            cost: new Decimal(3),
            effect() {
        return player.points.add(1).pow(0.08)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    }
})
