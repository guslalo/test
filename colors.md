## Parametrización de Colores

Para la parametrización de colores en Front-End se utiliza el objeto colors presente en cada archivo de entorno, este objeto tiene los valores que se va a tomar para construir las variables utilizadas por sass, y de esta forma parametrizar los colores

````
colors: {
    "color-primary": "#3B4085;",
    "color-secondary": "#0A6FF5;",
    "color-hover": "#0A6FF5;",
  }
````


## package.json
En la sección de scripts se define como se construye front-end para cada entorno, de ls siguiente manera.

````
"build-medline": "node ./updateVersion.js && node ./compileCSSVars.js medline && ng build --prod --configuration=medline --output-hashing=all && npm run checkout",
````

donde 

````
node ./compileCSSVars.js medline
````

es el archivo de javascript que se encarga de tomar el valor del archivo de entorno, en este caso "medline", bajo el script "build-medline", este archivo toma como argumento el nombre de tal entorno, para este ejemplo medline y lo encontramos en:

````
src/environments/environment.medline.ts
````

## Modificación de colores por entorno

Para personalizar los colores de front-end para cada entorno se debe modificar los valores del objeto colors en cada archivo de entorno con su respectivo valor en hexadecimal

````
colors: {
    "color-primary": "#3B4085;",
    "color-secondary": "#0A6FF5;",
    "color-hover": "#0A6FF5;",
  }
````

se puede utilizar una herramienta para obtener los valores hexadecimales de los colores en: [https://www.rapidtables.com/web/color/html-color-codes.html](https://www.rapidtables.com/web/color/html-color-codes.html)

## Archivo src/assets/variables.scss

En este archivo se encuentran las variables sass para ser interpoladas por el script compileCSSVars.js, su valor no tiene relevancia al momento de construir la aplicacion usando en compilador de css ya que es el script compileCSSVars.js quien tiene la responsabilidad de asignar el valor deseado a esos valores.

````
$color-primary: #fff;
$color-secondary: #fff;
$color-hover: #fff;
````

dichos valores no deben ser modificados, ya que es el script compileCSSVars.js quien se encarga de realizar la interpolación de los valores.


## Para nuevos archivos de entorno

Si se desea crear un nuevo entorno con nuevos parametros de construccion para los colores este nuevo archivo debe de forma mandatoria tener el objeto colors, asi como los otros archivos de entorno.