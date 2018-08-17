var request = require('sync-request');
var fs = require('fs-extra');
var gsjson = require('google-spreadsheet-to-json');
var deasync = require('deasync');
var config = require('../config.json');
var userHome = require('user-home');
var keys = require(userHome + '/.gu/interactives.json');

var json,
    data = {regions: {}},
    conferences = [];

function fetchData(callback) {
    gsjson({
        spreadsheetId: config.data.id,
        allWorksheets: true,
        credentials: keys.google
    })
    .then(function(result) {
        callback(result);
    })
    .then(function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function setSheetNames(data) {
    data = {
        'sections': data[0],
        'furniture': data[1],
        'related': data[2]
    }

    return data;
}

function setFurniture(data) {
    for (var i = 0; i < data.furniture.length; i++) {
        data[data.furniture[i].option] = data.furniture[i].value
    }

    delete data.furniture;
    return data;
}

function cleanImageUrls(data) {
    for (var i in data.sections) {
        if (data.sections[i].type === 'image') {
            data.sections[i].asset = convertToGridUrl(data.sections[i].asset);
        }
    }

    return data;
}

function organiseSections(data) {
    var organisedSections = [];

    for (var i in data.sections) {
        if (data.sections[i].type === 'text' || data.sections[i].type === 'outro') {
            organisedSections.push(data.sections[i]);
        } else {
            if (organisedSections.length > 0) {
                if (organisedSections[organisedSections.length - 1].type === 'media') {
                    organisedSections[organisedSections.length - 1].media.push(data.sections[i]);
                } else {
                    organisedSections.push({
                        type: 'media',
                        media: [data.sections[i]]
                    })
                }
            }
        }
    }

    data.sections = organisedSections;

    return data;
}

function convertToGridUrl(url) {
    if (url) {
        var crop = url.split('?crop=')[1];
            url = url.replace('gutools.co.uk', 'guim.co.uk');
            url = url.replace('http://', 'https://');
            url = url.replace('images/', '');
            url = url.split('?')[0];

        return url + '/' + crop;
    }
}

module.exports = function getData() {
    var isDone = false;

    fetchData(function(result) {
        data = result;
        data = setSheetNames(data);
        data = setFurniture(data);
        data = cleanImageUrls(data);
        data = organiseSections(data);

        isDone = true;
    });

    deasync.loopWhile(function() {
        return !isDone;
    });

    return data;
};