const fs = require('fs')
const _env = process.argv[2]
let colors

function parseEnv(path) {
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
    let css = fs.readFileSync('./src/assets/scss/variables.scss').toString()
    let envColors = parseEnv(_path)

    css = css.replace('$color-primary: #fff;', '$color-primary: ' + envColors['color-primary'])
    css = css.replace('$color-secondary: #fff;', '$color-secondary: ' + envColors['color-secondary'])
    css = css.replace('$color-hover: #fff;', '$color-hover: ' + envColors['color-hover'])

    fs.writeFileSync('./src/assets/scss/variables.scss', css)
}

switch (_env) {
    case 'production':
        colors = makeCss('./src/environments/environment.prod.ts')
        break;

    case 'dev':
        colors = makeCss('./src/environments/environment.dev.ts')
        break;

    case 'staging':
        colors = makeCss('./src/environments/environment.staging.ts')
        break;

    case 'local':
        colors = makeCss('./src/environments/environment.local.ts')
        break;

    default:
        break;
}