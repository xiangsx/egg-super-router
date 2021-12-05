const SRAccessBase = require("../../../../../lib/access");

class MyAccess extends SRAccessBase {
    constructor(props) {
        super(props);
        this.ACC_MY_ACCESS = 0b100;
    }

}

module.exports = MyAccess;
