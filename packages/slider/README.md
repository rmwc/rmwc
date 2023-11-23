# Sliders

> Sliders let users select from a range of values by moving the slider thumb.

-   Module __@rmwc/slider__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/slider/styles';__
    -   Or include stylesheets
        -   __'@material/slider/dist/mdc.slider.css'__;
-   MDC Docs: [https://material.io/develop/web/components/input-controls/sliders/](https://material.io/develop/web/components/input-controls/sliders/)

Sliders can be both uncontrolled and controlled. When creating a controlled `Slider`, you should be listening to the `onInput` event and use `evt.detail.value` to set your new value.

Sliders will automatically layout themselves on window resize. If you need to manually trigger a layout because the sliders container size changed, the simplest way is to trigger a resize event `window.dispatchEvent(new Event('resize'));`.

\*\*Known Issue\*\* `material-components-web` uses pointer events internally. If you are using something below React 16.4, you will see unknown attribute errors, however the slider should still work.

Uncontrolled

```js

<Slider

  onInput\={(evt) \=> console.log(evt)}

  onChange\={(evt) \=> console.log(evt)}

/>


```

Controlled

```js

function Example() {

  const \[value, setValue\] \= React.useState(50);

  // onInput is required and will fire continuously.

  // onChange is optional and fires at the end of the interaction

  return (

    <Slider

      value\={value}

      onChange\={(evt) \=> setValue(evt.detail.value)}

      onInput\={(evt) \=> setValue(evt.detail.value)}

      discrete

      step\={10}

    />

  );

}


```

With min and max

```js

<Slider discrete min\={0} max\={200} step\={10} />


```

With markers

```js

<Slider discrete displayMarkers step\={10} />


```

Range

```js

function Example() {

  const \[value, setValue\] \= React.useState(80);

  const \[startValue, setStartValue\] \= React.useState(20);

  return (

    <Slider

      range

      discrete

      valueStart\={startValue}

      value\={value}

      onChange\={(evt) \=> setValue(evt.detail.value)}

      onChangeValueStart\={(evt) \=> setStartValue(evt.detail.value)}

    \></Slider\>

  );

}


```

## Slider