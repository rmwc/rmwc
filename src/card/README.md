# Cards

> Cards contain content and actions about a single subject.

- Module **@rmwc/card**
- Import styles:
  - import **'@material/card/dist/mdc.card.css'**
  - import **'@material/button/dist/mdc.button.css'**
  - import **'@material/icon-button/dist/mdc.icon-button.css'**
- MDC Docs: [https://material.io/develop/web/components/cards/](https://material.io/develop/web/components/cards/)

## Fully Featured Example

```jsx
<Card style={{ width: '21rem' }}>
  <CardPrimaryAction>
    <CardMedia
      sixteenByNine
      style={{
        backgroundImage:
          'url(https://material-components-web.appspot.com/images/16-9.jpg)'
      }}
    />
    <div style={{ padding: '0 1rem 1rem 1rem' }}>
      <Typography use="headline6" tag="h2">
        Our Changing Planet
      </Typography>
      <Typography
        use="subtitle2"
        tag="h3"
        theme="textSecondaryOnBackground"
        style={{ marginTop: '-1rem' }}
      >
        by Kurt Wagner
      </Typography>
      <Typography
        use="body1"
        tag="div"
        theme="textSecondaryOnBackground"
      >
        Visit ten places on our planet that are undergoing the biggest
        changes today.
      </Typography>
    </div>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardActionButton>Read</CardActionButton>
      <CardActionButton>Bookmark</CardActionButton>
    </CardActionButtons>
    <CardActionIcons>
      <CardActionIcon onIcon="favorite" icon="favorite_border" />
      <CardActionIcon icon="share" />
      <CardActionIcon icon="more_vert" />
    </CardActionIcons>
  </CardActions>
</Card>
```

## Article Preview Example

```jsx
<Card outlined style={{ width: '21rem' }}>
  <Typography
    use="subtitle1"
    tag="div"
    style={{ padding: '0.5rem 1rem' }}
    theme="textSecondaryOnBackground"
  >
    Headlines
  </Typography>

  <ListDivider />

  <CardPrimaryAction>
    <div style={{ padding: '1rem' }}>
      <Typography use="headline5" tag="div">
        Copper on the rise
      </Typography>
      <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
        Copper price soars amid global market optimism and increased
        demand.
      </Typography>
    </div>
  </CardPrimaryAction>

  <ListDivider />

  <CardPrimaryAction>
    <div style={{ padding: '1rem' }}>
      <Typography use="headline5" tag="div">
        U.S. tech startups rebound
      </Typography>
      <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
        Favorable business conditions have allowed startups to secure
        more fundraising deals compared to last year.
      </Typography>
    </div>
  </CardPrimaryAction>

  <ListDivider />

  <CardPrimaryAction>
    <div style={{ padding: '1rem' }}>
      <Typography use="headline5" tag="div">
        Asia's clean energy ambitions
      </Typography>
      <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
        China plans to invest billions of dollars for the development of
        over 300 clean energy projects in Southeast Asia.
      </Typography>
    </div>
  </CardPrimaryAction>

  <ListDivider />

  <CardActions fullBleed>
    <CardActionButton
      label="All Business Headlines"
      trailingIcon="arrow_forward"
    />
  </CardActions>
</Card>
```

## Mini Card Example

```jsx
<Card style={{ width: '12.5rem' }}>
  <CardPrimaryAction>
    <CardMedia
      square
      style={{
        backgroundImage:
          'url(https://material-components-web.appspot.com/images/1-1.jpg)'
      }}
    >
      <CardMediaContent>
        <Typography
          use="subtitle2"
          tag="div"
          theme="textPrimaryOnDark"
          style={{
            padding: '0.5rem 1rem',
            backgroundImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
            bottom: '0',
            left: '0',
            right: '0',
            position: 'absolute'
          }}
        >
          Vacation Photos
        </Typography>
      </CardMediaContent>
    </CardMedia>
  </CardPrimaryAction>
  <CardActions>
    <CardActionIcons>
      <CardActionIcon onIcon="favorite" icon="favorite_border" />
      <CardActionIcon icon="bookmark_border" />
      <CardActionIcon icon="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

## Card
Card

### Props

| Name | Type | Description |
|------|------|-------------|
| `outlined` | `undefined | false | true` | Removes the shadow and displays a hairline outline instead |


## CardPrimaryAction


## CardMedia
Card Media

### Props

| Name | Type | Description |
|------|------|-------------|
| `sixteenByNine` | `undefined | false | true` | Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio |
| `square` | `undefined | false | true` | Automatically scales the media area’s height to equal its width |


## CardMediaContent


## CardActions
Card Actions

### Props

| Name | Type | Description |
|------|------|-------------|
| `fullBleed` | `undefined | false | true` | Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width |


## CardActionButtons


## CardActionIcons


## CardActionIcon
### Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `undefined | false | true` | Controls the on / off state of the a toggleable button. |
| `disabled` | `undefined | false | true` | Makes the button disabled |
| `icon` | `RMWC.IconPropT` | Icon for the button |
| `onChange` | `undefined | (evt: RMWC.CustomEventT<>) => void` | An onChange callback that receives a custom event. |
| `onIcon` | `RMWC.IconPropT` | If specified, renders a toggle with this icon as the on state. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |


## CardActionButton
### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content specified as children. |
| `dense` | `undefined | false | true` | Make the Button dense. |
| `disabled` | `undefined | false | true` | Make the button disabled |
| `icon` | `RMWC.IconPropT` | An Icon for the Button |
| `label` | `React.ReactNode | any` | Content specified as a label prop. |
| `outlined` | `undefined | false | true` | Make the button outlined. |
| `raised` | `undefined | false | true` | Make the Button raised. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `trailingIcon` | `RMWC.IconPropT` | A trailing icon for the Button |
| `unelevated` | `undefined | false | true` | Make the button unelevated. |


