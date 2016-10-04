// ScreenExporter for InvisionApp - prototyping
// Version 0.1

// This should export all layers whose names are preceeded with special symbols to
// separate screen pngs as specified in the following article:
// https://support.invisionapp.com/hc/en-us/articles/203730535-How-does-Photoshop-layer-syncing-work-

// Licensed under GPLv3
// (c)2016 Florian Lütkebohmert
// inquiries -> me@fluetke.eu

var currDoc = app.activeDocument; //get active document from illustrator
var exportLocation = "~/Desktop";
var exportFormat = "PNG8";
var png8_options = new ExportOptionsPNG8();
png8_options.antiAliasing = true;
png8_options.artBoardClipping = true;

//alert("Das Document enthält " + currDoc.artboards.length + " Zeichenflächen");

var no_layers_to_include = 0;
var screen_layers = [];

for (var i=0; i<currDoc.layers.length; i++) { //identify screenlayers and hide all other layers except always on layers

    var currLay = currDoc.layers[i];

    if (currLay.name[0] == "+") {//TODO: replace with regex matching or startswith
        screen_layers.push(currLay);
        currLay.visible = false;
    }
    else if (currLay.name[0] == "*") {
        continue; //these layers act as master layers visible on each screen, therefore they shouldn't be messed  with
    }
    else {
        currLay.visible = false;
    }
}

    //show layer after layer and export them
    for (var j=0; j<screen_layers.length; j++) {
        var alternative_layer = [];
        var scr_lay = screen_layers[j];
        scr_lay.visible = true;

        for(var k=0; k<scr_lay.layers.length; k++) { //this could go out of bounds
            if (scr_lay.layers[k].name[0] == "&") {
                alternative_layer.push(scr_lay.layers[k]);
                scr_lay.layers[k].visible = false;
            }
        }


        currDoc.exportFile(new File(exportLocation + "/" + scr_lay.name.substring(1) + ".png"), ExportType.PNG8, png8_options);

        //export alternative versions
        for (var l=0; l<alternative_layer.length; l++){
            alternative_layer[l].visible = true;
            currDoc.exportFile(new File(exportLocation + "/" + scr_lay.name.substring(1) + "_" + alternative_layer[l].name.substring(1) + ".png"), ExportType.PNG8, png8_options);
            alternative_layer[l].visible = false;
        }
        scr_lay.visible = false;
    }

    alert("Alles exportiert!");

