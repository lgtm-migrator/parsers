# Squoosh — Image Optimizer
## Description

This parser helps you optimize your images using [Squoosh](https://github.com/GoogleChromeLabs/squoosh).    

Learn more about how to configure Specify in the API documentation: [https://specifyapp.com/developers](https://specifyapp.com/developers).

## **Interface**

```ts
interface parser {
  name: 'squoosh';
  options?: {};
}
```

### Options

| Parameter                     | Required | Type                                             | Default Value  | Description                                                                                               |
| ----------------------------- | -------- | ------------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------- |
| `formats`                     | optional | `Array<'jpg' \| 'png' \| 'avif' \| 'wp2' \| 'webp'>` | `jpg` `webp` `avif` | Convert your images into `.jpg`(mozjpg), `.avif`, `.wp2`, `.webp`          |
| `compression.webp.quality`    | optional | `number`                                         | 75     | Compress image quality for **Webp**                            |
| `compression.avif.quality`     | optional | `number`                                         | 75        | Compress image quality for **Avif**                              |
| `compression.mozjpeg.quality`  | optional | `number`                                         | 75      | Compress image quality for **Jpeg**                                   |
| `compression.wbp2.quality`     | optional | `number`                                         | 75     | Compress image quality for **Webp2** (unstable)                          |

## **Output**

Please keep in mind that this parser generates files. This is why you should always set a folder as the final `path` in your parent rule.

✅ Do

```ts
// ...
"rules": [
  {
    "name": "Images",
    "path": "image", // <-- path set as a folder
    "parsers": [
      {
        "name": "squishsquishbish"
      }
    ]
  }
]
```

🚫 Don't
```ts
// ...
"rules": [
  {
    "name": "Images",
    "path": "icons/icons.json", // <-- path set as a file
    "parsers": [
      {
        "name": "squishsquishbish"
      }
    ]
  }
]
```

## Types
ℹ️ Please be aware that, depending on the order you use parsers, their input and output types have to match.

## Usage
### Config
```json
"parsers":[
  {
    "name": "squishsquishbish",
    "options": {
      "formats": ["avif"]
      },
     "compression": {
      "avif": {
        "quality": "50"
        }
     }
  }
]
```

### Before / After

#### Input

#### Output
```json
{
  "type": "image",
  "name": "logo.avif",
  "value": {
    "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\"><path d=\"M36.667 20H30l-5 15L15 5l-5 15H3.333\" stroke-width=\"3.333\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>"
  }
  // …
}
```

