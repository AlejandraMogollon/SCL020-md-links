# _Proyecto MD-Links_

## Índice

- [1. Sobre el Módulo](#1-Sobre-el-Módulo)
- [2. Instalación](#2-Instalación)
- [3. ¿Cómo usar?](#3-¿Cómo-usar?)
- [3. Package](#4-Package)

---

## 1. Sobre el Módulo

Librería npm diseñada para obtener links de un archivo, examinarlos y saber si funcionan o estan quebrados.

## 2. Instalación

Con el comando `npm i @alejandrame/md-links` podemos instalar directamente desde GitHub.

## 3. ¿Cómo usar?

Se ejecuta a través del terminal de la siguiente forma:

```
$ md-links <path> [options]
```

Ejemplo:

```
$ gd-md-links archivo.md --validate
```

<br>

- ##### Path:

  Debes ingresar una ruta, que puede ser relativa o absoluta.

  Ejemplo 1 Carpeta:

  ```
  $ gd-md-links carpeta
  ```

  Ejemplo 2 Archivo:

  ```
  $ gd-md-links archivo.md
  ```

<br>

- ##### Options:

  **--validate**
  Si ingresamos esta opción el módulo realiza una petición HTTP para averiguar si los links dentro del archivo funcionan o no.
  Ejemplo:

  ```
   href: 'https://www.iconfinder.com/',
    text: 'Pagina de Iconos',
    file: 'C:\\Users\\user\\OneDrive\\Desktop\\MDLinks\\SCL020-md-links\\pruebamd\\pruebadentro.md',
    status: 200,
    ok: 'OK'
  ```

  **--stats**
  La opción --stats el output será un texto con estadísticas básicas sobre los links. Cuántos links fueron encontrados (total) y cuantos son únicos (unique).
  Ejemplo:

  ```
    mdLinks: { total: 28, unique: 20 }
  ```

  **--validate --stats**
  Si ingresamos ambas opciones independiente del orden, obtendremos estadísticas que necesiten de los resultados de la validación, como los links quebrados (broken)

  ```
  mdLinks: { total: 28, unique: 20, broken: 3 }
  ```

## 4. Package

[Package en npmjs.com](https://www.npmjs.com/package/@alejandrame/md-links)
