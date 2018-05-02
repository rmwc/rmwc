# Image List

> MDC Image List provides a RTL-aware Material Design image list component, representing an evolution of the Material Design Grid List spec. An Image List consists of several items, each containing an image and optionally supporting content (i.e. a text label).

import from **rmwc/ImageList**  
[https://material.io/components/web/catalog/image-lists/](https://material.io/components/web/catalog/image-lists/)

Image Lists will give you basic layout, but you will have to use inline styling or CSS to achieve things like spacing, aspect ratio, and column count. Check out the inline styles below as examples.

## Standard Layout

```jsx render
import { 
  ImageList,
  ImageListItem,
  ImageListImageAspectContainer,
  ImageListImage,
  ImageListSupporting,
  ImageListLabel
} from 'rmwc/ImageList';

<ImageList>
  {[
    'https://material-components-web.appspot.com/images/photos/3x2/1.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/1.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/4.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/5.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/6.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/2.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/8.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/11.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/5.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/13.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/14.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/6.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/15.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/16.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/7.jpg'
  ].map(src => (
    <ImageListItem
      key={src}
      style={{ margin: '2px', width: 'calc(100% / 5 - 4.2px)' }}
    >
      <ImageListImageAspectContainer
        style={{ paddingBottom: 'calc(100% / 1.5)' }}
      >
        <ImageListImage src={src} />
      </ImageListImageAspectContainer>
      <ImageListSupporting>
        <ImageListLabel>Text label</ImageListLabel>
      </ImageListSupporting>
    </ImageListItem>
  ))}
</ImageList>
```

## Masonry Layout

```jsx render
import { 
  ImageList,
  ImageListItem,
  ImageListImage,
  ImageListSupporting,
  ImageListLabel
} from 'rmwc/ImageList';

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
    'https://material-components-web.appspot.com/images/photos/3x2/1.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/1.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/4.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/5.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/5.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/6.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/2.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/8.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/11.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/13.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/14.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/6.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/15.jpg',
    'https://material-components-web.appspot.com/images/photos/2x3/7.jpg',
    'https://material-components-web.appspot.com/images/photos/3x2/16.jpg'
  ].map(src => (
    <ImageListItem key={src} style={{ marginBottom: '16px' }}>
      <ImageListImage src={src} />
      <ImageListSupporting>
        <ImageListLabel>Text label</ImageListLabel>
      </ImageListSupporting>
    </ImageListItem>
  ))}
</ImageList>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="ImageList" />
<DocumentComponent displayName="ImageListItem" />
<DocumentComponent displayName="ImageListImageAspectContainer" />
<DocumentComponent displayName="ImageListImage" />
<DocumentComponent displayName="ImageListSupporting" />
<DocumentComponent displayName="ImageListLabel" />
```
