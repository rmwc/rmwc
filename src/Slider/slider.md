# Sliders

> Sliders let users select from a range of values by moving the slider thumb.

import from **rmwc/Slider**  
[https://material.io/components/web/catalog/input-controls/sliders/](https://material.io/components/web/catalog/input-controls/sliders/)

```jsx render
import { Slider } from 'rmwc/Slider';

<Slider
  value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
  onChange={evt => this.setState({sliderValue: evt.target.value})}
/>

<Slider
  value={this.state.sliderValue2 === undefined ? 50 : this.state.sliderValue2}
  onChange={evt => this.setState({sliderValue2: evt.target.value})}
  discrete
  step={5}
/>

<Slider
  value={this.state.sliderValue3 === undefined ? 50 : this.state.sliderValue3}
  onChange={evt => this.setState({sliderValue3: evt.target.value})}
  discrete
  displayMarkers
  step={5}
/>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Slider" />
```
