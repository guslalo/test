const fs = require('fs')
const { execSync } = require('child_process');

(() => {
    let _package = JSON.parse(fs.readFileSync('./package.json'))
    let _count = execSync('git rev-list --count HEAD')

    _package.version = _count.toString().replace('\n', '')

    console.log(_count.toString())

    // fs.writeFileSync('./package.json', JSON.stringify(_package, null, 2))

})()