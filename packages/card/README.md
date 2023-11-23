# Cards

> Cards contain content and actions about a single subject.

-   Module __@rmwc/card__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/card/styles';__
    -   Or include stylesheets
        -   __'@material/card/dist/mdc.card.css'__;
        -   __'@material/button/dist/mdc.button.css'__;
        -   __'@material/icon-button/dist/mdc.icon-button.css'__;
-   MDC Docs: [https://material.io/develop/web/components/cards/](https://material.io/develop/web/components/cards/)

## Fully Featured Example

```js

<Card style\={{ width: '21rem' }}\>

  <CardPrimaryAction\>

    <CardMedia

      sixteenByNine

      style\={{

        backgroundImage: 'url(images/backgrounds/mb-bg-fb-16.png)'

      }}

    />

    <div style\={{ padding: '0 1rem 1rem 1rem' }}\>

      <Typography use\="headline6" tag\="h2"\>

        Our Changing Planet

      </Typography\>

      <Typography

        use\="subtitle2"

        tag\="h3"

        theme\="textSecondaryOnBackground"

        style\={{ marginTop: '-1rem' }}

      \>

        by Kurt Wagner

      </Typography\>

      <Typography

        use\="body1"

        tag\="div"

        theme\="textSecondaryOnBackground"

      \>

        Visit ten places on our planet that are undergoing the biggest

        changes today.

      </Typography\>

    </div\>

  </CardPrimaryAction\>

  <CardActions\>

    <CardActionButtons\>

      <CardActionButton\>Read</CardActionButton\>

      <CardActionButton\>Bookmark</CardActionButton\>

    </CardActionButtons\>

    <CardActionIcons\>

      <CardActionIcon onIcon\="favorite" icon\="favorite\_border" />

      <CardActionIcon icon\="share" />

      <CardActionIcon icon\="more\_vert" />

    </CardActionIcons\>

  </CardActions\>

</Card\>


```

## Article Preview Example

```js

<Card outlined style\={{ width: '21rem' }}\>

  <Typography

    use\="subtitle1"

    tag\="div"

    style\={{ padding: '0.5rem 1rem' }}

    theme\="textSecondaryOnBackground"

  \>

    Headlines

  </Typography\>

  <ListDivider />

  <CardPrimaryAction\>

    <div style\={{ padding: '1rem' }}\>

      <Typography use\="headline5" tag\="div"\>

        Copper on the rise

      </Typography\>

      <Typography use\="body1" tag\="p" theme\="textSecondaryOnBackground"\>

        Copper price soars amid global market optimism and increased

        demand.

      </Typography\>

    </div\>

  </CardPrimaryAction\>

  <ListDivider />

  <CardPrimaryAction\>

    <div style\={{ padding: '1rem' }}\>

      <Typography use\="headline5" tag\="div"\>

        U.S. tech startups rebound

      </Typography\>

      <Typography use\="body1" tag\="p" theme\="textSecondaryOnBackground"\>

        Favorable business conditions have allowed startups to secure

        more fundraising deals compared to last year.

      </Typography\>

    </div\>

  </CardPrimaryAction\>

  <ListDivider />

  <CardPrimaryAction\>

    <div style\={{ padding: '1rem' }}\>

      <Typography use\="headline5" tag\="div"\>

        Asia's clean energy ambitions

      </Typography\>

      <Typography use\="body1" tag\="p" theme\="textSecondaryOnBackground"\>

        China plans to invest billions of dollars for the development of

        over 300 clean energy projects in Southeast Asia.

      </Typography\>

    </div\>

  </CardPrimaryAction\>

  <ListDivider />

  <CardActions fullBleed\>

    <CardActionButton

      label\="All Business Headlines"

      trailingIcon\="arrow\_forward"

    />

  </CardActions\>

</Card\>


```

## Mini Card Example

```js

<Card style\={{ width: '12.5rem' }}\>

  <CardPrimaryAction\>

    <CardMedia

      square

      style\={{

        backgroundImage: 'url(images/backgrounds/mb-bg-fb-06.png)'

      }}

    \>

      <CardMediaContent\>

        <Typography

          use\="subtitle2"

          tag\="div"

          theme\="textPrimaryOnDark"

          style\={{

            padding: '0.5rem 1rem',

            backgroundImage:

              'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',

            bottom: '0',

            left: '0',

            right: '0',

            position: 'absolute'

          }}

        \>

          Vacation Photos

        </Typography\>

      </CardMediaContent\>

    </CardMedia\>

  </CardPrimaryAction\>

  <CardActions\>

    <CardActionIcons\>

      <CardActionIcon onIcon\="favorite" icon\="favorite\_border" />

      <CardActionIcon icon\="bookmark\_border" />

      <CardActionIcon icon\="share" />

    </CardActionIcons\>

  </CardActions\>

</Card\>


```

## Card

## CardPrimaryAction

## CardMedia

## CardMediaContent

## CardActions

## CardActionButtons

## CardActionIcons

## CardActionIcon

## CardActionButton