# Image List

> MDC Image List provides a RTL-aware Material Design image list component, representing an evolution of the Material Design Grid List spec. An Image List consists of several items, each containing an image and optionally supporting content (i.e. a text label).

- import from **'@rmwc/image-list'**  
- import styles:
  - import **'@material/image-list/dist/mdc.image-list.css'**;
- MDC Docs: [https://material.io/develop/web/components/image-lists/](https://material.io/develop/web/components/image-lists/)

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
} from '@rmwc/image-list';

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
} from '@rmwc/image-list';

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
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="ImageList" />
<DocumentComponent docs={docs} displayName="ImageListItem" />
<DocumentComponent docs={docs} displayName="ImageListImageAspectContainer" />
<DocumentComponent docs={docs} displayName="ImageListImage" />
<DocumentComponent docs={docs} displayName="ImageListSupporting" />
<DocumentComponent docs={docs} displayName="ImageListLabel" />
```
