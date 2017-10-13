import * as React from 'react';
import { Divider } from 'office-ui-fabric-react/lib/Divider';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

interface IBasicDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getClassNames = memoizeFunction((): IBasicDividerExampleClassNames => {
  const exampleHeight = 40;
  return mergeStyleSets({
    wrapper: {
      height: 40,
      backgroundColor: '#F4F4F4',
      padding: '0 10px'
    },
    text: {
      display: 'inline-block',
      padding: '0',
      height: exampleHeight,
      lineHeight: exampleHeight,
      verticalAlign: 'top',
      margin: 'auto'
    }
  });
});

export class DividerBasicExample extends React.Component<any, any> {
  public render() {
    const classNames = getClassNames();
    return (
      <div className={ classNames.wrapper }>
        <p className={ classNames.text }> Some text before the divider. </p>
        <Divider
          dividerHeight={ 30 }
          dividerColor='#C8C8C8'
          dividerHorizontalMargin={ 10 }
        />
        <p className={ classNames.text }>Some text after the divider. </p>
      </div>);
  }
}
