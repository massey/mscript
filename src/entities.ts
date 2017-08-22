/**
An Mscript can contain regular javascript as well as commands.  Commands
represent the creation of some entity.  Entities can be parameters, components,
array functions, etc.  Some entities can be declared in the context of other
entities, so when the Mscript is compiled, the output needs auxillary statements
to handle the relationships between entities.

The Node that the constructors accept are always a CommandStatement.
*/

import Node from './node'

abstract class Entity {
  id: string
  type: string

  constructor (node: Node) {
    if (node) {
      this.id   = node.id ? node.id.name : null
      this.type = node.name.name
    }
  }

  abstract accept (entity: Entity, node?: Node): Node
  abstract auxillary (entity: Entity): Node
}

/**
ArrayEntity
*/
class ArrayEntity extends Entity {
  constructor (node: Node) {
    super(node)
  }

  /**
  Return the statement required if the given entity can be accepted by
  ComponentEntity.
  */
  accept (entity: Entity, node?: Node): Node {
    switch (entity.type) {
      case 'component':
      return Node.expressionStatement(
        Node.callExpression(
          Node.memberExpression(
            Node.identifier(this.id || 'arr'),
            Node.identifier('push')
          ),
          [node || Node.identifier(entity.id)]
        )
      )

      default:
      return null
    }
  }

  /**
  Return auxillary statements required by the given entity.
  */
  auxillary (node: Entity): Node {
    return null
  }
}

/**
Box
*/
class Box extends Entity {
  constructor (node: Node) {
    super(node)
  }

  /**
  Boxs cannot accept any other entities.
  */
  accept (entity: Entity, node?: Node): Node {
    return null
  }

  /**
  Box does not generate auxillary statements.
  */
  auxillary (node: Entity): Node {
    return null
  }
}

/**
ComponentEntity
*/
class ComponentEntity extends Entity {
  constructor (node: Node) {
    super(node)
  }

  /**
  Return the statement required if the given entity can be accepted by
  ComponentEntity.
  */
  accept (entity: Entity, node?: Node): Node {
    if (entity.type === 'component') {
      return Node.expressionStatement(
        Node.callExpression(
          Node.memberExpression(
            Node.identifier(this.id),
            Node.identifier('add')
          ),
          [node || Node.identifier(entity.id)]
        )
      )
    } else {
      return null
    }
  }

  /**
  Return auxillary statements required by the given entity.
  */
  auxillary (node: Entity): Node {
    return null
  }
}

/**
ComponentEntity
*/
class GroupEntity extends Entity {
  constructor (node: Node) {
    super(node)
  }

  /**
  Return the statement required if the given entity can be accepted by
  GroupEntity.
  */
  accept (entity: Entity, node?: Node): Node {
    if (entity.type === 'component' || entity.type === 'param') {
      return Node.expressionStatement(
        Node.callExpression(
          Node.memberExpression(
            Node.identifier(this.id),
            Node.identifier('add')
          ),
          [Node.identifier(entity.id)]
        )
      )
    } else {
      return null
    }
  }

  /**
  Return auxillary statements required by the given entity.
  */
  auxillary (node: Entity): Node {
    return null
  }
}

/**
ObjectEntity is the top level thing being built.
*/
class ObjectEntity extends Entity {
  id: string

  constructor () {
    super(null)
  }

  /**
  Return the statement required if the given entity can be accepted by
  Object.
  */
  accept (entity: Entity, node?: Node): Node {
    var type = entity.type
    if (type === 'component' || type === 'param' || type === 'array' ||
        type === 'group') {
      return Node.expressionStatement(
        Node.callExpression(
          Node.memberExpression(
            Node.identifier('object'),
            Node.identifier('add')
          ),
          [node || Node.identifier(entity.id)]
        )
      )
    } else {
      return null
    }
  }

  /**
  Return auxillary statements required by the given entity.
  */
  auxillary (node: Entity): Node {
    return null
  }
}

/**
ParamEntity.
*/
class ParamEntity extends Entity {
  constructor (node: Node) {
    super(node)
  }

  /**
  Params cannot accept any other entities.
  */
  accept (entity: Entity, node?: Node): Node {
    return null
  }

  /**
  Return auxillary statements required by the given entity.
  */
  auxillary (node: Entity): Node {
    return null
  }
}

export {
  Entity,
  ArrayEntity,
  ComponentEntity,
  GroupEntity,
  ObjectEntity,
  ParamEntity
}
