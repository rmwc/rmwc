import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { componentFactory } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Button, ButtonProps } from '@rmwc/button';
import { IconButton, IconButtonProps } from '@rmwc/icon-button';
import { useTag, useClassNames } from '@rmwc/base/component';

/** A Card Component */
export interface CardProps {
  /** Removes the shadow and displays a hairline outline instead */
  outlined?: boolean;
}

/** A Card Component */
export const Card = React.forwardRef<any, CardProps & RMWC.ComponentProps>(
  function Card(props, ref) {
    const Tag = useTag(props);
    const { outlined, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-card',
      {
        'mdc-card--outlined': outlined
      }
    ]);
    return <Tag ref={ref} {...rest} className={className} />;
  }
);

Card.displayName = 'Card';

/** Media area that displays a custom background-image with background-size: cover */
export interface CardMediaProps {
  /** Automatically scales the media area’s height to equal its width */
  square?: boolean;
  /** Automatically scales the media area’s height according to its width, maintaining a 16:9 aspect ratio */
  sixteenByNine?: boolean;
}

/** Media area that displays a custom background-image with background-size: cover */
export const CardMedia = React.forwardRef<
  any,
  CardMediaProps & RMWC.ComponentProps
>(function CardMedia(props, ref) {
  const Tag = useTag(props, 'section');
  const { square, sixteenByNine, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-card__media',
    {
      'mdc-card__media--square': square,
      'mdc-card__media--16-9': sixteenByNine
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});

CardMedia.displayName = 'CardMedia';

/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export interface CardMediaContentProps {}

/** An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image */
export const CardMediaContent = React.forwardRef<
  any,
  CardMediaContentProps & RMWC.ComponentProps
>(function CardMediaContent(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-card__media-content']);
  return <Tag ref={ref} {...props} className={className} />;
});

CardMediaContent.displayName = 'CardMediaContent';

/** The main clickable area for the primary content of the card */
export interface CardPrimaryActionProps {}

/** The main clickable area for the primary content of the card */
export const CardPrimaryAction = withRipple({
  surface: false
})(
  React.forwardRef<any, CardMediaContentProps & RMWC.ComponentProps>(
    function CardPrimaryAction(props, ref) {
      const Tag = useTag(props);
      const className = useClassNames(props, ['mdc-card__primary-action']);
      return <Tag ref={ref} {...props} className={className} />;
    }
  )
);

CardPrimaryAction.displayName = 'CardPrimaryAction';

/** Row containing action buttons and/or icons */
export interface CardActionsProps {
  /** Removes the action area’s padding and causes its only child (an mdc-card__action element) to consume 100% of the action area’s width */
  fullBleed?: boolean;
}

/** Row containing action buttons and/or icons */
export const CardActions = React.forwardRef<
  any,
  CardActionsProps & RMWC.ComponentProps
>(function CardActions(props, ref) {
  const Tag = useTag(props, 'section');
  const { fullBleed, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-card__actions',
    { 'mdc-card__actions--full-bleed': fullBleed }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});

CardActions.displayName = 'CardActions';

/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export interface CardActionButtonsProps {}

/** A group of action buttons, displayed on the left side of the card (in LTR), adjacent to CardActionIcons */
export const CardActionButtons = React.forwardRef<
  any,
  CardActionButtonsProps & RMWC.ComponentProps
>(function CardActionButtons(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-card__action-buttons']);
  return <Tag ref={ref} {...props} className={className} />;
});
CardActionButtons.displayName = 'CardActionButtons';

/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export interface CardActionIconsProps {}

/** A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to CardActionButtons */
export const CardActionIcons = React.forwardRef<
  any,
  CardActionIconsProps & RMWC.ComponentProps
>(function CardActionIcons(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-card__action-icons']);
  return <Tag ref={ref} {...props} className={className} />;
});
CardActionButtons.displayName = 'CardActionButtons';

/** A card action Icon */
export interface CardActionIconProps extends IconButtonProps {}

/** A card action Icon */
export const CardActionIcon = React.forwardRef<
  any,
  CardActionIconProps & RMWC.ComponentProps
>(function CardActionIcon(props, ref) {
  const className = useClassNames(props, [
    'mdc-card__action',
    'mdc-card__action--icon'
  ]);
  return <IconButton ref={ref} {...props} className={className} />;
});
CardActionIcon.displayName = 'CardActionIcon';

/** A card action Button */
export interface CardActionButtonProps extends ButtonProps {}

/** A card action Button */
export const CardActionButton = React.forwardRef<
  any,
  CardActionButtonProps & RMWC.ComponentProps
>(function CardActionIcon(props, ref) {
  const className = useClassNames(props, [
    'mdc-card__action',
    'mdc-card__action--button'
  ]);
  return <Button ref={ref} {...props} className={className} />;
});
CardActionButton.displayName = 'CardActionButton';
