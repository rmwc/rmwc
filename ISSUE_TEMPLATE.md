** PLEASE READ THIS BEFORE FILING AN ISSUE **

## RMWC or MDC?

RMWC is just a React wrapper for Google's official MDC that provides a props based interface for their components. Is the bug being caused by RMWC, or MDC? Please do your best to track down where the bug is originating from and post your issue to the proper repository. MDC bugs should be filed here https://github.com/material-components/material-components-web/issues.

Also, please note that RMWC does not contain any styles of its own, so if you're having any style related issues it is probable that the issue is with MDC.

Bugs that would likely be caused by RMWC:
- synchronicity issues: The underlying MDC component or behavior does not match up with your props.
- missing MDC features: MDC says you can do "X" but there is no prop or option for it in RMWC.

## Bugs

Follow the template below to ensure the quickest and most accurate response to your issue.

### What RMWC Version are you using?

> Please be specific, e.g. _major.minor.patch_

### What browser(s) and React Version is this bug affecting?

> Please include the browser version. A user-agent string is also quite helpful.

### What build system are you using?

> Webpack, Create React App, Browserify, SystemJS, None, etc.

### What are the steps to reproduce the bug?

> Please write the steps which need to be taken in order to reproduce the bug. These steps should be
> as detailed as possible. If possible please use this sandbox (https://codesandbox.io/s/p7lm5oyn3m) and try
> to reproduce the bug. It makes it much easier to resolve issues.  


### What is the expected behavior?

> Please describe what the component/code should be doing that it's not.

### What is the actual behavior?

> Please describe what the component/code is actually doing that's different from what it should be
doing.

### Any other information you believe would be useful?
