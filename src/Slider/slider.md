# Sliders

> Sliders let users select from a range of values by moving the slider thumb.

import from **rmwc/Slider**  
[https://material.io/components/web/catalog/input-controls/sliders/](https://material.io/components/web/catalog/input-controls/sliders/)

Sliders can be both uncontrolled and controlled. When creating a controlled `Slider`, you should be listening to the `onInput` event and use `evt.detail.value` to set your new value.

Sliders will automatically layout themselves on window resize. If you need to manually trigger a layout because the sliders container size changed, the simplest way is to trigger a resize event `window.dispatchEvent(new Event('resize'));`.

```jsx render
import { Slider } from 'rmwc/Slider';

{/* Uncontrolled Slider */}
<Slider
  onInput={evt => console.log(evt)}
  onChange={evt => console.log(evt)}
/>

{/* Controlled Slider */}
{/* onInput is required and will fire continuously. onChange is optional. */}
<Slider
  value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
  onChange={evt => this.setState({sliderValue: evt.detail.value})}
  onInput={evt => this.setState({sliderValue: evt.detail.value})}
  discrete
  step={1}
/>

{/* Controlled Slider with Markers */}
<Slider
  value={this.state.sliderValue2 === undefined ? 150 : this.state.sliderValue2}
  onChange={evt => this.setState({sliderValue2: evt.detail.value})}
  onInput={evt => this.setState({sliderValue2: evt.detail.value})}
  discrete
  displayMarkers
  min={100}
  max={200}
  step={5}
/>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Slider" />
```
