## Requerimientos mínimos

- Node JS V.11
- Angular 9

## Configurar nuevo Cliente:

1. Crear Environment con prefijo nombre cliente ej: **environment.nameClient.ts**
2. Colocar información respectiva del entorno ( url backend, titulo, etc)
3. Colores:

dirigirse a src/assets/scss/variables.scss y ajustar:

- color-primary:
- color-secondary:
- color-hover:

## Idioma por defecto:

Ajustar valor en environment defaultLang (nombre de archivo ubicado en assets/i18n)

```bash
environment = {
  defaultLang: 'pt',
}
```

## Favicon custom

reemplazar archivo favicon.ico en la raíz de src/favicon.ico

## App title:

ajustar valor environment

```bash
environment = {
  title: 'titulo sitio',
}
```

## Logotipo:

- Reemplazar archivo logo-app.svg en ruta: assets/img/logo-app.svg

- Logotipo responsivo login reemplazar: assets/logo-app-mobile-login.png

## Estructura de Archivos:

### Patrón General para crear un módulo:

Carpeta de módulo con archivo módulo routing separado y carpeta de componentes; en caso de que algún componente sea muy grande se puede aplicar recursivamente la estructura padre del módulo.

Para cada acceso perfil es un módulo padre

(admin, coordinator, patient y professional):

## Patrón de Arquitectura:

**MVP ( modelo vista presentador )**

- El _modelo_ es una interfaz que define los datos que se mostrará o no actuado en la interfaz de usuario.
- El _presentador_ actúa sobre el modelo y la vista. Recupera datos de los repositorios (el modelo), y los formatea para mostrarlos en la vista.
- La _vista_ es una interfaz pasiva que exhibe datos (el modelo) y órdenes de usuario de las rutas (eventos) al presentador para actuar sobre los datos

## NPM Librerías:

#### angular/fire

FireBase para angular

https://firebaseopensource.com/projects/angular/angularfire2/

#### fullcalendar

Librería de calendario agenda para angular

https://fullcalendar.io/docs/angular

#### ng-bootstrap/ng-bootstrap

Framework UI base de la aplicación que contiene componentes tales como:

datepicker, botones, grilla. tabs, etc.

https://ng-bootstrap.github.io/#/home

#### ngneat/transloco

Módulo de multi lenguajes de la app

https://ngneat.github.io/transloco/docs/installation

#### swimlane/ngx-charts

Módulo para la utilización de gráficos en la app

https://swimlane.gitbook.io/ngx-charts/

#### swimlane/ngx-datatable

Módulo datatable para Angular

https://swimlane.github.io/ngx-datatable/

#### angular-password-strength-meter

Módulo para medir fuerza de una contraseña

https://www.npmjs.com/package/angular-password-strength-meter

#### ng-recaptcha

Google recaptcha disponible para v2 y v3

https://www.npmjs.com/package/ng-recaptcha

#### ngx-mask

Módulo para configuración de todo tipo de máscaras para formatos de inputs

https://www.npmjs.com/package/ngx-mask

#### ngx-owl-carousel

Módulo para crear carrusel, slide de variados tipos.

https://www.npmjs.com/package/ngx-owl-carousel-o

#### ngx-pagination

paginador Angular

https://www.npmjs.com/package/ngx-pagination

#### ngx-spinner

Modulo con múltiples tipos de spinners

https://www.npmjs.com/package/ngx-spinner

#### ngx-toastr

Toast para angular utilizado principalmente con interceptores

https://www.npmjs.com/package/ngx-toastr

## Deployment

1. Clonar repositorio:

```bash
git clone https://bitbucket.org/itms-bluedot/itms-front-end/src/master/
```

2. Ejectutar comando;

```bash
npm install
```

3. Levantar un proyecto local:
   Ejectutar comando;

```bash
ng serve --open
```

### Generar builds:

build prod:

```bash
ng build --prod --aot --configuration=production --output-hashing=all
```

build-dev :

```bash
ng build --prod --aot --configuration=dev --output-hashing=all
```

build-staging :

```bash
ng build --prod --configuration=staging --output-hashing=all

```

Para crear un nuevo deploy respectivo a un nuevo cliente

1. Crear nuevo archivo environment.NombreCliente.ts
2. Despliegue comando :

```bash
ng build --configuration=NombreCliente
```

## CI/CD Telemedicina

La integración continua hacia los servicios de Beanstalk de AWS se realizan desde los pipeline de bitbucket, por lo que es necesario configurar las variables de entorno del repositorio con la información que entrega Beanstalk para realizar el deploy correspondiente (también existe la opción de configurar variables por rama en la opción deployment)

Una vez configurado las variables se procede a configurar el archivo para los pipelines, los cuales en bitbucket se llama bitbucket-pipelines.yml, el cual se deja en la carpeta raíz de cada proyecto a establecer integración continua.

## FrontEnd

El pipeline se divide por ramas (cada rama hace un deploy a un entorno distinto) en la que se deben instalar las dependencias de la aplicación, proceder a compilarlas y una vez finalizado se hace el deploy al entorno, en el siguiente código se muestra un ejemplo de configuración de pipeline para la rama master (producción) con las variables de entorno creadas en el paso anterior.

```bash
image: node:12.18.2
pipelines:
  branches:
    master:
    - step:
        caches:
          - node
        name: "Build"
        script:
          - npm install
          - npm run build
          - apt-get update && apt-get install -y
          - apt-get install zip
          - zip -r itms-frontend.zip dist/ Dockerfile nginx-file.conf Dockerrun.aws.json
        artifacts:
          - itms-frontend.zip
    - step:
        name: "Deploy to Production"
        deployment: production
        script:
        - pipe: atlassian/aws-elasticbeanstalk-deploy:0.6.6
          variables:
            AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
            AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY
            AWS_DEFAULT_REGION: $AWS_DEFAULT_REGION
            APPLICATION_NAME: "itms-frontend"
            ENVIRONMENT_NAME: "itmsFrontend-env"
            ZIP_FILE: "itms-frontend.zip"
            S3_BUCKET: 'elasticbeanstalk-sa-east-1-654719900413'
            WAIT: 'true'
```
