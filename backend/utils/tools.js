

class Tools {
    extractFileType(filename) {
        let filenameArr = filename.split('.');

        return filenameArr[filenameArr.length - 1]
    }
}
let toolsInstance = new Tools();
module.exports = { toolsInstance }