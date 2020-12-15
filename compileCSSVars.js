const fs = require('fs')
let _env = process.argv[2]
let colors, _fileEnv

function parseEnv(path) {
    console.log('parseando archivo de entorno:', path)

    var regExp = /\{([^)]+)\}/;
    let f = fs.readFileSync(path)

    let _f = f.toString().match(regExp)[0].replace(/'/g, '"')
    _f = _f.split('colors:')[1].replace('}', '')

    let c = 0
    _f = _f.replace(/,/g, function (m, i, o) {
        c++
        return (c === 3) ? "" : m;
    })

    return JSON.parse(_f)
}

function makeCss(_path) {
    console.log('compilando variables css')

    let css = fs.readFileSync('./src/assets/scss/variables.scss').toString()
    let envColors = parseEnv(_path)

    let hexRegex = /#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1|0(?:\.\d+)?)\s*\)/gim;
    let colorMatches = css.match(hexRegex)

    let _primary = colorMatches[0]
    let _secondary = colorMatches[1]
    let _hover = colorMatches[2]

    css = css.replace("$color-primary: " + _primary + ";", '$color-primary: ' + envColors['color-primary'])
    css = css.replace("$color-secondary: " + _secondary + ";", '$color-secondary: ' + envColors['color-secondary'])
    css = css.replace("$color-hover: " + _hover + ";", '$color-hover: ' + envColors['color-hover'])

    fs.writeFileSync('./src/assets/scss/variables.scss', css)
}

try {
    // if (_env === 'production') _env = 'prod'
    _fileEnv = './src/environments/environment.' + _env + '.ts'

    if (fs.existsSync(_fileEnv)) {
        makeCss(_fileEnv)
    } else {
        let _strError = 'No se encontró el archivo de entorno espcificado como argumento => ' + _env + ' <= en ./src/environments/, el archivo ' + _fileEnv + ' no existe'
        throw new Error(_strError)
    }
} catch (err) {
    console.log(err)
}