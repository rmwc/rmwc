# Image Lists

MDC Image List provides a RTL-aware Material Design image list component, representing an evolution of the Material Design Grid List spec. An Image List consists of several items, each containing an image and optionally supporting content (i.e. a text label).

- Module **@rmwc/image-list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/image-list/styles';
  - Or include stylesheets
    - **'@material/image-list/dist/mdc.image-list.css'**
- MDC Docs: [https://material.io/develop/web/components/image-lists/](https://material.io/develop/web/components/image-lists/)

## Standard Layout

Image Lists will give you basic layout, but you will have to use inline styling or CSS to achieve things like spacing, aspect ratio, and column count. Check out the inline styles below as examples.

```jsx
<ImageList>
  {[
    { src: 'images/photos/3x2-1.jpg', alt: 'image of building' },
    { src: 'images/photos/2x3-1.jpg', alt: 'image of wall' },
    { src: 'images/photos/3x2-4.jpg', alt: 'image of building' },
    { src: 'images/photos/3x2-5.jpg', alt: 'image of dog' },
    { src: 'images/photos/3x2-6.jpg', alt: 'image of roses' },
    { src: 'images/photos/2x3-2.jpg', alt: 'image of landscape' },
    { src: 'images/photos/3x2-8.jpg', alt: 'image of cafe' },
    { src: 'images/photos/3x2-11.jpg', alt: 'image of city' },
    { src: 'images/photos/2x3-5.jpg', alt: 'image of swing' },
    { src: 'images/photos/3x2-13.jpg', alt: 'image of oranges' },
    { src: 'images/photos/3x2-14.jpg', alt: 'image of dog' },
    { src: 'images/photos/2x3-6.jpg', alt: 'image of road' },
    { src: 'images/photos/3x2-15.jpg', alt: 'image of bus' },
    { src: 'images/photos/3x2-16.jpg', alt: 'image of cafe' },
    { src: 'images/photos/2x3-7.jpg', alt: 'image of basketball' }
  ].map((img) => (
    <ImageListItem
      key={img.src}
      style={{ margin: '2px', width: 'calc(100% / 5 - 4.2px)' }}
    >
      <ImageListImageAspectContainer
        style={{ paddingBottom: 'calc(100% / 1.5)' }}
      >
        <ImageListImage src={img.src} alt={img.alt} />
      </ImageListImageAspectContainer>
      <ImageListSupporting>
        <ImageListLabel>Text label</ImageListLabel>
      </ImageListSupporting>
    </ImageListItem>
  ))}
</ImageList>
```

## Masonry Layout

```jsx
<ImageList
  masonry
  withTextProtection
  style={{
    columnCount: 5,
    columnGap: '16px',
    maxWidth: '1000px'
  }}
>
  {[
    { src: 'images/photos/3x2-1.jpg', alt: 'image of building' },
    { src: 'images/photos/2x3-1.jpg', alt: 'image of wall' },
    { src: 'images/photos/3x2-4.jpg', alt: 'image of building' },
    { src: 'images/photos/3x2-5.jpg', alt: 'image of dog' },
    { src: 'images/photos/2x3-5.jpg', alt: 'image of swing' },
    { src: 'images/photos/3x2-6.jpg', alt: 'image of roses' },
    { src: 'images/photos/2x3-2.jpg', alt: 'image of landscape' },
    { src: 'images/photos/3x2-8.jpg', alt: 'image of cafe' },
    { src: 'images/photos/3x2-11.jpg', alt: 'image of city' },
    { src: 'images/photos/3x2-13.jpg', alt: 'image of oranges' },
    { src: 'images/photos/3x2-14.jpg', alt: 'image of dog' },
    { src: 'images/photos/2x3-6.jpg', alt: 'image of road' },
    { src: 'images/photos/3x2-15.jpg', alt: 'image of bus' },
    { src: 'images/photos/2x3-7.jpg', alt: 'image of basketball' },
    { src: 'images/photos/3x2-16.jpg', alt: 'image of cafe' }
  ].map((img) => (
    <ImageListItem key={img.src} style={{ marginBottom: '16px' }}>
      <ImageListImage src={img.src} alt={img.alt} />
      <ImageListSupporting>
        <ImageListLabel>Text label</ImageListLabel>
      </ImageListSupporting>
    </ImageListItem>
  ))}
</ImageList>
```

## ImageList

The root of the Image List.

### Props

| Name                 | Type      | Description                                                                                                                                  |
| -------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `masonry`            | `boolean` | Indicates that this Image List should use the Masonry variant.                                                                               |
| `withTextProtection` | `boolean` | Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image). |

## ImageListItem

Indicates each item in an Image List.

## ImageListImageAspectContainer

Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio.

## ImageListImage

Indicates the image element in each item.

## ImageListSupporting

Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels.

## ImageListLabel

Optional. Indicates the text label in each item, if the Image List contains text labels.
