Grid
Grid provides a layout container using CSS Grid.

React source
Feedback
Documentation
Props
Grid provides a CSS Grid container with style display: grid. Any Amplify UI components can be used as grid item children. To learn how to use CSS Grid properties, see the following documentation:

Grid layout - MDN
A Complete Guide to Grid - CSS Tricks
Demo
This demo shows how to create a basic layout using the Grid primitive.

Header
Nav
Main
Footer
Grid container props
Grid item (Header) props
Grid item (Nav) props
Grid item (Main) props
Grid item (Footer) props
<Grid
columnGap="0.5rem"
rowGap="0.5rem"
templateColumns="1fr 1fr 1fr"
templateRows="1fr 3fr 1fr"
>
<Card
columnStart="1"
columnEnd="-1"
>
    Header
  </Card>
  <Card
    columnStart="1"
    columnEnd="2"
  >
    Nav
  </Card>
  <Card
    columnStart="2"
    columnEnd="-1"
  >
    Main
  </Card>
  <Card
    columnStart="2"
    columnEnd="-1"
  >
    Footer
  </Card>
</Grid>
Usage
Import the Grid primitive. Use any primitive as grid item child components.

import { Grid, View, useTheme } from '@aws-amplify/ui-react';

export const DefaultGridExample = () => {
const { tokens } = useTheme();
return (
<Grid
templateColumns="1fr 1fr"
templateRows="10rem 10rem"
gap={tokens.space.small}
>
<View backgroundColor={tokens.colors.blue[10]}></View>
<View backgroundColor={tokens.colors.blue[20]}></View>
<View backgroundColor={tokens.colors.blue[40]}></View>
<View backgroundColor={tokens.colors.blue[60]}></View>
</Grid>
);
};
Mapping Grid CSS properties to Grid props
We've shortened some of the names of the CSS properties for a cleaner prop API. See the following list prop names (CSS => Grid props):

Grid container:
grid-auto-columns => autoColumns
grid-auto-flow => autoFlow
grid-template-areas => templateAreas
grid-template-columns => templateColumns
grid-template-rows => templateRows
column-gap => columnGap
row-gap => rowGrap
gap => gap
align-items => alignItems
align-content => alignContent
justify-content => justifyContent
Grid items *:
grid-area => area
grid-column => column
grid-column-start => columnStart
grid-column-end => columnEnd
grid-row => row
grid-row-start => rowStart
grid-row-end => rowEnd
*Note: rowSpan and columnSpan grid item props are transformed to row and column span rules.

Row and column span
Use the rowSpan or columnSpan props to stretch a grid item across multiple rows or columns. Available values are any integer value or auto. While rowSpan and columnSpan do not map to CSS properties, they are transformed to row and column style rules.

import { Grid, View, useTheme } from '@aws-amplify/ui-react';

export const GridRowAndColumnSpanExample = () => {
const { tokens } = useTheme();
return (
<Grid
templateColumns="1fr 1fr"
templateRows="10rem 10rem 10rem"
gap={tokens.space.small}
>
<View columnSpan={2} backgroundColor={tokens.colors.orange[10]}></View>
<View rowSpan={2} backgroundColor={tokens.colors.orange[20]}></View>
<View backgroundColor={tokens.colors.orange[40]}></View>
<View backgroundColor={tokens.colors.orange[60]}></View>
</Grid>
);
};
Responsive layouts
Use array or object syntax to dynamically change layout based on screen size. Resize browser to see example below.

See responsive design for more details.

import { Grid, View, useTheme } from '@aws-amplify/ui-react';

export const GridResponsiveExample = () => {
const { tokens } = useTheme();
return (
<Grid
templateColumns={{ base: '1fr', large: '1fr 1fr' }}
templateRows={{ base: 'repeat(4, 10rem)', large: 'repeat(3, 10rem)' }}
gap={tokens.space.small}
>
<View
columnSpan={[1, 1, 1, 2]}
backgroundColor={tokens.colors.pink[10]}
></View>
<View
rowSpan={{ base: 1, large: 2 }}
backgroundColor={tokens.colors.pink[20]}
></View>
<View backgroundColor={tokens.colors.pink[40]}></View>
<View backgroundColor={tokens.colors.pink[60]}></View>
</Grid>
);
};
CSS Styling
Target classes
Target Classes
CSS Variables
Class	Description
amplify-grid	Top level element that wraps the Grid primitive


-----


Flex
Flex provides a layout container using CSS Flexbox.

React source
Feedback
Documentation
Props
The Flex primitive provides a Flexbox container with style display: flex. To learn how to use Flexbox CSS properties, see the following documentation:

Flex layout - MDN
A Complete Guide to Flex - CSS Tricks
Demo
direction

row
justifyContent

flex-start
alignItems

stretch
alignContent

flex-start
wrap

nowrap
gap
1rem
<Flex
direction="row"
justifyContent="flex-start"
alignItems="stretch"
alignContent="flex-start"
wrap="nowrap"
gap="1rem"
>
<View
height="2rem"
width="5rem"
backgroundColor={tokens.colors.blue[20]}
></View>
<View
height="2.5rem"
width="6.25rem"
backgroundColor={tokens.colors.blue[40]}
></View>
<View
height="3rem"
width="7.5rem"
backgroundColor={tokens.colors.blue[60]}
></View>
<View
height="3.5rem"
width="8.75rem"
backgroundColor={tokens.colors.blue[80]}
></View>
</Flex>
Usage
Import the Flex primitive.

import { Flex, Button, useTheme } from '@aws-amplify/ui-react';

export const DefaultFlexExample = () => {
const { tokens } = useTheme();

return (
<Flex>
<Button backgroundColor={tokens.colors.pink[10]}>Button 1</Button>
<Button backgroundColor={tokens.colors.pink[20]}>Button 2</Button>
<Button backgroundColor={tokens.colors.pink[40]}>Button 3</Button>
</Flex>
);
};
Mapping Flexbox CSS properties to Flex props
Flexbox CSS property => Flex prop:
flex-direction => direction
justify-content => justifyContent
align-items => alignItems
align-content => alignContent
flex-wrap => wrap
gap => gap
Default prop values:
direction="row"
justifyContent="normal"
alignItems="stretch"
alignContent="normal"
wrap="nowrap"
gap="1rem"
CSS Styling
Target classes
Target Classes
CSS Variables
Class	Description
amplify-flex	Top level element that wraps the Flex primitive
