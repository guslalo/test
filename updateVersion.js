const replace = require('replace-in-file');
const fs = require('fs');

jsn =  JSON.parse(fs.readFileSync('./versions.json'));

let buildVersion = jsn.version + 1;

jsn.version = buildVersion;

fs.writeFileSync('./versions.json', JSON.stringify(jsn))
const options = {
    files: ['src/environments/environment.prod.ts', 
    'src/environments/environment.dev.ts', 
    'src/environments/environment.staging.ts',
    'src/environments/environment.production.ts',
    'src/environments/environment.chile.ts',
    'src/environments/environment.medline.ts],
    from: /{BUILD_VERSION}/g,
    to: buildVersion,
    allowEmptyPaths: false,
};

try {
    let changedFiles = replace.sync(options);
    console.log('Build version set: ' + buildVersion);
}
catch (error) {
    console.error('Error occurred:', error);
}