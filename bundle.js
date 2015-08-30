(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){




var menuItemPriceSchema = new mongoose.Schema({
    price: {type:Number, default: 0},
    priceFor: String
});

var menuItemSchema = new mongoose.Schema({
        menuItemId: mongoose.Schema.Types.ObjectId,
        name: {type: String, required: "{PATH} is required."},
        description: String,
        prices: [menuItemPriceSchema]
});

var menuSectionSchema = new mongoose.Schema({
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        items: [menuItemSchema],
        footer: String
});

exports.menuSchema = new mongoose.Schema({
        meta: {
            name: {type: String, required: "{PATH} is required."},
            description: String,
            dateCreated: { type: Date, default: Date.now },
            lastModified: {type: Date, default: Date.now}
        },
        company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        title: {type: String, required: "{PATH} is required."},
        subtitle: String,
        sections: [menuSectionSchema],
        footer: String
});
},{}]},{},[1]);
