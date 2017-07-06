## MScript

Mscript is a superset of ES5 javascript which is primarily used to define the
geometry of 3d shapes.

The main additions Mscript provides to ES5 are so called Command Statements and
they take the following form

```
command [id] {
  option: value
  [option: value]
  ...
}
```

First is the command keyword, followed by an optional identifier then followed
by a block that contains one or more options.  The options are essentially
javascript labelled statements.  Note there are no commas separating the
options. This is because the block is not an object literal.

### Scripts and Scope

Scripts define how a particular object is built.  Scripts can build jobs or
units.  A job can have parameters and groups defined.  Units have parameters,
components, attributes and groups defined.

When a Unit script is evaluated, any Job parameters will be in scope of the
script.  If any parameters are declared in the script with the same name as
a Job parameter, that parameter will override the Job parameter.  This may lead
to unexpected results.

### Components

A component command must take one of the two following forms.  The first form
defines a component that is produced by Massive.  It is a rectangular part that
requires length, width and depth. These are provided in the form of A, B and
depth is provided by the thickness of the material.

The values given to A and B must be numbers or an expression that returns a
number.  The expression can refer to the value or properties of any previously
defined parameters or components.

```
component id {
  A: Number | Expression
  B: Number | Expression
  material: String | Expression
}
```

The second form is for components that are actual products from the database.
This form of component command does not require an identifier, but does require
a product code.  If the quantity option is omitted it will default to 1.

```
component {
  code: String
  [quantity: = 1]
}
```

If subsequent component commands refer to the same product code, any existing
products will have their quantity updated.

### Parameters

Parameters must be unique on an object.  
