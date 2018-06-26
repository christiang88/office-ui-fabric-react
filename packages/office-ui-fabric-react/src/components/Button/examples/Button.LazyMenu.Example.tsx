import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem } from '../../ContextualMenu';

export interface IButtonLazyMenuExampleState {
  items: IContextualMenuItem[];
}

const initialMenuItems: IContextualMenuItem[] = [
  {
    key: 'emailMessage',
    text: 'Email message',
    iconProps: { iconName: 'Mail' }
  }
];

/**
 * This component simulates a scenario where some controls in the menu are fetched lazily
 * after the user clicks to open the menu.
 */
export class ButtonLazyMenuExample extends React.Component<IButtonProps, IButtonLazyMenuExampleState> {
  /** Populate the menu with some static items */
  public state = {
    items: initialMenuItems
  };

  public render(): JSX.Element {
    const { disabled, checked } = this.props;
    const { items } = this.state;

    return (
      <div className="ms-ContextualMenuButtonsExample">
        <div>
          <DefaultButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            iconProps={{ iconName: 'Add' }}
            text="New"
            // tslint:disable-next-line:jsx-no-lambda
            onMenuClick={ev => {
              console.log(ev);
            }}
            menuProps={{
              items,
              directionalHintFixed: true,
              onMenuOpened: this.onMenuOpened
            }}
          />
        </div>
      </div>
    );
  }

  private onMenuOpened = () => {
    this.setState({
      items: [
        ...initialMenuItems,
        {
          key: 'calendarEvent1',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' }
        },
        ...initialMenuItems,
        {
          key: 'calendarEvent2',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' }
        },
        ...initialMenuItems,
        {
          key: 'calendarEvent3',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' }
        },
        ...initialMenuItems,
        {
          key: 'calendarEvent4',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' }
        },
        ...initialMenuItems,
        {
          key: 'calendarEvent5',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' }
        }
      ]
    });
  };
}
