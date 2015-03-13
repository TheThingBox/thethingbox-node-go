module.exports = function(RED) {
    "use strict";
    function main(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on("input",function(msg) {
            msg.payload = Date.now();
            this.send(msg);
            msg = null;
        });
    }
	RED.nodes.registerType("go",main);
	
    RED.httpAdmin.post("/inject/:id", RED.auth.needsPermission("inject.write"), function(req,res) {
        var node = RED.nodes.getNode(req.params.id);
        if (node != null) {
            try {
                node.receive();
                res.send(200);
            } catch(err) {
                res.send(500);
                node.error("Inject failed:"+err);
            }
        } else {
            res.send(404);
        }
    });
}
